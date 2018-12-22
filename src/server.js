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

// load environment specific variables (if any) into the process.env ...
require('dotenv').config()

const templateEngine = require('ejs')
const resolve = require('path').resolve
const isDocker = require('is-docker')

const templatesFolder = 'templates'
const pubFolder = '../public'
const data = { text: 'text' }

const utils = require('./utils')

// TODO: remove after the merge ... wip
// note that to make it work (be exposed) when deployed in a container (Docker, etc) we need to listen not only to localhost but for example to all interfaces ...
// const listenAddress = (isDocker() === true) ? '0.0.0.0' : '127.0.0.1'

const packageName = require('../package.json').name // get package name
const packageVersion = require('../package.json').version // get package version

const k = {
  protocol: 'http',
  address: '127.0.0.1', // safer default
  port: fastifyOptions.port,
  serverUrlMode: 'pluginAndRequestUrl', // same behavior as default value, but in this way set in CloudEvent extension object
  baseNamespace: 'com.github.smartiniOnGitHub.fastify-example.server',
  cloudEventOptions: {
    strict: true // enable strict mode in generated CloudEvents, optional
  },
  natsQueueOptions: {
    // url: 'nats://demo.nats.io:4222' // same as plugin default, so no ned to specify here
  }
}
// to make it work (be exposed) when deployed in a container (Docker, etc) we need to listen not only to localhost but for example to all interfaces ...
k.address = (isDocker() === true) ? '0.0.0.0' : '127.0.0.1'
k.serverUrl = `${k.protocol}://${k.address}:${k.port}`
k.source = k.serverUrl
k.queueName = `${packageName}-${packageVersion}`
k.message = 'Hello World, from a Fastify web application just started !'

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

// example usage of fastify-cloudevents plugin
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

// sample subscriber function for the NATS queue specified in constants
function subscribe (nats,
  cb = function (msg) {
    console.log(`Received message: ${msg}`)
  }) {
  console.log(`Subscribe to messages from the queue '${k.queueName}'`)
  assert(fastify.nats !== null)

  // simple subscriber
  nats.subscribe(k.queueName, cb)
}

// sample publish function for the NATS queue specified in constants
function publish (nats, msg = '') {
  console.log(`Publish the given message in the queue '${k.queueName}'`)
  assert(fastify.nats !== null)

  // simple publisher
  nats.publish(k.queueName, msg)
}

// example to connect to a nats queue using related plugin
// temporarily disable standard plugin, and use my temporary one ... ok
// fastify.register(require('fastify-nats'), k.natsQueueOptions)
fastify.register(require('fastify-nats-client'), k.natsQueueOptions)
fastify.after((err) => {
  if (err) console.log(err)
  assert(fastify.nats !== null) // example
  if (fastify.nats !== null) {
    utils.logToConsole(`Connected to the queue server at: '${fastify.nats.currentServer.url.href}'`)
  }
})

// define some routes
// define the root route
fastify.get('/', (req, reply) => {
  reply.view('index', {
    environment: 'development',
    title: 'Home',
    welcome: 'Welcome to the Home Page'
  })

  // publish a message in the queue, as a sample
  publish(fastify.nats, 'Hello World, from the root page of a Fastify web application !')
})
// example route, to return current timestamp but in async way
fastify.get('/time', async (req, reply) => {
  return { timestamp: Math.floor(Date.now()) }
})
// TODO: enable after the merge, and add even the publish call in the route source ... wip
// fastify.register(require('./route'))

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

  // subscribe and publish a message to the queue, as a sample
  assert(fastify.nats !== null)
  subscribe(fastify.nats)
  publish(fastify.nats, k.message)
})

// log server startup, but note that by default logs are disabled in Fastify (even errors) ...
fastify.log.info(`Server Startup script successfully executed`)

// module.exports = fastify
