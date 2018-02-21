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

// note that this is not neccessarily the main/entry point file, unless specified/called directly ...
console.log(`Sample JavaScript Test file using TAP ...`)

const tap = require('tap')
const test = tap.test
const request = require('request')
const fs = require('fs')
const path = require('path')
const resolve = require('path').resolve

// test zero, just to ensure that test framework works
tap.pass('this is an empty test, but test frameworks works')

// load the module/s to test
const utilModule = require('../src/utils.js')

// first tests, on a utility module
tap.equal(utilModule.isStringEmpty('not empty'), false)
tap.equal(utilModule.isStringEmpty(''), true)

// other tests, using a different (better) syntax
test('util, string empty or not', (t) => {
  t.plan(2)
  // const util = require('../src/utils.js')  // forbidden by my ESLint rules (at the moment), and best practice
  const util = utilModule

  t.strictEqual(utilModule.isStringEmpty('not empty'), false)
  t.strictEqual(utilModule.isStringEmpty(''), true)
})

// etc ...
