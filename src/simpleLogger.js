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

// Simple Logger to console
function SimpleLogger (opts) {
  const self = this
  self.options = opts || {}
}
SimpleLogger.prototype = Object.create(null) // set the same prototype of the base class, in this case an empty object ('{}') or even null
SimpleLogger.prototype.constructor = SimpleLogger // set the right constructor for this class, important
SimpleLogger.prototype.debug = function (msg) {
  // note that this does nothing in modern Node.js runtimes (but does not generate error) ...
  if (msg !== undefined && msg !== null) { console.debug(`DEBUG - ${msg}`) }
}
SimpleLogger.prototype.info = function (msg) {
  if (msg !== undefined && msg !== null) { console.info(`INFO - ${msg}`) }
}
SimpleLogger.prototype.warn = function (msg) {
  if (msg !== undefined && msg !== null) { console.warn(`WARN - ${msg}`) }
}
SimpleLogger.prototype.error = function (msg) {
  if (msg !== undefined && msg !== null) { console.error(`ERROR - ${msg}`) }
}
SimpleLogger.prototype.clearConsole = function () {
  if (console.clear) { console.clear() }
}

// add other features, like disable/enable log levels, etc ... maybe later

// export main object
module.exports = SimpleLogger
