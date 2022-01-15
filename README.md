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
# Run these commands after making changes to the code or adding packages
$ docker-compose build dev
$ docker-compose up -d -V dev
```
## Test
```bash
# run this command to execute unit tests, ensure mongodb is running
$ docker-compose -p tests run --rm dev npm run test
```
