/*
 * Copyright 2018-2021 the original author or authors.
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

fastify.get('/', (request, reply) => {
  reply.view('index', {
    projectName: 'Simple Server',
    projectVersion: '1.0.0',
    environment: 'development',
    assets: '/public/',
    title: 'Home',
    welcome: 'Welcome to the Home Page',
    sampleRoutes: null,
    pluginRoutes: null
  })
})

fastify.get('/favicon.ico', (request, reply) => {
  reply.type('image/x-icon').sendFile('img' + '/favicon.ico')
})

// note that to make it work (be exposed) when deployed in a container (Docker, etc) we need to listen not only to localhost but for example to all interfaces ...
fastify.listen(8000, '0.0.0.0', (err, address) => {
  if (err) {
    app.log.error(err)
    process.exit(1)
    // throw err
  }
  const msg = `Server listening on '${address}' ...`
  console.log(msg)
  fastify.log.info(msg)
})

// log server startup, but note that by default logs are disabled in Fastify (even errors) ...
fastify.log.info('Server Startup script successfully executed')

// module.exports = fastify
