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
fastify.register(App, fastifyOptions)

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

// log server startup, but note that by default logs are disabled in Fastify (even errors) ...
fastify.log.info('Server Startup script successfully executed')
