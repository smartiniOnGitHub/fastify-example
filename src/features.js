/*
 * Copyright 2018-2023 the original author or authors.
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

// features wrap: depending on enabled feature flags, load and configure each one
// loaded as a Fastify plugin can't return value (it's discarded by the caller, even if assigned as return value),
// so it seems better to load it in a normal way, but async now

// const assert = require('assert').strict

const k = require('./constants')
const utils = require('./utils')

// configuration for enabled/disabled features
const featuresEnabled = {
  platformInfo: utils.featureIsEnabled(true, utils.fromEnv('FEATURE_PLATFORM_INFO_DISABLE'), false),
  checkRuntimeEnv: utils.featureIsEnabled(true, utils.fromEnv('FEATURE_CHECK_RUNTIME_ENV_DISABLE'), false),
  favicon: utils.featureIsEnabled(true, utils.fromEnv('FEATURE_FAVICON_DISABLE'), false),
  webhook: utils.featureIsEnabled(true, utils.fromEnv('FEATURE_WEBHOOK_DISABLE'), false),
  healthcheck: utils.featureIsEnabled(true, utils.fromEnv('FEATURE_HEALTHCHECK_DISABLE'), false),
  cloudevents: utils.featureIsEnabled(true, utils.fromEnv('FEATURE_CLOUDEVENTS_DISABLE'), false),
  cloudeventsStrictMode: utils.featureIsEnabled(true, utils.fromEnv('FEATURE_CLOUDEVENTS_STRICT_DISABLE'), false),
  cloudeventsLogConsole: utils.featureIsEnabled(true, utils.fromEnv('FEATURE_CLOUDEVENTS_LOG_CONSOLE_DISABLE'), false),
  cloudeventsLogFile: utils.featureIsEnabled(true, utils.fromEnv('FEATURE_CLOUDEVENTS_LOG_FILE_DISABLE'), true),
  nats: utils.featureIsEnabled(true, utils.fromEnv('FEATURE_NATS_DISABLE'), false)
}

// load some publish/subscribe utility functions
const { publish, subscribe } = require('./pubsub')

// features is a function because I need to pass fastify instance, and some configuration options
// otherwise implement as a class and pass those arguments in its constructor)
async function features (fastify, options = {}) {
  if (!fastify) {
    throw new Error('Fastify instance must have a value')
  }

  // define an object to return, it could contain useful data/references, depending on features enabled
  const features = {}

  const featuresEnabledMsg = `Webapp features enabled: '${utils.dumpObject(featuresEnabled, { method: 'stringify' })}'`
  utils.logToConsole(featuresEnabledMsg)

  let ceLogFile = null // defined here because I need it visible in two unrelated code blocks

  if (featuresEnabled.platformInfo) {
    features.platformInfo = { // sample to return some feature data
      nodejs: utils.runtimeVersion(),
      os: utils.platformName(),
      webappName: `${k.packageName}-v${k.packageVersion}`,
      framework: `Fastify-v${k.fastifyVersion}`
    }
    // log some platform info
    fastify.log.info(`Node.js ${features.platformInfo.nodejs}, running on OS: ${features.platformInfo.os}`)
    // log some package and framework info
    fastify.log.info(`Webapp ${features.platformInfo.webappName}, running on ${features.platformInfo.framework}`)
    // log enabled features of the webapp
    fastify.log.info(featuresEnabledMsg)
  }

  if (featuresEnabled.checkRuntimeEnv) {
    // check if current Node.js runtime env is compatible
    // with requirements in 'package.json', or an exception will the thrown
    const engines = require('../package.json').engines
    fastify.register(require('fastify-check-runtime-env'), {
      nodeVersionCheckAtStartup: true,
      // nodeVersionExpected: '<=10.13.0 >=200.0.0', // sample, to raise error
      nodeVersionExpected: engines.node,
      // onCheckMismatch: 'warning' // log a message
      // onCheckMismatch: 'exception' // throw an exception // same as default
      onCheckMismatch: 'exit' // exit from current process with an error code
    })
    // features.checkRuntimeEnv = {} // sample
  }

  if (featuresEnabled.favicon) {
    // fastify-favicon, example with null or empty options, using only plugin default options
    // features.favicon = {} // sample
    // fastify.register(require('fastify-favicon'))
    // example with custom path, usually relative to project root (without or with the final '/' char), but could be absolute
    fastify.register(require('fastify-favicon'), {
      path: k.imagesFolderFromScript
    })
  }

  if (featuresEnabled.webhook) {
    // fastify-webhook, example with null or empty options, using only plugin default options
    // fastify.register(require('fastify-webhook'))
    // features.webhook = {} // sample
    const webhookHandlers = require('fastify-webhook/src/handlers') // get plugin handlers (optional)
    const webhookPlugin = require('fastify-webhook')
    fastify.register(webhookPlugin, {
      url: k.mappings.webhookMapping,
      handler: webhookHandlers.echo,
      // disableWebhook: false, // same as default
      enableGetPlaceholder: true, // as a sample
      secretKey: process.env.WEBHOOK_SECRET_KEY // optional: || '' , or || null
    })
    fastify.log.info('Webhook registered with custom options')
  }

  if (featuresEnabled.healthcheck) {
    // fastify-healthcheck, example with null or empty options, using only plugin default options
    // features.healthcheck = {} // sample
    // enable only the option to expose even process uptime, as a sample
    fastify.register(require('fastify-healthcheck'), {
      exposeUptime: true
    })
  }

  if (featuresEnabled.nats) {
    // example to connect to a nats queue using related plugin
    features.nats = {} // put all values of this feature inside a specific object
    await fastify.register(require('fastify-nats-client'), {
      enableDefaultNATSServer: true, // sample, to connect by default to public demo server
      drainOnClose: true, // sample, to drain last messages at plugin close
      natsOptions: k.natsQueueOptions
    })
    // after, perform some checks
    // assert(utils.isDefinedAndNotNull(fastify.NATS))
    // assert(utils.isDefinedAndNotNull(fastify.nc))
    if (utils.isDefinedAndNotNull(fastify.nc) && utils.isNotNull(fastify.nc.currentServer)) {
      utils.logToConsole(`Connected to the queue server at: '${fastify.nc.getServer()}'`)
    }
    // check later if useful (once working) ...
    // features.nats.library = fastify.NATS
    // features.nats.connection = fastify.nc
    if (utils.isDefinedAndNotNull(fastify.nc)) {
      features.nats.currentServer = fastify.nc.getServer()
    }
    if (utils.isDefinedAndNotNull(fastify.NATS)) {
      features.nats.stringCodec = fastify.NATS.StringCodec()
      features.nats.jsonCodec = fastify.NATS.JSONCodec()
    }
  }

  if (featuresEnabled.cloudevents) {
    // example usage of fastify-cloudevents plugin
    // features.cloudevents = {} // put all values of this feature inside a specific object
    // define a sample id generator here
    // const pid = require('process').pid
    function * idCounterExample () {
      let counter = 0
      while (true) {
        yield `${counter++}`
      }
    }
    // instance the generator, to use everywhere here
    const gen = idCounterExample()
    // add a sample logging callback
    function loggingCallback (ce) {
      // const dump = fastify.CloudEvent.dumpObject(ce, 'ce')
      // utils.logToConsole(`CloudEvent dump, ${dump}`)
      // serialize the event, as a sample in all supported ways, but enable only one here
      // const ser = fastify.CloudEvent.serializeEvent(ce)
      // const ser = ce.serialize()
      const ser = fastify.cloudEventSerializeFast(ce)
      if (featuresEnabled.cloudeventsLogConsole) {
        utils.logToConsole(`CloudEvent serialized, ${ser}`)
      }
      if (featuresEnabled.cloudeventsLogFile) {
        ceLogFile.write(ser + '\n')
      }
      publish(fastify.nc, k.queueName, k.queueDisabled, ser)
    }
    // override cloudEventOptions strict mode with a feature flag,
    // so in this way I don't need to add a dependency from constants to utils
    k.cloudEventOptions.strict = utils.featureIsEnabled(true, utils.fromEnv('FEATURE_CLOUDEVENTS_STRICT_DISABLE'), false)
    // create the log file
    if (featuresEnabled.cloudeventsLogFile) {
      const fs = require('fs')
      ceLogFile = fs.createWriteStream(`./logs/${k.packageName}.json.log`)
      utils.logToConsole('CloudEvents log file Created')
      // handle log file close when the webapp will be closed
      // triggered when `fastify.close()` is invoked to stop the server, but not with <CTRL>C or webapp server stop
      fastify.addHook('onClose', (instance, done) => {
        ceLogFile.end()
        utils.logToConsole('CloudEvents log file Closed')
        done()
      })
    }
    // fastify-cloudevents, example with only some most-common options
    fastify.register(require('fastify-cloudevents'), {
      serverUrl: k.serverUrl,
      serverUrlMode: k.serverUrlMode,
      baseNamespace: k.baseNamespace,
      // idGenerator: gen,
      onErrorCallback: loggingCallback,
      onRequestCallback: loggingCallback,
      onResponseCallback: loggingCallback,
      // onSendCallback: loggingCallback,
      onTimeoutCallback: loggingCallback,
      cloudEventOptions: k.cloudEventOptions
    })
  }

  fastify.log.info('Webapp features loaded')

  // return some values
  return features
}

module.exports = features
