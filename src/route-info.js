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

const k = require('./constants')
const utils = require('./utils')

// define routes but no async at outer level
// note that some routes here are normal (non-async) but others are async ...
function routes (fastify, { routesList = [] } = {}) {
  // add some routes

  // example route to return some info on current package/version, in async way
  // this exposes even framework version, which is a sensitive information (for security),
  // so in a real app protect it or remove from here, or send when related config flag is not disabled
  // to guarantee that the async route always return a value,
  // the code called function inside the helper function is wrapped in a try/catch
  fastify.get('/info/app', async (request, reply) => {
    const app = infoAPP() || {}
    if (app.err !== undefined && app.err !== null) {
      return app.err
    } else {
      return app.data || {}
    }
  })
  // example route to return some info on current scm (if available), in async way
  // this exposes sensitive information (for security), in a real app protect it
  fastify.get('/info/scm', async (request, reply) => {
    const scm = await infoSCM() || {}
    if (scm.err !== undefined && scm.err !== null) {
      return scm.err
    } else {
      return scm.data || {}
    }
  })
  // example route to return some info on the operating system (os), in async way
  // this exposes sensitive information (for security), in a real app protect it
  fastify.get('/info/os', async (request, reply) => {
    const os = infoOS() || {}
    if (os.err !== undefined && os.err !== null) {
      return os.err
    } else {
      return os.data || {}
    }
  })
  // example route to return some info (gruping other info results), in async way
  // this exposes sensitive information (for security), in a real app protect it
  fastify.get('/info/all', async (request, reply) => {
    const all = {}
    try {
      all.app = infoAPP()
      all.scm = await infoSCM()
      all.os = infoOS()
    } catch (e) {
      fastify.log.error(e)
    }
    return all
  })

  // add routes to a convenience list of routes, to generate content/links in the home page
  routesList.push(
    { link: 'info:app', url: '/info/app', description: 'Show some info about application package version etc (async)' },
    { link: 'info:scm', url: '/info/scm', description: 'Show some info about source control system (if any): branch, commit hash, version, etc (async)' },
    { link: 'info:os', url: '/info/os', description: 'Show some info about operating system (async)' },
    { link: 'info:all', url: '/info/all', description: 'Show all info (async)' }
  )
  routesList.sort()
}

// returns some info about the current application, and from its runtime process
// returned value is an "either" object, containing err (error message) and data, but only one of them is not null
function infoAPP (options = {}) {
  let err = null
  let data = {}
  try {
    data.app = {
      environment: utils.fromEnv('ENVIRONMENT'),
      frameworkVersion: k.fastifyVersion,
      name: k.packageName,
      version: k.packageVersion
    }
    data.runtime = {
      platform: utils.platformName(),
      nodejs: utils.runtimeVersion(),
      mode: utils.currentEnv(),
      pid: utils.pid(),
      uptime: utils.uptimeProcess(),
      memory_free: utils.osMemoryFree()
    }
    // throw new Error('Whoops!') // example, to test the right behavior of the either return value
  } catch (e) {
    err = e.message
    data = null
  }
  return { err, data }
}

// returns some info about the source control system (scm) on these sources, if available
// returned value is an "either" object, containing err (error message) and data, but only one of them is not null
// this is an async function
async function infoSCM (options = {}) {
  // check git related data by executing it
  let err = null
  let data = {}
  try {
    // data.description = await utils.gitVersion().catch(e => err = e.message)), // sample catch for error in a single promise
    // simpler, catch errors from all promises via try/catch in callers ...
    data.description = await utils.gitVersion()
    data.branch = await utils.gitBranch()
    data.hashShort = await utils.gitHashShort()
    data.hashFull = await utils.gitHashFull()
    // throw new Error('Whoops!') // example, to test the right behavior of the either return value
  } catch (e) {
    err = e.message
    data = null
  }
  return { err, data }
}

// returns some info on the operating system (os)
// returned value is an "either" object, containing err (error message) and data, but only one of them is not null
function infoOS ({ includeEnv = false } = {}) {
  let err = null
  let data = {}
  try {
    data.platform = utils.osPlatform()
    data.version = utils.osVersion()
    data.arch = utils.osArch()
    data.cpu_cores = utils.osCPU().length
    data.memory = utils.osMemoryTotal()
    data.host = utils.osHost()
    data.uptime = utils.osUptime()
    if (includeEnv === true) {
      data.env = utils.envVars() // too many sensitive info here, enable only when needed
    }
    // throw new Error('Whoops!') // example, to test the right behavior of the either return value
  } catch (e) {
    err = e.message
    data = null
  }
  return { err, data }
}

// TODO: refactor to simplify the usage of a value as either: {err , data } and related creation and data extraction ... wip

module.exports = routes
