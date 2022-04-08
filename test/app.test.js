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

const assert = require('assert').strict
const test = require('tap').test
const tap = require('tap')

// load environment specific variables from '.env' file (if any) into process.env ...
const dotenv = require('dotenv')
dotenv.config()

const Fastify = require('fastify')
const App = require('../src/app')

// load/init webapp constants and general utilities
const k = require('../src/constants')
// const utils = require('../src/utils')

const fastifyOptions = JSON.parse(k.fastifyOptionsString)

// some basic test, but using the async/await syntax
test('Basic', async t => {
  const fastify = Fastify()
  await fastify.register(App)
  t.teardown(() => { fastify.close() })

  const response = await fastify.inject({
    method: 'GET',
    path: '/health'
  })

  t.equal(response.statusCode, 200)
  const r = response.json()
  t.equal(r.statusCode, 200)
  t.equal(r.status, 'ok')
  // other fields in it like uptime, so no other assertions (it would be too complex to compare)

  t.end()
})

// some basic test, but using the async/await syntax
test('Basic with options', async t => {
  const fastify = Fastify(fastifyOptions)
  await fastify.register(App, fastifyOptions)
  t.teardown(() => { fastify.close() })

  const response = await fastify.inject({
    method: 'GET',
    path: '/health'
  })

  t.equal(response.statusCode, 200)
  const r = response.json()
  t.equal(r.statusCode, 200)
  t.equal(r.status, 'ok')
  // other fields in it like uptime, so no other assertions (it would be too complex to compare)

  t.end()
})

// etc ...
