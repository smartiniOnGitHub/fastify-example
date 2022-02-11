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
/* eslint no-process-env: "off" */
/* eslint no-eval: "off" */

// define a general object, and assign functions to it ...
// const utils = {}

// some generic utility functions
module.exports.clearConsole = function () {
  if (console.clear) { console.clear() }
}
module.exports.normalizeData = function (data, asArray) {
  if (data != null) { return data } else {
    if (data instanceof Array || asArray) { return [] } else { return {} }
  }
}
module.exports.getOrElse = function (obj, def) {
  if (typeof obj !== 'undefined' && obj !== null) { return Object.create(obj) } else { return def }
}
module.exports.getType = function (obj) {
  return typeof obj
}
module.exports.getTypeFromConstructor = function (obj) {
  if (typeof obj !== 'undefined' && obj !== null) { return obj.constructor.name } else { return null }
}
module.exports.getTypeFromPrototype = function (obj) {
  return Object.prototype.toString.call(obj).slice(8, -1)
}
module.exports.has = function (obj, key) {
  return key in obj
}
module.exports.hasLocalOrInPrototype = function (obj, key, searchInPrototype) {
  if (!searchInPrototype) { return Object.prototype.hasOwnProperty.call(obj, key) } else {
    return key in obj
  }
}
module.exports.isDefined = function (o) {
  return (typeof o !== 'undefined')
}
module.exports.isUndefined = function (o) {
  return (typeof o === 'undefined')
}
module.exports.isNull = function (o) {
  return (o === null)
}
module.exports.isNotNull = function (o) {
  return (o !== null)
}
module.exports.isDefinedAndNotNull = function (o) {
  return (o !== undefined && o !== null)
}
module.exports.isUndefinedOrNull = function (o) {
  return (o === undefined || o === null)
}
module.exports.isUndefinedOrNullArrayItem = function (a) {
  if (this.isUndefinedOrNull(a) && !this.isArray(a)) {
    return true
  } else {
    for (const item of a) {
      if (item === null) { return true }
    }
    return false
  }
}
module.exports.isFunction = function (f) {
  return (typeof f === 'function')
}
module.exports.isArray = function (o) {
  return (Array.isArray(o))
}
module.exports.isBoolean = function (o) {
  return (typeof o === 'boolean')
}
module.exports.isNumber = function (o) {
  return (typeof o === 'number')
}
module.exports.isDate = function (o) {
  return (typeof o === 'object' || o instanceof Date)
}

module.exports.isValidDate = function (d) {
  return (this.isDate(d) && !isNaN(d))
}
module.exports.isString = function (o) {
  return (typeof (o) === 'string')
}
module.exports.isNullOrEmpty = function (o) {
  return (o == null || (this.isString(o) && o.length === 0) || (this.isArray(o) && o.length === 0))
}
module.exports.isRegExp = function (o) {
  return (typeof o === 'object' && o instanceof RegExp)
}
module.exports.isMap = function (o) { // ES6 Maps
  return (o instanceof Map || o instanceof WeakMap)
}
module.exports.isSet = function (o) { // ES6 Sets
  return (o instanceof Set || o instanceof WeakSet)
}
module.exports.isSymbol = function (o) { // ES6 Symbols
  return (typeof o === 'symbol')
}
module.exports.isObject = function (o) {
  return (typeof o === 'object')
}
module.exports.isError = function (o) {
  return (o instanceof Error && typeof o.message !== 'undefined')
}
module.exports.objectOwnPropertiesNames = function (obj) {
  // return all own properties names of the given object, as a list (array)
  return Object.keys(obj)
}
module.exports.objectOwnPropertiesList = function (obj) {
  // return all own properties of the given object, as a list (array)
  const values = []
  for (const prop in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, prop)) {
      values.push(prop)
    }
  }
  return values
}
module.exports.isArrayEmpty = function (obj) {
  if (this.isUndefinedOrNull(obj)) { return true }
  return obj.length === 0
}
module.exports.isStringEmpty = function (obj) {
  if (this.isUndefinedOrNull(obj)) { return true }
  return obj.length === 0
}
module.exports.isStringTrimmedEmpty = function (obj) {
  if (this.isUndefinedOrNull(obj)) { return true }
  return obj.trim().length === 0
}
module.exports.isEmpty = function (obj) {
  if (this.isUndefinedOrNull(obj)) { return true }
  if (this.isArray(obj) || this.isString(obj)) { return obj.length === 0 }
  if (this.isMap(obj) || this.isSet(obj)) { return obj.size === 0 }
  if (this.isObject(obj)) { return this.objectOwnPropertiesNames(obj).length === 0 }
  return false
}
module.exports.isStringFalse = function (obj) {
  return (this.isString(obj) && ['false', 'f', 'no', 'n', '0'].indexOf(obj.toLowerCase()) > -1)
}
module.exports.isStringTrue = function (obj) {
  return (this.isString(obj) && ['true', 't', 'yes', 'y', '1'].indexOf(obj.toLowerCase()) > -1)
}
module.exports.inherit = function (proto) {
  function F () { }
  F.prototype = proto
  return new F()
}
module.exports.formatObjectToJson = function (o) {
  return JSON.stringify(o)
}
module.exports.formatObjectToString = function (o, onlyOwnProperties) {
  let dump = ''
  let oop = false
  if (typeof onlyOwnProperties === 'undefined') { oop = true }
  for (const prop in o) {
    if (oop === false || Object.prototype.hasOwnProperty.call(o, prop)) {
      dump = dump + prop + ': ' + o[prop] + ', '
    }
  }
  return dump
}
module.exports.formatObjectToMap = function (o) {
  if (Object.entries && typeof Map !== 'undefined') { return new Map(Object.entries(o)) } else { return null }
}
module.exports.formatDateToTimestampNoCheck = function (d) {
  return d.toISOString()
}
module.exports.formatCurrentDateToTimestamp = function () {
  return this.formatDateToTimestampNoCheck(new Date())
}
module.exports.parseDateFromISOStringNoCheck = function (d) {
  return Date.parse(d)
}
module.exports.parseStringToBoolean = function (str, def) {
  if (this.isUndefinedOrNull(str) && this.isDefinedAndNotNull(def)) {
    return def
  }

  switch (str.toLowerCase().trim()) {
    case 'false':
    case 'f':
    case 'no':
    case 'n':
    case '0':
    case null:
      return false
    case 'true':
    case 't':
    case 'yes':
    case 'y':
    case '1':
      return true
    default:
      return def
  }
}
module.exports.parseJSON = function (str, callback) {
  if (!this.isFunction(callback)) {
    throw new TypeError(`Illegal argument: callback must be a function, instead got a '${typeof callback}'`)
  }

  try {
    const parsedJSON = JSON.parse(str)
    callback(null, parsedJSON)
  } catch (err) {
    callback(err, null)
  }
}
module.exports.lowercase = function (o) {
  return this.isString(o) ? o.toLowerCase() : o.toString().toLowerCase()
}
module.exports.uppercase = function (o) {
  return this.isString(o) ? o.toUpperCase() : o.toString().toUpperCase()
}
module.exports.toInt = function (str) {
  return parseInt(str, 10)
}
module.exports.executeIfTrue = function (f, c) {
  let r = null
  if (this.isFunction(f) && c === true) {
    const fArgs = Array.prototype.slice.call(arguments, 2)
    r = f.apply(this, fArgs) // pass all arguments (if any) after those given to main function ...
  }

  return r
}
module.exports.evaluate = function (statement) {
  const evaluator = eval
  try {
    evaluator(statement)
    return true
  } catch (e) {
    return false
  }
}
module.exports.isErrorAvailable = function () {
  return (typeof Error !== 'undefined')
}

module.exports.throwError = function (msg) { // note that msg could be a string or an Error, or another Object ...
  if (this.isErrorAvailable()) { throw new Error(msg) } else { throw msg } // fallback
}
module.exports.errorNotImplemented = function () {
  this.throwError('Not Implemented (implementation missing)')
}
module.exports.errorNotCallable = function () {
  this.throwError('Not Callable (abstract, implement it in childs)')
}
module.exports.logDebugMessage = function (message) {
  if (!this.isEnvDevelopment) { return }
  // else ...
  const msg = this.name + ': ' + ((message != null) ? message : '')
  console.debug(msg)
}
module.exports.noop = function () {
  // do nothing ...
}

module.exports.userBrowser = function () {
  // browser specific
  if (window && window.navigator) { return window.navigator.userAgent } else { return null }
}
module.exports.userLanguage = function () {
  // browser specific
  if (window && window.navigator) { return window.navigator.language || window.navigator.userLanguage } else { return null }
}
module.exports.userLanguages = function () {
  // browser specific
  if (window && window.navigator) { return window.navigator.languages } else { return null }
}
module.exports.userLocale = function () {
  // browser specific
  if (window && window.navigator && window.navigator.languages) { return window.navigator.languages[0] } else { return null }
}

// const process = require('process') // provided by Node.js // implicitly available

// returns the value of the given variable name from the Node.js environment
module.exports.fromEnv = function (varName) {
  return process.env[varName]
}
// returns the current Node.js environment
module.exports.currentEnv = function () {
  return process.env.NODE_ENV || 'development'
}
// tell if the current Node.js environment is development
module.exports.isEnvDevelopment = function () {
  return (this.currentEnv() === 'development')
}
// tell if the current Node.js environment is production
module.exports.isEnvProduction = function () {
  return (this.currentEnv() === 'production')
}
// tell if the current Node.js environment is not production
module.exports.isEnvNotProduction = function () {
  return !this.isEnvProduction()
}
// returns the current Node.js version
module.exports.runtimeVersion = function () {
  return process.version || 'unknown'
}
// returns the current Platform name for the process
module.exports.platformName = function () {
  return process.platform || 'unknown'
}

// returns the current process uptime (in sec)
module.exports.uptimeProcess = function () {
  return process.uptime() || 0.0
}

// returns the current process id (pid)
module.exports.pid = function () {
  return process.pid || 0
}

// returns the current environment variables
module.exports.envVars = function () {
  return process.env || {}
}

const os = require('os') // provided by Node.js

// returns the current host uptime (in sec)
module.exports.osUptime = function () {
  return os.uptime() || 0
}

// returns the Platform name of the OS
module.exports.osPlatform = function () {
  return os.platform() || 'unknown'
}

// returns the Architecture name of the OS
module.exports.osArch = function () {
  return os.arch() || 'unknown'
}

// returns detailed CPU info (about core/s) from the OS
module.exports.osCPU = function () {
  return os.cpus() || []
}

// returns the Version of the OS
module.exports.osVersion = function () {
  return os.release() || 'unknown'
}

// returns the Host name, from the OS
module.exports.osHost = function () {
  return os.hostname() || 'unknown'
}

// returns the total memory available, from the OS
module.exports.osMemoryTotal = function () {
  return os.totalmem() || 0
}

// returns the free memory available, from the OS
module.exports.osMemoryFree = function () {
  return os.freemem() || 0
}

// log to console
module.exports.logToConsole = function (msg) {
  console.log(msg)
}

// log a fastify request, but only the given URL
module.exports.logRoute = function (req) {
  req.log.info(`Got request for URL: '${req.req.url}' ...`)
}

// log a fastify request, full
module.exports.logRequest = function (req) {
  const details = this.dumpObject(req.req)
  // const details = this.dumpObject(req.req, {method:'inspect'})
  req.log.info(`Got request for URL: '${req.req.url}', details: '${details}' ...`)
}

// register in the app the given module
module.exports.registerLoadedModule = function (app, loadedModule, opts, uri) {
  if (this.isUndefinedOrNullArrayItem([app, loadedModule])) { throw new Error('Missing mandatory argument (undefined or null)') }
  app.log.info(`Registering the app module from URI '${uri}' ...`)
  app.register(loadedModule, function (err) {
    if (err) { throw err }
  })
}

// build an Error with the given arguments, and throw or return it, depending on the last flag
module.exports.buildError = function (req, msg, code, description, throwError) {
  const error = new Error()
  error.message = msg
  error.statusCode = (code != null) ? code : 0
  error.description = (description != null) ? description : null
  req.log.error(`Build a new Error: code:${error.statusCode}, message:'${error.message}', description:'${error.description}', and throw it:${throwError}`)
  if (throwError === true) { throw error } else { return error }
}

const util = require('util') // provided by Node.js

// dump the given object using 'JSON.stringify' or Node.js 'util.inspect' (requires its module 'util'), depending on the given options
// opts is optional, but if given
// opts.method could have one of the following values: 'stringify', 'inspect', 'fast-json-stringify', null (for the default behavior)
module.exports.dumpObject = function (obj, opts) {
  if (this.isUndefinedOrNull(opts)) { return (obj != null) ? obj.toString() : obj }

  let val = null
  switch (opts.method) {
    case 'inspect':
      val = util.inspect(obj)
      break
    case 'fast-json-stringify':
      // TODO: implement later ...
      // val = stringify(obj)
      break
    case 'stringify':
      val = JSON.stringify(obj) // attention to circular references, some types not dump, etc ...
      break
    default:
      val = obj.toString() // default in js
  }
  return val
}

// later add a specific function to log dumpObject using app logger

// resolve the given value (generic, by default 0), after the number of given seconds (by default 1), returning a Promise
// use it with the async / await syntax (recommended)
module.exports.valueDelayed = function (value = 0, sec = 1) {
  return new Promise((resolve) => {
    setTimeout(() => { resolve(value) }, sec * 1000)
  })
}

// tell if a feature is enabled
module.exports.featureIsEnabled = function (trueIsDisabled = false, booleanStringName = '', defaultBooleanValue = true) {
  return (trueIsDisabled === true)
    ? !this.parseStringToBoolean(booleanStringName, defaultBooleanValue)
    : this.parseStringToBoolean(booleanStringName, defaultBooleanValue)
}

// sort string properties of objects,
// given 'key' (string property name), 'order' ('asc' or 'desc')
module.exports.compareProperties = function (key, order = 'asc') {
  return function (a, b) {
    if (!Object.prototype.hasOwnProperty.call(a, key) || !Object.prototype.hasOwnProperty.call(b, key)) return 0
    const comparison = a[key].localeCompare(b[key])
    return (order === 'asc') ? comparison : (comparison * -1)
  }
}

// const exec = util.promisify(require('child_process').exec) // provided by Node.js
const execFile = util.promisify(require('child_process').execFile) // provided by Node.js

module.exports.gitVersion = async function () {
  const { stdout, stderr } = await execFile('git', ['version'])
  // const { stdout, stderr } = await execFile('git', ['version']).catch(e => console.error('Error: ', e.message)) // log some error info here
  // otherwise, do the same in callers (a catch for each promise, or wrap in a try/catch block) ...
  return stdout.replace('\n', '')
}

module.exports.gitBranch = async function () {
  const { stdout, stderr } = await execFile('git', ['branch'])
  return stdout.substring(2).replace('\n', '')
}

module.exports.gitHashFull = async function () {
  const { stdout, stderr } = await execFile('git', ['rev-parse', 'HEAD'])
  return stdout.replace('\n', '')
}

module.exports.gitHashShort = async function () {
  const { stdout, stderr } = await execFile('git', ['rev-parse', '--short', 'HEAD'])
  return stdout.replace('\n', '')
}

// utility function to return a value from an Either object:
// error if defined (or throw it if related flag is true),
// or the value (or its default value)
module.exports.getFromEither = function (either, { throwOnError = false, value = {} } = {}) {
  if (either === undefined || either === null) { throw new Error('Missing mandatory argument (undefined or null)') }
  if (either.err !== undefined && either.err !== null) {
    if (throwOnError === true) { throw either.err }
    // else
    return either.err
  } else {
    return either.data || value
  }
}

// export main object
// module.exports.utils = utils
