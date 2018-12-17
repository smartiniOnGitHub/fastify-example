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

Fastify 1.13.2 or later, Node.js 8.14.0 or later.


## License

Licensed under [Apache-2.0](./LICENSE).

----
