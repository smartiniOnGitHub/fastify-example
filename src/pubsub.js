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

const assert = require('assert')

const utils = require('./utils')
// const hostname = require('os').hostname()

function logReceivedMessage (msg) {
  utils.logToConsole(`Received message: ${msg}`)
}

// sample subscriber function for the NATS queue specified in constants
function subscribe (nats, queueName, disabled = false, cb = logReceivedMessage) {
  if (disabled === true) {
    return
  }
  assert(nats !== null)
  utils.logToConsole(`Subscribe to messages from the queue '${queueName}'`)

  // simple subscriber
  nats.subscribe(queueName, cb)
}

// sample publish function for the NATS queue specified in constants
function publish (nats, queueName, disabled = false, msg = '') {
  if (disabled === true) {
    return
  }
  assert(nats !== null)
  utils.logToConsole(`Publish message in the queue '${queueName}'`)

  // simple publisher
  nats.publish(queueName, msg)
}

module.exports = {
  publish,
  subscribe
}
