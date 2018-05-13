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

const fastify = require('fastify')()

const fs = require('fs')
const path = require('path')

const templateEngine = require('ejs')
const resolve = require('path').resolve
const templatesFolder = 'templates'
const pubFolder = '../public'
const data = { text: 'text' }

const opts = {
  hello: 'world',
  something: true
}

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

fastify.get('/', (req, reply) => {
  reply.view('index', {
    environment: 'development',
    title: 'Home',
    welcome: 'Welcome to the Home Page'
  })
})

// note that to make it work (be exposed) when deployed in a container (Docker, etc) we need to listen not only to localhost but for example to all interfaces ...
fastify.listen(8000, '0.0.0.0', (err) => {
  if (err) {
    // fastify.log.error(err)
    // process.exit(1)
    throw err
  }
  fastify.log.info(`server listening on ${fastify.server.address().port}`)
})

// log server startup, but note that by default logs are disabled in Fastify (even errors) ...
fastify.log.info(`Server Startup script successfully executed`)

// module.exports = fastify
