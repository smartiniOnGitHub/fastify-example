# fastify-example

  [![NPM Version](https://img.shields.io/npm/v/fastify-example.svg?style=flat)](https://npmjs.org/package/fastify-example/)
  [![NPM Downloads](https://img.shields.io/npm/dm/fastify-example.svg?style=flat)](https://npmjs.org/package/fastify-example/)
  [![Code Style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat)](http://standardjs.com/)
  [![Coverage Status](https://coveralls.io/repos/github/smartiniOnGitHub/fastify-example/badge.svg?branch=master)](https://coveralls.io/github/smartiniOnGitHub/fastify-example/?branch=master)
  [![Dependencies](https://david-dm.org/smartiniOnGitHub/fastify-example.svg)](https://david-dm.org/smartiniOnGitHub/fastify-example.svg)

Example webapp with Fastify


## Setup and run

To complete project setup, do:
```
npm install
```

and run with
```
npm start
```

then point your browser to [localhost:8000](http://localhost:8000)


## Setup and run with Docker

Note that it's possible to let Docker do all inside a container, because all is described in a Dockerfile; see [Dockerfile-usage](./docs/Dockerfile-usage.md) for related commands.
Of course you need a local installation of Docker (recent, if possible latest), but nothing other.


## Others

To run a development server (with hot reload enabled) instead execute this:
```
npm run start:dev
```

For other custom commands look the 'scripts' section inside 'package.json'.


## Requirements

Fastify 1.13.3 or later, Node.js 8.14.0 or later.


## Note

Some features can be configured via environment variables; 
if a `.env` file is found in project root, all its contents 
will be loaded into environmental variables.
Supported variables:
- `HTTP_PORT`, set default HTTP port for the server
- `HTTP_ADDRESS`, set default HTTP address for the server
- `NATS_SERVER_URL`, set the URL for the NATS server (if enabled), or plugin default
- `NATS_SERVER_DISABLE`, if `true` it will disable all the interaction with a NATS Server, default `false` ... deprecated, a new one will be used soon
- `WEBHOOK_SECRET_KEY`, set the secret key to require by exposed webhook
- `FEATURE_FAVICON_DISABLE`, to disable (not load) related plugin
- `FEATURE_WEBHOOK_DISABLE`, to disable (not load) related plugin
- `FEATURE_HEALTHCHECK_DISABLE`, to disable (not load) related plugin
- `FEATURE_CLOUDEVENTS_DISABLE`, to disable (not load) related plugin
- `FEATURE_NATS_DISABLE`, to disable (not load) related plugin
if not specified default behavior will be applied.

As a sample, by default (unless disabled) some messages will be sent to a NATS queue, 
when the web application has started and when a client ask for a page.
NATS server by default (in related plugin) is a public one, [demo.nats.io](nats://demo.nats.io:4222).


## License

Licensed under [Apache-2.0](./LICENSE).

----
