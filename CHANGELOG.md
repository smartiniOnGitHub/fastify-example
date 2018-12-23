# Change Log

## [0.11.0](https://github.com/smartiniOnGitHub/fastify-example/releases/tag/0.11.0) (2018-12-23)
- Updated to latest Fastify 1.13.3 (stay on 1.x for now) and all plugins to latest release
- Add the ability to load some configuration variables from environment variables, 
  and from an '.env' file if present; for example handle HTTP_PORT, HTTP_ADDRESS, etc
- Merge features from the branch 'add-fastify-nats' and add some improvement, like 
  disable the integration with a NATS Server, and publish more content to the queues
- Improve the publish/subscribe of messages with the NATS queue
- Simplify main server source by moving some code blocks in its own sources

## [0.10.0](https://github.com/smartiniOnGitHub/fastify-example/releases/tag/0.10.0) (2018-12-18)
Update Fastify dependencies to latest (1.13.2) and all plugins
- Small updates to fix some breaking changes of latest 'fastify-cloudevents' release
- Other small changes/improvements

## [0.9.0](https://github.com/smartiniOnGitHub/fastify-example/releases/tag/0.9.0) (2018-12-09)
- Updated to latest Fastify 1.13.1 (stay on 1.x for now) and all plugins to latest release
- in the branch 'add-fastify-nats' (still not merged with the 'master' branch) 
  add a sample usage of 'fastify-nats' plugin, or better my fork of that plugin, 'fastify-nats-client',
  a little more updated and with some more features; later maybe switch back to the original one.
  Note that this branch is not merged into master mainly because the NATS server used is a public one,
  so could not be reachable, for example by corporate firewall rules, etc; 
  anyway it'a available in that branch

## [0.8.0](https://github.com/smartiniOnGitHub/fastify-example/releases/tag/0.8.0) (2018-11-28)
- Updated to latest Fastify 1.13.0 (stay on 1.x for now) and all plugins to latest release
- Minor tweaks

## [0.7.0](https://github.com/smartiniOnGitHub/fastify-example/releases/tag/0.7.0) (2018-11-06)
Summary Changelog:
- Update dependencies
- Add my plugin 'fastify-cloudevents' and use it with a sample minimal configuration

## [0.6.0](https://github.com/smartiniOnGitHub/fastify-example/releases/tag/0.6.0) (2018-11-01)
Summary Changelog:
- Update Fastify to latest (1.13.0) and all dependencies
- Add my plugin 'fastify-healthcheck' and use it even in the Dockerfile

## [0.5.0](https://github.com/smartiniOnGitHub/fastify-example/releases/tag/0.5.0) (2018-10-22)
Summary Changelog:
- Update to latest Fastify (currently 1.12.1) and update all related plugins (and other dependencies), to ensure all works
- Update point-of-view to new major version 2.0.0

## [0.4.0](https://github.com/smartiniOnGitHub/fastify-example/releases/tag/0.4.0) (2018-05-19)
Summary Changelog:
- Update to latest Fastify (currently 1.4.0) and update all related plugins (and other dependencies), to ensure all works
- Simplified 'package.json'
- Update 'fastify-favicon' usage to show a sample with custom options, and update to latest release

## [0.3.0](https://github.com/smartiniOnGitHub/fastify-example/releases/tag/0.3.0) (2018-04-23)
Summary Changelog:
- Update to latest Fastify 1.x.x (currently 1.3.0) and update all related plugins, to ensure all works
- Update sample usage of 'fastify-webhook' with some custom options: now try to call it for example with (from Windows): `curl http://127.0.0.1:8000/custom-webhook -X POST -H "Content-Type: application/json" -d "{\"payload\":\"test\"}"`, otherwise remove the escape of double quote chars and keep the rest

## [0.2.5](https://github.com/smartiniOnGitHub/fastify-example/releases/tag/0.2.5) (2018-04-18)
Summary Changelog:
- Update dependencies to fix the problem in 'fastify-static' on the reload of pages with cache enabled (default behaviour in browsers)

## [0.2.4](https://github.com/smartiniOnGitHub/fastify-example/releases/tag/0.2.4) (2018-04-15)
Summary Changelog:
- Small updates like in latest Fastify: remove dependency from 'request' and use 'simple-get' instead, add 'is-docker', etc

## [0.2.3](https://github.com/smartiniOnGitHub/fastify-example/releases/tag/0.2.3) (2018-04-14)
Summary Changelog:
- Update to latest Fastify 1.x.x (currently 1.2.1) and update all related plugins, to ensure all works
- Update dependencies (and empty all 'peerDependencies')
- Update README with requirements

## [0.2.2](https://github.com/smartiniOnGitHub/fastify-example/releases/tag/0.2.2) (2018-03-29)
Summary Changelog:
- Update to latest Fastify 1.x.x (currently 1.2.0) and update all related plugins, to ensure all works
- Update dependencies (need even to add some 'peerDependencies' as needed by latest release of 'standard' and maybe even other package)
- Update README with requirements

## [0.2.1](https://github.com/smartiniOnGitHub/fastify-example/releases/tag/0.2.1) (2018-03-14)
Summary Changelog:
- Update to latest Fastify 1.x.x (currently 1.1.1) and update all related plugins, to ensure all works
- Update README with requirements

## [0.2.0](https://github.com/smartiniOnGitHub/fastify-example/releases/tag/0.2.0) (2018-03-07)
Summary Changelog:
- Update to Fastify 1.0.0 (just released) and update all related plugins, to ensure all works
- Update README to add reference to Dockerfile-usage

## [0.1.2](https://github.com/smartiniOnGitHub/fastify-example/releases/tag/0.1.0) (2018-02-22)
Summary Changelog:
- Update Fastify favicon plugin to latest release

## [0.1.0](https://github.com/smartiniOnGitHub/fastify-example/releases/tag/0.1.0) (2018-02-21)
Summary Changelog:
- First release
- Add Fastify favicon plugin, to test it

----
