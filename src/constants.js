/*
 * Copyright 2018-2026 the original author or authors.
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

// const assert = require('assert').strict
const path = require('path')
const hostname = require('os').hostname()
const fs = require('fs')

// Synchronous check for Docker/Podman/container environment
// this is required because the 'is-docker' library now is published only as an ESM module,
// and we want to keep this file as CommonJS for compatibility with older Node.js versions
// (and also because it is not a problem to use sync check here, as it is executed only once at startup)
function isContainer () {
  try {
    // Check for Docker/Podman container marker
    if (fs.existsSync('/.dockerenv')) return true
    // Check for Podman-specific marker (when running rootless Podman or in some nested scenarios)
    if (fs.existsSync('/run/.containerenv')) return true
    // Check for container environment variables
    if (process.env.DOCKER_HOST) return true
    if (process.env.PODMAN_HOST) return true
    return false
  } catch (err) {
    return false
  }
}

const k = {
  packageName: require('../package.json').name,
  packageVersion: require('../package.json').version,
  fastifyVersion: require('fastify/package.json').version,
  projectFolderFromScript: path.normalize(path.join(__dirname, path.sep, '..', path.sep)),
  fastifyOptionsString: process.env.FASTIFY_OPTIONS || '{ "logger": { "level": "info" } }',
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
  serverUrlMode: 'pluginAndRequestSimplified', // same behavior as default value, but in this way set in CloudEvent extension object
  // baseNamespace: 'com.github.smartiniOnGitHub.fastify-example',
  cloudEventOptions: {
    strict: true // enable strict mode in generated CloudEvents, optional
  },
  natsQueueOptions: {
    servers: process.env.NATS_SERVER_URL // use from env var, or use NATS demo if plugin option is enabled
  },
  queueDisabled: false // always try to send messages to the queue, as a sample
}
k.imagesFolderFromScript = path.normalize(path.join(k.projectFolderFromScript, path.sep, k.folders.publicAssetsFolderName, path.sep, k.folders.imagesAssetsFolderName, path.sep))
// to make it work (be exposed) when deployed in a container (Docker, etc) we need to listen not only to localhost but for example to all interfaces ...
if (!process.env.HTTP_ADDRESS) {
  k.address = isContainer() ? '0.0.0.0' : '127.0.0.1'
}
k.baseNamespace = `com.github.smartiniOnGitHub.${k.packageName}-v${k.packageVersion}`
k.serverUrl = `${k.protocol}://${k.address}:${k.port}`
k.source = k.serverUrl
k.queueName = `${k.packageName}-${k.packageVersion}`
k.message = `Hello World, from a Fastify web application just started at '${k.hostname}' and available at '${k.serverUrl}'!`

module.exports = k
