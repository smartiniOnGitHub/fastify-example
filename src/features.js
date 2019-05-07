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
/* eslint no-inner-declarations: "off" */

// const assert = require('assert')

const k = require('./constants')
const utils = require('./utils')

// configuration for enabled/disabled features
const featuresEnabled = {
  platformInfo: utils.featureIsEnabled(true, utils.fromEnv('FEATURE_PLATFORM_INFO_DISABLE'), false),
  favicon: utils.featureIsEnabled(true, utils.fromEnv('FEATURE_FAVICON_DISABLE'), false),
  webhook: utils.featureIsEnabled(true, utils.fromEnv('FEATURE_WEBHOOK_DISABLE'), false),
  healthcheck: utils.featureIsEnabled(true, utils.fromEnv('FEATURE_HEALTHCHECK_DISABLE'), false),
  cloudevents: utils.featureIsEnabled(true, utils.fromEnv('FEATURE_CLOUDEVENTS_DISABLE'), false),
  cloudeventsStrictMode: utils.featureIsEnabled(true, utils.fromEnv('FEATURE_CLOUDEVENTS_STRICT_DISABLE'), false),
  nats: utils.featureIsEnabled(true, utils.fromEnv('FEATURE_NATS_DISABLE'), false)
}

// load some publish/subscribe utility functions
const { publish, subscribe } = require('./pubsub')

// features is a function because I need to pass fastify instance, and some configuration options
// otherwise implement as a class and pass those arguments in its constructor)
function features (fastify, options = {}) {
  if (!fastify) {
    throw new Error('Fastify instance must have a value')
  }

  const featuresEnabledMsg = `Webapp features enabled: '${utils.dumpObject(featuresEnabled, { method: 'stringify' })}'`
  utils.logToConsole(featuresEnabledMsg)

  if (featuresEnabled.platformInfo) {
    // log some platform info
    fastify.log.info(`Node.js ${utils.runtimeVersion()}, running on OS: ${utils.platformName()}`)
    // log some package and framework info
    fastify.log.info(`Webapp ${k.packageName}-v${k.packageVersion}, running on Fastify-v${k.fastifyVersion}`)
    // log enabled features of the webapp
    fastify.log.info(featuresEnabledMsg)
  }

  if (featuresEnabled.favicon) {
    // fastify-favicon, example with null or empty options, using only plugin default options
    // fastify.register(require('fastify-favicon'))
    // example with custom path, usually relative to project root (without or with the final '/' char), but could be absolute
    fastify.register(require('fastify-favicon'), {
      path: k.imagesFolderFromScript
    })
  }

  if (featuresEnabled.webhook) {
    // fastify-webhook, example with null or empty options, using only plugin default options
    // fastify.register(require('fastify-webhook'))
    // enable later and comment the previous example ... ok
    const webhookHandlers = require('fastify-webhook/src/handlers') // get plugin handlers (optional)
    const webhookPlugin = require('fastify-webhook')
    fastify.register(webhookPlugin, {
      url: k.mappings.webhookMapping,
      handler: webhookHandlers.echo,
      // disableWebhook: false, // same as default
      enableGetPlaceholder: true, // as a sample
      secretKey: process.env.WEBHOOK_SECRET_KEY // optional: || '' , or || null
    })
    fastify.log.info(`Webhook registered with custom options`)
  }

  if (featuresEnabled.healthcheck) {
    // fastify-healthcheck, example with null or empty options, using only plugin default options
    fastify.register(require('fastify-healthcheck'))
  }

  if (featuresEnabled.cloudevents) {
    // example usage of fastify-cloudevents plugin
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
      utils.logToConsole(`CloudEvent serialized, ${ser}`)
      publish(fastify.nats, k.queueName, k.queueDisabled, ser)
    }
    // override cloudEventOptions strict mode with a feature flag,
    // so in this way I don't need to add a dependency from constants to utils
    k.cloudEventOptions.strict = utils.featureIsEnabled(true, utils.fromEnv('FEATURE_CLOUDEVENTS_STRICT_DISABLE'), false)
    // fastify-cloudevents, example with only some most-common options
    fastify.register(require('fastify-cloudevents'), {
      serverUrl: k.serverUrl,
      serverUrlMode: k.serverUrlMode,
      baseNamespace: k.baseNamespace,
      // idGenerator: gen,
      onRequestCallback: loggingCallback,
      // onSendCallback: loggingCallback,
      onResponseCallback: loggingCallback,
      onErrorCallback: loggingCallback,
      cloudEventOptions: k.cloudEventOptions
    })
  }

  if (featuresEnabled.nats) {
    // example to connect to a nats queue using related plugin
    // temporarily disable standard plugin, and use my temporary one ... ok
    // fastify.register(require('fastify-nats'), k.natsQueueOptions)
    fastify.register(require('fastify-nats-client'), k.natsQueueOptions)
    fastify.after((err) => {
      if (err) console.log(err)
      // assert(fastify.nats !== null) // example
      if (fastify.nats !== null && fastify.nats.currentServer !== null) {
        utils.logToConsole(`Connected to the queue server at: '${fastify.nats.currentServer.url.href}'`)
      }
    })
  }

  fastify.log.info(`Webapp features loaded`)
}

module.exports = features
