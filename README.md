# fastify-example

  [![Docker Pulls](https://img.shields.io/docker/pulls/smartiniatdocker09/fastify-example.svg)](https://hub.docker.com/r/smartiniatdocker09/fastify-example/)
  [![Code Style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat)](http://standardjs.com/)
  [![dependencies Status](https://david-dm.org/smartiniOnGitHub/fastify-example/status.svg)](https://david-dm.org/smartiniOnGitHub/fastify-example)
  [![devDependencies Status](https://david-dm.org/smartiniOnGitHub/fastify-example/dev-status.svg)](https://david-dm.org/smartiniOnGitHub/fastify-example?type=dev)

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

Note that it's possible to let Docker do all inside a container, because 
all is described in a Dockerfile; see [Dockerfile-usage](./docs/Dockerfile-usage.md) 
for related commands.
Of course you need a local installation of Docker (recent, if possible latest), 
but nothing other.


## Others

To run a development server (with hot reload enabled) instead execute this:
```
npm run start:dev
```

For other custom commands look the 'scripts' section inside 'package.json'.


## Requirements

Fastify ^2.4.1 , Node.js 10.13.0 or later.


## Note

Some features can be configured via environment variables; 
if a `.env` file is found in project root, all its contents 
will be loaded into environmental variables.
Supported variables:
- `FASTIFY_OPTIONS`, set Fastify main options at startup, as a JSON string; 
  to change logging level for example use something like: `{ "logger": { "level": "debug" } }'
  and to remove logging for example use: '{ }'
- `HTTP_PORT`, set default HTTP port for the server
- `HTTP_ADDRESS`, set default HTTP address for the server
- `NATS_SERVER_URL`, set the URL for the NATS server (if enabled), or plugin default
- `WEBHOOK_SECRET_KEY`, set the secret key to require by exposed webhook
- `FEATURE_FAVICON_DISABLE`, to disable (not load) related plugin
- `FEATURE_WEBHOOK_DISABLE`, to disable (not load) related plugin
- `FEATURE_HEALTHCHECK_DISABLE`, to disable (not load) related plugin
- `FEATURE_CLOUDEVENTS_DISABLE`, to disable (not load) related plugin
- `FEATURE_CLOUDEVENTS_STRICT_DISABLE`, to disable strict mode in generated CloudEvents 
  (if/when related plugin is enabled)
- `FEATURE_CLOUDEVENTS_LOG_CONSOLE_DISABLE`, to disable CloudEvent serialization to console
- `FEATURE_CLOUDEVENTS_LOG_FILE_DISABLE`, to disable CloudEvent serialization to console, 
  by default true (so disabled); 
  note that when enabled a new log file will be created at any run of the server, 
  but previous (if present) will be overwritten, 
  so any new run is fresh and old logs will be discarded
- `FEATURE_NATS_DISABLE`, to disable (not load) related plugin
if not specified default behavior will be applied.

As a sample, by default (unless disabled) some messages will be sent to a NATS queue, 
when the web application has started and when a client ask for a page.
NATS server by default (in related plugin) is a public one, 
[demo.nats.io](nats://demo.nats.io:4222).


## License

Licensed under [Apache-2.0](./LICENSE).

----
