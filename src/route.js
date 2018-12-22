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

const utils = require('./utils')

// sample data for pages and responses
const data = { text: 'Hello from EJS Templates' }

// define routes as async
// note that some routes here are normal (non-async) ...
async function routes (fastify, options) {
  // define the root route
  fastify.get('/', (req, reply) => {
    // utils.logRoute(req)
    reply.view('index', {
      environment: utils.currentEnv(),
      title: 'Home',
      welcome: 'Welcome to the Home Page'
    })
    // publish a message in the queue, as a sample
    // TODO: uncomment and let it work ... wip
    // publish(fastify.nats, 'Hello World, from the root page of a Fastify web application !')
  })
  // example route, to return current timestamp but in async way
  fastify.get('/time', async (req, reply) => {
    const timestamp = Math.floor(Date.now())
    // publish a message in the queue, as a sample
    // TODO: uncomment and let it work ... wip
    // publish(fastify.nats, `Ask for server timestamp: ${timestamp}`)
    return { timestamp: timestamp }
  })

  // next()  // no with async routes
}

module.exports = routes
