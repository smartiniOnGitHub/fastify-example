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

const fs = require('fs')
const path = require('path')

const templateEngine = require('ejs')
const resolve = require('path').resolve
const isDocker = require('is-docker')

const templatesFolder = 'templates'
const pubFolder = '../public'
const data = { text: 'text' }

const utils = require('./utils')

// note that to make it work (be exposed) when deployed in a container (Docker, etc) we need to listen not only to localhost but for example to all interfaces ...
const listenAddress = (isDocker() === true) ? '0.0.0.0' : '127.0.0.1'

const k = {
  protocol: 'http',
  address: '0.0.0.0',
  port: 3000,
  baseNamespace: 'com.github.smartiniOnGitHub.fastify-example.server',
  cloudEventOptions: {
    strict: true // enable strict mode in generated CloudEvents, optional
  }
}
k.address = listenAddress
k.serverUrl = `${k.protocol}://${k.address}:${k.port}/`
k.cloudEventOptions.source = k.serverUrl

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

// example with null or empty options, using only plugin default options
// fastify.register(require('fastify-favicon'))
// example with custom path, usually relative to project root (without or with the final '/' char), but could be absolute
fastify.register(require('fastify-favicon'), { path: './public/img/' })

// example with null or empty options, using only plugin default options
// fastify.register(require('fastify-webhook'))
// enable later and comment the previous example ... ok
const webhookHandlers = require('fastify-webhook/handlers') // get plugin handlers (optional)
const webhookPlugin = require('fastify-webhook')
fastify.register(webhookPlugin, {
  'url': '/custom-webhook',
  'handler': webhookHandlers.echo
})
fastify.log.info(`Webhook registered with custom options`)

// example with null or empty options, using only plugin default options
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

// define a generator, to use everywhere here
const gen = idCounterExample()

// example with only some most-common options
fastify.register(require('fastify-cloudevents'), {
  serverUrl: k.serverUrl,
  idGenerator: gen,
  onRequestCallback: loggingCallback,
  onResponseCallback: loggingCallback,
  cloudEventOptions: k.cloudEventOptions
})

function loggingCallback (ce) {
  console.log(`loggingCallback - CloudEvent dump ${fastify.CloudEvent.dumpObject(ce, 'ce')}`)
}

// define the root route
fastify.get('/', (req, reply) => {
  reply.view('index', {
    environment: 'development',
    title: 'Home',
    welcome: 'Welcome to the Home Page'
  })
})
// example route, to return current timestamp but in async way
fastify.get('/time', async (req, reply) => {
  return { timestamp: Math.floor(Date.now()) }
})

// note that to make it work (be exposed) when deployed in a container (Docker, etc) we need to listen not only to localhost but for example to all interfaces ...
fastify.listen(fastifyOptions.port, listenAddress, (err, address) => {
  if (err) {
    app.log.error(err)
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
