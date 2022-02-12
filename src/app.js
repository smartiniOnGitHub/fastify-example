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

const templateEngine = require('ejs')

const publicFolderFromScript = path.normalize(path.join(k.projectFolderFromScript, 'public', path.sep))

// function that wraps the web application and related content
// note: when defined as async, remove the done argument
// function app (fastify, options = {}, done) {
async function app (fastify, options = {}) {
  if (!fastify) {
    throw new Error('Fastify instance must have a value')
  }

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
  // const features = require('./features')(fastify, null)
  // new, load it as a plugin
  fastify.register(require('./features'))

  // load some publish/subscribe utility functions
  // const { publish, subscribe } = require('./pubsub')

  // define some routes
  // const routes = require('./route')(fastify, null)
  // new, load it as a plugin
  fastify.register(require('./route'))

  // define some callback logic, called when the application has successfully initialized
  // moved in main server source, more useful than in app (no needed in tests, etc)
  // fastify.ready(() => { ... })

  // continue on next middleware
  // done() // not need with async definition of current function
}

module.exports = app
