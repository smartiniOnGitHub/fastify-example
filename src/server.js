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
const path = require('path')

const templateEngine = require('ejs')
const resolve = path.resolve

const k = require('./constants')
const utils = require('./utils')

const projectFolderFromScript = path.normalize(path.join(__dirname, path.sep, '..', path.sep))
const publicFolderFromScript = path.normalize(path.join(projectFolderFromScript, 'public', path.sep))

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
  // assert(fastify.nats !== null)
  subscribe(fastify.nats, k.queueName, k.queueDisabled)
  publish(fastify.nats, k.queueName, k.queueDisabled, k.message)
})

// log server startup, but note that by default logs are disabled in Fastify (even errors) ...
fastify.log.info(`Server Startup script successfully executed`)

// module.exports = fastify
