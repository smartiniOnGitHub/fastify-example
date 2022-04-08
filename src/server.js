/*
 * Copyright 2018-2022 the original author or authors.
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
/* eslint no-inner-declarations: "off" */

// main entry point for instancing and starting the server

// const assert = require('assert').strict

// TODO: later try to use fastify.NATS instead (published by my plugin) ... wip
const NATS = require('nats')

// load environment specific variables from '.env' file (if any) into process.env ...
const dotenv = require('dotenv')
dotenv.config()

// load/init webapp constants and general utilities
const k = require('./constants')
const utils = require('./utils')

utils.logToConsole(`Server starting for ${k.packageName}-v${k.packageVersion} ...`)

// startup configuration constants
const Fastify = require('fastify')
const fastifyOptions = JSON.parse(k.fastifyOptionsString)
const fastify = Fastify(fastifyOptions)

// get the web application and instance/register as a plugin
const App = require('./app')
// fastify.register(App, fastifyOptions)
// new, load as normal function, to be able to get its return value (discarded otherwise)
// later call directly with await (requires top-level await)
const app = App(fastify, fastifyOptions)
  .then((res) => {
    fastify.log.debug(`Return values from app: ${JSON.stringify(res)}`)
  })

// start the web application
// note that to make it work (be exposed) when deployed in a container (Docker, etc) we need to listen not only to localhost but for example to all interfaces ...
fastify.listen(k.port, k.address, (err, address) => {
  if (err) {
    fastify.log.error(err)
    process.exit(1)
    // throw err
  }
  utils.logToConsole(`Server listening on '${address}' ...`)
  // fastify.log.info(`Server listening on '${address}' ...`)
})

// load some publish/subscribe utility functions
const { publish, subscribe } = require('./pubsub')

// define some callback logic, called when the application has successfully initialized
// moved in main server source, more useful than in app (no needed in tests, etc)
fastify.ready((err) => {
  if (err) throw err
  const msgPrintRoutesStart = `Printing Routes (env '${utils.currentEnv()}')`
  if (utils.isEnvProduction()) {
    fastify.log.info(`${msgPrintRoutesStart}, disabled in a production environment`)
  } else {
    const routes = fastify.printRoutes({ commonPrefix: false })
    const msgPrintRoutesFull = `${msgPrintRoutesStart}, only for non production environments\n${routes}`
    fastify.log.info(msgPrintRoutesFull)
    // note that in this case it would be better to log to console (for a better formatting), for example with:
    utils.logToConsole(msgPrintRoutesFull)
  }

  // subscribe and publish a message to the queue, as a sample
  // assert(utils.isDefinedAndNotNull(fastify.NATS))
  // assert(utils.isDefinedAndNotNull(fastify.nc))
  const natsStringCodec = NATS.StringCodec()
  // const natsStringCodec = fastify.NATS.StringCodec()
  subscribe(fastify.nc, k.queueName, k.queueDisabled, null, natsStringCodec)
  publish(fastify.nc, k.queueName, k.queueDisabled, k.message, natsStringCodec)
  // later find a better way to reuse StringCodec as default, without having to pass as argument ...
})

// log server startup, but note that by default logs are disabled in Fastify (even errors) ...
fastify.log.info('Server Startup script successfully executed')
