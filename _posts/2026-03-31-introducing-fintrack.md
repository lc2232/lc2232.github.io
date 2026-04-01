---
layout: post
title: "Introducing - Fintrack"
date: 2026-03-31
tags: [project]
excerpt: "Introducing Fintrack - An investment dashboard that performs meta analysis on Fund/ETF documentation and aggregates the data into a user friendly platform."
---

# The Problem

Having always been someone with an interest in finance and technology, I've often found it difficult to get a clear picture of what I'm actually investing in. This is especially the case when investing in financial products such as funds and ETFs to diversify against the market and reduce risk in a portfolio.

Since I started investing at 18, I've stuck with my high-street bank's investment app. However, as is often the case with traditional banks, they are bricks-and-mortar first, digital second. This frustration inspired me to build my own platform - Fintrack. I built it primarily as a learning exercise, but also as a method of continuing to gain the investment insight for myself.

# Fintrack

## Stack

With my own aspirations of becoming a backend engineer, I primarily focused on the backend architecture and implementation for this first version with aims to improve the frontend in the future as I implement more and more endpoints.

### Backend

For the backend, I designed a robust, scalable microservices architecture. To ensure reproducibility and establish strong Infrastructure-as-Code (IaC) principles, the entire stack is provisioned on AWS using Terraform. Key components are deployed as Serverless AWS Lambdas and the API's are containerised using Docker, allowing for a consistent, reliable environment.

The backend is logically split into two main user-facing services:
1. **Upload API**: Handles the secure ingestion of financial documents relating to ETF/fund investments via S3 and DynamoDB.
2. **Analytics API**: Allows users to query the extracted data and gain comprehensive portfolio insights.

A major architectural highlight of Fintrack is its document processing pipeline. Extracting structured data from unstructured documents using LLMs is a resource-intensive computing task. To prevent these long-running tasks from blocking the API, I implemented a [Queue-Centric Workflow](/blog/2026/03/17/cloud-architecture-patterns/), a design pattern I explored and learnt about in a previous post.

This was not the only pattern I had leveraged from the Cloud Architecture Patterns book, as my Upload API also utilises a Valet Key to allow for secure, temporary access to the S3 bucket for the user to upload their documents. By leveraging this pattern, the Upload API immediately returns a successful response with a pre-signed S3 URL. Upon ObjectCreation in the S3 bucket an event is triggered which pushes a message to a queue.

A separate background worker then picks up this message to perform the heavy LLM extraction (1-2s processing duration). This decoupling not only ensures a highly responsive user experience but also provides built-in resilience and scalability, gracefully handling traffic without overwhelming the system.

The DynamoDB acts as a mechanism to track state throughout the processing pipeline, allowing for the services to be truly stateless, and allow for idempotent processing through the use of conditional updates to the table. For example, if a document is already in the processing phase, even if a duplicate event is received, the conditional update will fail and the message will be ignored.

In the future, I plan to augment this pipeline by allowing users to enter an ETF/fund's ISIN or ticker symbol. Fintrack will then automatically collate investment information directly from APIs like [Alpha Vantage](https://www.alphavantage.co/#about), minimizing the need for manual document uploads, and the lengthy LLM based extraction.

Another improvement I would like to make is to perform some background processing of the analytics. Currently the analytics service performs the data aggregation and processing on demand. Right now that is fine as this is simply the MVP of the platform, but as the platform increases in scale, this will become a bottleneck.

#### Diagram

![Fintrack Architecture Diagram](/assets/img/fintrack_v1/fintrack_v1_architecture.png)

### Frontend

The frontend is a minimalist HTML, CSS, and JS single-page application built to interface efficiently with the backend APIs. While currently streamlined primarily for testing our data-extraction and analytical endpoints, it establishes a solid architectural foundation for future user-experience upgrades.

## Demo

![Fintrack Demo GIF](/assets/img/fintrack_v1/fintrack_v1_demo.gif)


## Future

I already have a few improvements in mind for the next version of Fintrack, namely the following will be my main focus:

- Introduction of LLM based tooling to assist with the validation of the extracted data
- Utlising Alpha Vantage or other similar APIs to provide a more comprehensive view of the user's investments
- Allow users to also upload their stock market investments to get a holistic view of their portfolio
- Process analytical data through background workers, and not on-demand.
