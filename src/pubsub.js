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

/*
// TODO: re-enable later ... wip
// TODO: later try to use fastify.NATS instead (published by my plugin) ... wip
const NATS = require('nats')
*/

const utils = require('./utils')
// const hostname = require('os').hostname()

function logReceivedMessage (err, msg) {
  utils.logToConsole(`Received message: (${err}, ${msg})`)
  if (err) {
    console.error(err.message)
  } else {
    /*
    // TODO: re-enable later ... wip
    // later find a good way to inject here NATS StringCodec,
    // or use it directly from an external variable ...
    const sc = NATS.StringCodec() // codec for a string message
    utils.logToConsole(`Message received, decoded: '${sc.decode(msg.data)}'`)
    */
  }
}

// sample subscriber function for the NATS queue specified in constants
async function subscribe (nats, queueName, disabled = false, cb = logReceivedMessage, dec = NATS.StringCodec()) {
  if (!nats || disabled === true) {
    return
  }
  utils.logToConsole(`Subscribe to messages from the queue '${queueName}'`)

  /*
  // TODO: re-enable later ... wip
  if (utils.isDefinedAndNotNull(cb)) {
    // simple subscriber with a callback
    nats.subscribe(queueName, { callback: cb }, {
      // max: 1 // after 1 message, auto-unsubscribe from the subject
    })
  } else {
    // use the recommended way, async iterator
    // example iterator subscription
    const sub = nats.subscribe(queueName, {
      // max: 1 // after 1 message, auto-unsubscribe from the subject
    })
    for await (const m of sub) {
      const decoded = dec.decode(m.data)
      utils.logToConsole(`Message received from async iterator, decoded: '${decoded}'`)
    }
  }
  */
}

// sample publish function for the NATS queue specified in constants
async function publish (nats, queueName, disabled = false, msg = '', enc = NATS.StringCodec()) {
  if (!nats || disabled === true) {
    return
  }
  utils.logToConsole(`Publish message in the queue '${queueName}'`)

  /*
  // TODO: re-enable later ... wip
  // simple publisher
  nats.publish(queueName, enc.encode(msg))
  */
}

module.exports = {
  publish,
  subscribe
}
