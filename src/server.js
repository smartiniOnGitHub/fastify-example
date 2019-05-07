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
/* eslint no-inner-declarations: "off" */

// load environment specific variables from '.env' file (if any) into process.env ...
const dotenv = require('dotenv')
dotenv.config()

// load/init webapp constants and general utilities
const k = require('./constants')
const utils = require('./utils')

utils.logToConsole(`Server starting for ${k.packageName}-v${k.packageVersion} ...`)

// startup configuration constants
const fastifyOptions = JSON.parse(k.fastifyOptionsString)
const fastify = require('fastify')(fastifyOptions)

// const assert = require('assert')
const path = require('path')

const templateEngine = require('ejs')
const resolve = path.resolve

const publicFolderFromScript = path.normalize(path.join(k.projectFolderFromScript, 'public', path.sep))

fastify.register(require('point-of-view'), {
  engine: {
    ejs: templateEngine
  },
  includeViewExtension: true,
  templates: k.folders.templatesFolderName,
  options: {
    filename: resolve(k.folders.templatesFolderName),
    views: [publicFolderFromScript]
  }
})

fastify.register(require('fastify-static'), {
  root: publicFolderFromScript,
  prefix: k.mappings.staticAssetsMapping // optional: default '/'
})

// load all webapp features that are enabled: need to pass fastify instance and maybe some options
const features = require('./features')(fastify, null)

// load some publish/subscribe utility functions
const { publish, subscribe } = require('./pubsub')

// define some routes
const routes = require('./route')(fastify, null)

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

fastify.ready(() => {
  const msgPrintRoutesStart = `Printing Routes (env '${utils.currentEnv()}')`
  if (utils.isEnvProduction()) {
    fastify.log.info(`${msgPrintRoutesStart}, disabled in a production environment`)
  } else {
    const routes = fastify.printRoutes()
    const msgPrintRoutesFull = `${msgPrintRoutesStart}, only for non production environments\n${routes}`
    fastify.log.info(msgPrintRoutesFull)
    // note that in this case it would be better to log to console (for a better formatting), for example with:
    utils.logToConsole(msgPrintRoutesFull)
  }

  // subscribe and publish a message to the queue, as a sample
  // assert(fastify.nats !== null)
  subscribe(fastify.nats, k.queueName, k.queueDisabled)
  publish(fastify.nats, k.queueName, k.queueDisabled, k.message)
})

// log server startup, but note that by default logs are disabled in Fastify (even errors) ...
fastify.log.info(`Server Startup script successfully executed`)

// module.exports = fastify
