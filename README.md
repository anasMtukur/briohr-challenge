# BrioHr Technical Challenge

## Notification Microservice

Building a notification microservice with NestJs, MongoDB and Typegoose

## System Design

- Created a mock service for User and Company entities.

  Both user and company has property named subscribedChannels, an array that contains a list of all channels subscribed by the user or company.

- Created a mock NotificationType service

  - Each NotificationType has message and subject properties. Subject field is set to 'none' for types that do not have a subject.

  - NotificationType also have a property channels, which contains a list of all channels that the type is sent to the user. e.g email, ui, or a combination of both.

- Created NotificationService which implements the bulk of operations for this microservice

  - Method - sendNotification() : 

    This method is called from the notification controller when the send notification endpoint is called.
    It takes a User object, Company object and Notification Type as input and returns a ResponseMessage object that will be sent as a response to the API call.

  - Method - formatMessage() : 

    This message is called with notification type and message with both User and Company objects, replace the placeholders with the appropriate data and return the formatted message.

  - Method - doSendNotification() : 

    This message loops through the notification type channels and check if the user and company are subscribed to the channel before calling the method to send the channel notification. A message is only sent over a channel that the user is subscribed to or the company is subscribed to. This allows us to send notifications to users that are not subscribed to a channel but the company is.

  - Method - doSendChannelNotification() : 

    This method sends the notification through different channels using their respective procedures.

  - Method - isUserSubscribedToChannel() :

    Check if a user is Subscribed to a channel

  - Method - isUserSubscribedToChannel() :

    Check if a company is Subscribed to a channel


### Containerization

For the docker containerization setup, I am running 3 services, listed as follows:

- Node:17.3.1 (NodeJS) 
  Run the NestJS Application

- Mongodb (Database)
  Run MongoDb server

- Mongo-express (Optional Database Admin Tool)
  Run Mongo express admin tool

Using Docker compose, I run the above 3 services in a single container allowing the to connect to each other. It will initiate and wire up all three services.

## Installation

```bash
$ npm install
```

## Running the app with docker

```bash
# Start Container with Applicantion server, mongodb server and mongo express
$ docker-compose up -d dev mongodb mongo-express
# recreate application server with updated packages
$ docker-compose up -d -V dev
```
## Development
```bash
# Run these commands after making changes to the code or adding packages
$ docker-compose build dev
$ docker-compose up -d -V dev
```
## Test
```bash
# run this command to execute unit tests, ensure mongodb is running
$ docker-compose -p tests run --rm dev npm run test
```
