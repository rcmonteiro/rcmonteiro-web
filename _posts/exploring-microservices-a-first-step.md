---
updatedAt: "2024-05-16T15:35:27.000Z"
title: "Exploring Microservices: A First Step"
project: "Travel Booking Hub"
excerpt: "In this stage of the project, we'll dive into building microservices and an API gateway from scratch."
tags: ["API Gateway", "Fastify", "Typescript", "Zod"]
repoUrl: "https://github.com/rcmonteiro/travel-booking-hub"
prev: "i-love-docker"
next: "using-domain-events-with-rabbitmq"
---

Today, I took a small leap into the world of microservices! 🚀 To begin, I spun up two basic yet crucial services: an authentication service and an API Gateway.

## The Authentication Service

In my user service (user-service), I leveraged the powerful *Fastify* along with *Zod* schema validation to create a basic authentication service. With Zod, I could easily define the data schemas that the service expects to receive and send.
Plus: Free Swagger documentation!

Moreover, I went a step further and set up a dedicated PostgreSQL database to store user authentication information. This will allow me to scale and manage authentication information more effectively as my project grows.

## The API Gateway

And to further streamline communication between my microservices, I put together an API Gateway using *Fastify* and the *@fastify/http-proxy* plugin. This gateway simply redirects incoming requests to the appropriate services based on their routes.

It was a quick and easy setup! With just a few lines of code, I was able to route requests to the correct services, enabling my application to function more cohesively and organized.

![APIGateway](/posts/api-gateway-test.gif)

Now, with these two basic services up and running, I'm ready to take the next step in the microservices journey. I can't wait to see how these simple foundations pave the way for more complex and powerful solutions!