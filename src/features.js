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

const k = require('./constants')
const utils = require('./utils')

// configuration for enabled/disabled features
const featuresCEnabled = {
  favicon: !utils.parseStringToBoolean(process.env.FEATURE_FAVICON_DISABLE, false),
  webhook: !utils.parseStringToBoolean(process.env.FEATURE_WEBHOOK_DISABLE, false),
  healthcheck: !utils.parseStringToBoolean(process.env.FEATURE_HEALTHCHECK_DISABLE, false),
  cloudevents: !utils.parseStringToBoolean(process.env.FEATURE_CLOUDEVENTS_DISABLE, false),
  nats: !utils.parseStringToBoolean(process.env.FEATURE_NATS_DISABLE, false)
}

// features is a function because I need to pass fastify instance, and some configuration options
// otherwise implement as a class and pass those arguments in its constructor)
function features (fastify, options = {}) {
  if (!fastify) {
    throw new Error('Fastify instance must have a value')
  }

  utils.logToConsole(`Features enabled: '${utils.dumpObject(featuresCEnabled, { method: 'stringify' })}'`)

  // TODO: ...
}

module.exports = features
