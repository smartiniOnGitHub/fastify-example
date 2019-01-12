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
  favicon: featureIsEnabled(true, process.env.FEATURE_FAVICON_DISABLE, false),
  webhook: featureIsEnabled(true, process.env.FEATURE_WEBHOOK_DISABLE, false),
  healthcheck: featureIsEnabled(true, process.env.FEATURE_HEALTHCHECK_DISABLE, false),
  cloudevents: featureIsEnabled(true, process.env.FEATURE_CLOUDEVENTS_DISABLE, false),
  nats: featureIsEnabled(true, process.env.FEATURE_NATS_DISABLE, false)
}

// tell if a feature is enabled
function featureIsEnabled (trueIsDisabled = false, booleanStringName = '', defaultBooleanValue = true) {
  return (trueIsDisabled === true)
    ? !utils.parseStringToBoolean(booleanStringName, defaultBooleanValue)
    : utils.parseStringToBoolean(booleanStringName, defaultBooleanValue)
}

// features is a function because I need to pass fastify instance, and some configuration options
// otherwise implement as a class and pass those arguments in its constructor)
function features (fastify, options = {}) {
  if (!fastify) {
    throw new Error('Fastify instance must have a value')
  }

  utils.logToConsole(`Webapp features enabled: '${utils.dumpObject(featuresEnabled, { method: 'stringify' })}'`)

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
    /*
    // TODO: add err as first argument, and use it or the normal one, so use: if (err) console.error else console.log ... wip
    function loggingCallback (err, ce) {
      const msg = `CloudEvent dump, ${fastify.CloudEvent.dumpObject(ce, 'ce')}`
      if (err) {
        console.error(msg)
      } else {
        console.log(msg)
      }
    }
     */
    function loggingCallback (ce) {
      console.log(`CloudEvent dump, ${fastify.CloudEvent.dumpObject(ce, 'ce')}`)
    }
    // fastify-cloudevents, example with only some most-common options
    fastify.register(require('fastify-cloudevents'), {
      serverUrl: k.serverUrl,
      serverUrlMode: k.serverUrlMode,
      // idGenerator: gen,
      onRequestCallback: loggingCallback,
      onResponseCallback: loggingCallback,
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
}

module.exports = features
