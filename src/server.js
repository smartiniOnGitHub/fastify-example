/*
 * Copyright 2018 the original author or authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
'use strict'

/* eslint no-console: "off" */
/* eslint no-undef: "off" */
/* eslint no-unused-vars: "off" */
/* eslint callback-return: "off" */

// startup configuration constants
const fastifyOptions = {
  // logger: false  // by default disabled, so not needed to write here ...
  logger: {
    level: 'info'
  },
  port: 8000
}

const fastify = require('fastify')(fastifyOptions)

const assert = require('assert')
const fs = require('fs')
const path = require('path')

const templateEngine = require('ejs')
const resolve = require('path').resolve
const isDocker = require('is-docker')

const templatesFolder = 'templates'
const pubFolder = '../public'
const data = { text: 'text' }

const utils = require('./utils')

const k = {
  protocol: 'http',
  address: '127.0.0.1', // safer default
  port: fastifyOptions.port,
  serverUrlMode: 'pluginAndRequestUrl', // same behavior as default value, but in this way set in CloudEvent extension object
  baseNamespace: 'com.github.smartiniOnGitHub.fastify-example.server',
  cloudEventOptions: {
    strict: true // enable strict mode in generated CloudEvents, optional
  }
}
// to make it work (be exposed) when deployed in a container (Docker, etc) we need to listen not only to localhost but for example to all interfaces ...
k.address = (isDocker() === true) ? '0.0.0.0' : '127.0.0.1'
k.serverUrl = `${k.protocol}://${k.address}:${k.port}`
k.source = k.serverUrl

fastify.register(require('point-of-view'), {
  engine: {
    ejs: templateEngine
  },
  includeViewExtension: true,
  templates: templatesFolder,
  options: {
    filename: resolve(templatesFolder),
    views: [__dirname, pubFolder]
  }
})

fastify.register(require('fastify-static'), {
  root: path.join(__dirname, pubFolder),
  prefix: '/public/' // optional: default '/'
})

// fastify-favicon, example with null or empty options, using only plugin default options
// fastify.register(require('fastify-favicon'))
// example with custom path, usually relative to project root (without or with the final '/' char), but could be absolute
fastify.register(require('fastify-favicon'), { path: './public/img/' })

// fastify-webhook, example with null or empty options, using only plugin default options
// fastify.register(require('fastify-webhook'))
// enable later and comment the previous example ... ok
const webhookHandlers = require('fastify-webhook/src/handlers') // get plugin handlers (optional)
const webhookPlugin = require('fastify-webhook')
fastify.register(webhookPlugin, {
  'url': '/custom-webhook',
  'handler': webhookHandlers.echo
})
fastify.log.info(`Webhook registered with custom options`)

// fastify-healthcheck, example with null or empty options, using only plugin default options
fastify.register(require('fastify-healthcheck'))

// define a sample id generator here
const hostname = require('os').hostname()
const pid = require('process').pid
function * idCounterExample () {
  let counter = 0
  while (true) {
    yield `${counter++}`
  }
}
// instance the generator, to use everywhere here
const gen = idCounterExample()
// add a sample logging callback
function loggingCallback (ce) {
  console.log(`loggingCallback - CloudEvent dump ${fastify.CloudEvent.dumpObject(ce, 'ce')}`)
}
// fastify-cloudevents, example with only some most-common options
fastify.register(require('fastify-cloudevents'), {
  serverUrl: k.serverUrl,
  serverUrlMode: k.serverUrlMode,
  // idGenerator: gen,
  onRequestCallback: loggingCallback,
  onResponseCallback: loggingCallback,
  cloudEventOptions: k.cloudEventOptions
})

// define some routes
fastify.register(require('./route'))

// note that to make it work (be exposed) when deployed in a container (Docker, etc) we need to listen not only to localhost but for example to all interfaces ...
fastify.listen(fastifyOptions.port, k.address, (err, address) => {
  if (err) {
    fastify.log.error(err)
    process.exit(1)
    // throw err
  }
  // fastify.log.info(`Server listening on '${address}' ...`)
})

fastify.ready(() => {
  if (utils.isEnvProduction()) {
    fastify.log.info(`Printing Routes: not in production environment`)
  } else {
    const routes = fastify.printRoutes()
    fastify.log.info(`Printing Routes:\n${routes}`)
    // note that in this case it would be better to log to console (for a better formatting), for example with:
    utils.logToConsole(`Printing Routes: only for non production environments\n${routes}`)
  }
})

// log server startup, but note that by default logs are disabled in Fastify (even errors) ...
fastify.log.info(`Server Startup script successfully executed`)

// module.exports = fastify
