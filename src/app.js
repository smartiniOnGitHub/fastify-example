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

// application wrap, configure and export Fastify definitions for the current application
// loaded as a Fastify plugin can't return value (it's discarded by the caller, even if assigned as return value),
// so it seems better to load it in a normal way, but async now

// load/init webapp constants and general utilities
const k = require('./constants')
const utils = require('./utils')

/*
// load environment specific variables from '.env' file (if any) into process.env ...
const dotenv = require('dotenv')
dotenv.config()

utils.logToConsole(`Server starting for ${k.packageName}-v${k.packageVersion} ...`)

// startup configuration constants
const fastifyOptions = JSON.parse(k.fastifyOptionsString)
const fastify = require('fastify')(fastifyOptions)
 */

// const assert = require('assert').strict
const path = require('path')
const resolve = path.resolve

const publicFolderFromScript = path.normalize(path.join(k.projectFolderFromScript, 'public', path.sep))

// function that wraps the web application and related content
async function app (fastify, options = {}) {
  if (!fastify) {
    throw new Error('Fastify instance must have a value')
  }

  // define an object to return, it could contain useful data/references, depending on needs
  let app = {}

  fastify.register(require('@fastify/view'), {
    engine: {
      ejs: require('ejs')
    },
    includeViewExtension: true,
    templates: k.folders.templatesFolderName,
    layout: 'layout', // global layout, used in all ejs pages
    viewExt: 'ejs',
    options: {
      // async: true, // check later if useful here, and how to use ...
      filename: resolve(k.folders.templatesFolderName),
      views: [publicFolderFromScript]
    }
  })

  fastify.register(require('@fastify/static'), {
    root: publicFolderFromScript,
    prefix: k.mappings.staticAssetsMapping // optional: default '/'
  })

  // load all webapp features that are enabled: need to pass fastify instance and maybe some options
  // const features = require('./features')(fastify, null)
  // load it as a plugin
  // await fastify.register(require('./features'))
  // new, load as normal function, to be able to get its return value (discarded otherwise)
  const features = await require('./features')(fastify, null)
  // note that JSON conversion will discard some object types (functions, etc)
  fastify.log.debug(`Return values from features: ${JSON.stringify(features)}`)

  // load some publish/subscribe utility functions
  // const { publish, subscribe } = require('./pubsub')

  // define some routes
  // const routes = require('./route')(fastify, null)
  // new, load it as a plugin
  await fastify.register(require('./route'))

  // define some callback logic, called when the application has successfully initialized
  // moved in main server source, more useful than in app (no needed in tests, etc)
  // fastify.ready(() => { ... })

  // return some values
  app = {
    results: true,
    features
  }
  return app
}

module.exports = app
