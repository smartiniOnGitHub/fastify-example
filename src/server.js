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

// load environment specific variables (if any) into the process.env ...
const dotenv = require('dotenv')
dotenv.config()

// startup configuration constants
const fastifyOptions = {
  // logger: false  // by default disabled, so not needed to write here ...
  logger: {
    level: 'info'
  },
  port: process.env.HTTP_PORT || 8000
}

const fastify = require('fastify')(fastifyOptions)

const assert = require('assert')
// const fs = require('fs')
const path = require('path')

const templateEngine = require('ejs')
const resolve = path.resolve

const templatesFolder = 'templates'
const projectFolderFromScript = path.normalize(path.join(__dirname, path.sep, '..', path.sep))
const publicFolderFromScript = path.normalize(path.join(projectFolderFromScript, 'public', path.sep))

const utils = require('./utils')
const k = require('./constants')

fastify.register(require('point-of-view'), {
  engine: {
    ejs: templateEngine
  },
  includeViewExtension: true,
  templates: templatesFolder,
  options: {
    filename: resolve(templatesFolder),
    views: [publicFolderFromScript]
  }
})

fastify.register(require('fastify-static'), {
  root: publicFolderFromScript,
  prefix: '/public/' // optional: default '/'
})

// fastify-favicon, example with null or empty options, using only plugin default options
// fastify.register(require('fastify-favicon'))
// example with custom path, usually relative to project root (without or with the final '/' char), but could be absolute
fastify.register(require('fastify-favicon'), {
  path: path.normalize(path.join(projectFolderFromScript, path.sep, 'public', path.sep, 'img', path.sep))
})

// fastify-webhook, example with null or empty options, using only plugin default options
// fastify.register(require('fastify-webhook'))
// enable later and comment the previous example ... ok
const webhookHandlers = require('fastify-webhook/src/handlers') // get plugin handlers (optional)
const webhookPlugin = require('fastify-webhook')
fastify.register(webhookPlugin, {
  url: '/custom-webhook',
  handler: webhookHandlers.echo,
  secretKey: process.env.WEBHOOK_SECRET_KEY // optional: || '' , or || null
})
fastify.log.info(`Webhook registered with custom options`)

// fastify-healthcheck, example with null or empty options, using only plugin default options
fastify.register(require('fastify-healthcheck'))

// example usage of fastify-cloudevents plugin
// define a sample id generator here
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
  console.log(`CloudEvent dump, ${fastify.CloudEvent.dumpObject(ce, 'ce')}`)
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
// load some publish/subscribe utility functions
const { publish, subscribe } = require('./pubsub')

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

  // subscribe and publish a message to the queue, as a sample
  assert(fastify.nats !== null)
  subscribe(fastify.nats, k.queueName, k.queueDisabled)
  publish(fastify.nats, k.queueName, k.queueDisabled, k.message)
})

// log server startup, but note that by default logs are disabled in Fastify (even errors) ...
fastify.log.info(`Server Startup script successfully executed`)

// module.exports = fastify
