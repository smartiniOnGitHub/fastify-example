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

const hostname = require('os').hostname()
// const assert = require('assert')

const isDocker = require('is-docker')

const k = {
  packageName: require('../package.json').name,
  packageVersion: require('../package.json').version,
  hostname,
  protocol: 'http',
  address: process.env.HTTP_ADDRESS || '127.0.0.1', // safer default
  port: process.env.HTTP_PORT || 8000,
  folders: {
    templatesFolderName: 'templates',
    publicAssetsFolderName: 'public',
    cssAssetsFolderName: 'css',
    imagesAssetsFolderName: 'img',
    jsAssetsFolderName: 'js'
  },
  mappings: {
    rootMapping: '/',
    staticAssetsMapping: '/static/',
    webhookMapping: '/custom-webhook'
  },
  serverUrlMode: 'pluginAndRequestUrl', // same behavior as default value, but in this way set in CloudEvent extension object
  baseNamespace: 'com.github.smartiniOnGitHub.fastify-example.server',
  cloudEventOptions: {
    strict: true // enable strict mode in generated CloudEvents, optional
  },
  natsQueueOptions: {
    url: process.env.NATS_SERVER_URL // use the specified one, or plugin default
  // }
  },
  queueDisabled: process.env.NATS_SERVER_DISABLE || false
  // queueDisabled: utils.isStringTrue(process.env.FEATURE_NATS_DISABLE)
}
// to make it work (be exposed) when deployed in a container (Docker, etc) we need to listen not only to localhost but for example to all interfaces ...
if (!process.env.HTTP_ADDRESS) {
  k.address = (isDocker() === true) ? '0.0.0.0' : '127.0.0.1'
}
k.serverUrl = `${k.protocol}://${k.address}:${k.port}`
k.source = k.serverUrl
k.queueName = `${k.packageName}-${k.packageVersion}`
k.message = `Hello World, from a Fastify web application just started at '${k.hostname}'!`

module.exports = k
