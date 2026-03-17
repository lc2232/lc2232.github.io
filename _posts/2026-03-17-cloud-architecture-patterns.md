---
layout: post
title: "Cloud Architecture Patterns - From the perspective of a firmware engineer"
date: 2026-03-17
tags: [book-review, cloud-architecture]
excerpt: "A review of the book Cloud Architecture Patterns by Bill Wilder from the perspective of a firmware engineer."
---

## [Cloud Architecture Patterns - Bill Wilder](https://www.oreilly.com/library/view/cloud-architecture-patterns/9781449357979/)

When I first considered moving into the backend engineering space my first thought, as is becoming increasingly the norm, was to go to ChatGPT or Claude to discuss the fundamental knowledge one must have in order to build backend systems like that. However having been caught out one too many times with these systems, a lingering doubt persisted in my head that the information being repeated to me may be somewhat incorrect or at least not all-encompassing. With this doubt in mind I struggled to really focus on the content it was preaching to me, until one day I was browsing my local charity shops and saw this book sat on the shelf, pretty much brand new for only £2.99. I saw it as a sign and went to the till immediately to buy it.

After a few weeks of studying the book after work as a firmware engineer, I was actually quite amazed at how many design patterns transfer between the two disciplines.

At my last job I worked on what we called the Embedded Software platform, built up of multiple services working at different levels of abstraction. It was interesting to find out that some of the key design decisions made about the core architecture of the Embedded Software platform were also present in the Cloud space too. The use of asynchronous messaging (*Queue-Centric Workflow*) to decouple services reminded me of how you might decouple interactions between micro-controllers or software components in embedded systems, even if the guarantees and scale are quite different. In my experience, embedded systems deal with that same kind of back-pressure more explicitly, usually by either stopping new messages being pushed onto a full queue or by dropping stale data such as the oldest message.

Another example of where these disciplines cross paths is around the idea of designing systems to be inherently resilient (*Node Failure Pattern)*. In the book it is suggested that whether controlled or uncontrolled the entire cloud application should be designed to handle these individual node shutdown events. Similar consideration must be taken in embedded systems, for example say you have an embedded system with multiple tasks, if one task gets stuck and doesn’t *pet* the *watchdog* then typical behaviour is to reset the system, but this means that the wider system should be designed to recover gracefully from that forced reset.

Of course other ideas in the book are quite specific, or at least, enabled much easier through the Cloud platforms; specifically the ideas of horizontal scaling. Horizontal scaling is the idea that instead of increasing the processing power of a single compute node (vertical scaling) you increase the number of compute nodes available to handle the various requests.

Horizontal scaling is a term I had heard bandied around the internet for years and continually heard discussion of while at university, but never really heard anyone really mention when working as a firmware engineer. 

One mistake I would have made before reading this book was thinking that multi-MCU embedded systems are a form of horizontal scaling. However, after reading this book it is clearer to me that the *Horizontal Scaling Pattern* is about adding more interchangeable homogeneous stateless workers to perform the same task under an increased load. If I wanted to draw a clearer parallel between multi-MCU systems, it would be more akin to splitting out a larger perhaps monolithic service, into multiple smaller isolated services to handle a subset of the original monolithic task, however in this example there is a clear omission of statelessness.

Overall this book was a really good top level summary of some of the types of application that can be developed with the cloud. This book was published in 2012, however, the concepts it introduces are still very prevalent in modern day cloud applications. Being a smaller book, I would only really recommend this book for someone just starting out, as it doesn’t go too far into the details of more complex applications and has limited coverage on data storage mechanisms outside of the traditional relational databases.