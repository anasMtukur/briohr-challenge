# BrioHr Technical Challenge

## Notification Microservice

Building a notification microservice with NestJs, MongoDB and Typegoose

## System Design Points

- User Service and Company Service Mocked

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
# unit tests
$ docker-compose build dev
$ docker-compose up -d -V dev
```
## Test

```bash
# unit tests
$ npm run test
```

## System Design

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

