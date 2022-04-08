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

const k = require('./constants')
const utils = require('./utils')

// sample data for pages and responses
const commonPageData = {
  projectName: k.packageName,
  projectVersion: k.packageVersion,
  environment: utils.currentEnv(),
  assets: k.mappings.staticAssetsMapping,
  welcome: 'Hello from EJS Templates',
  sampleRoutes: null,
  pluginRoutes: null
}

// load some publish/subscribe utility functions
const { publish, subscribe } = require('./pubsub')

// manually define the list of some exposed routes, with some description
const sampleRoutes = [
  { link: '/', url: '/', description: 'Home page (async)' },
  { link: 'time', url: '/time', description: 'Sample API call that returns the current server time, as timestamp and in ISO format (async)' },
  { link: 'error', url: '/error', description: 'Sample route that always returns an error (async)' },
  { link: 'simple', url: '/simple', description: 'Sample EJS simple template page (async)' },
  { link: 'template', url: '/template', description: 'Sample EJS template page using the same template of root page (async)' }
  // ].sort((a, b) => a.link.localeCompare(b.link))
].sort(utils.compareProperties('link')) // opt. add sort order, 'asc' (by default) or 'desc'
// manually define the list of some routes exposed by some loaded plugins
const pluginRoutes = [
  { link: 'static', url: '/static/', description: "Serve static resources, sample (by default 'index.html' will be served, by 'fastify-static' plugin" },
  { link: 'favicon', url: '/favicon.ico', description: "Serve the favicon, by 'fastify-favicon' plugin" },
  { link: 'custom-webhook', url: '/custom-webhook', description: "Expose a sample webhook (via HTTP POST), by 'fastify-webhook' plugin" },
  { link: 'healthcheck', url: '/health', description: "Expose an healthcheck, by 'fastify-healthcheck' plugin" }
].sort(utils.compareProperties('link')) // opt. add sort order, 'asc' (by default) or 'desc'

// define some routes
// note that some routes here are normal (non-async) but others are async ...
async function routes (fastify, options = {}) {
  if (!fastify) {
    throw new Error('Fastify instance must have a value')
  }

  // define the root route, async (but normal is good the same)
  fastify.get('/', async (request, reply) => {
    // utils.logRoute(request)
    // publish a message in the queue, as a sample
    publish(fastify.nc, k.queueName, k.queueDisabled,
      `Hello World, from the root page of a Fastify web application at '${k.hostname}'!`
    )
    // with a layout set it's better to use a partial template here, to avoid duplication of tags ...
    // return reply.view('index', { // full index page no more used at the moment, but keep for reference/example ...
    return reply.view('fragment-index', {
      ...commonPageData,
      title: 'Home',
      welcome: 'Work-In-Progress/Prototype webapp',
      sampleRoutes,
      pluginRoutes
    })
    // ensure to return something at the end of an async function
  })
  // example route to return current timestamp, in async way
  fastify.get('/time', async (request, reply) => {
    const now = new Date()
    const timestamp = now.getTime()
    // publish a message in the queue, as a sample
    publish(fastify.nc, k.queueName, k.queueDisabled,
      `Ask for server time: timestamp is ${timestamp} at '${k.hostname}'`
    )
    return {
      timestamp,
      time: now.toISOString()
    }
  })
  // example route to return a page from a template, async (but normal is good the same)
  fastify.get('/simple', async (request, reply) => {
    // publish a message in the queue, as a sample
    publish(fastify.nc, k.queueName, k.queueDisabled,
      `Ask for a template page at '${k.hostname}'`
    )
    return reply.view('simple', {
      ...commonPageData,
      title: 'Simple but full Template'
    })
  })
  // example route to return a page from a template, async (but normal is good the same)
  // note that same this uses the same template of the root page, but with less template variables
  fastify.get('/template', async (request, reply) => {
    // publish a message in the queue, as a sample
    publish(fastify.nc, k.queueName, k.queueDisabled,
      `Ask for a template page at '${k.hostname}'`
    )
    // with a layout set it's better to use a partial template here, to avoid duplication of tags ...
    return reply.view('fragment-template', {
      ...commonPageData,
      title: 'Home page from a template'
    })
  })
  // example route, to always generate an error
  fastify.get('/error', async (req, reply) => {
    reply.code(500)
    const err = new Error()
    err.message = 'Error Message'
    err.statusCode = reply.code
    err.description = 'Verbose Error description...'
    // publish a message in the queue, as a sample
    publish(fastify.nc, k.queueName, k.queueDisabled,
      `Ask for error page at '${k.hostname}'`
    )
    return err
  })

  // add other (related) routes from a dedicated source, as a sample
  // require('./route-info')(fastify, { routesList: sampleRoutes })
  // new, load it as a plugin
  fastify.register(require('./route-info'), { routesList: sampleRoutes })
}

module.exports = routes
