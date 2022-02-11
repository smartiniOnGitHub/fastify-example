# Change Log

## [3.0.0](https://github.com/smartiniOnGitHub/fastify-example/releases/tag/3.0.0) (unreleased)
Summary Changelog:
- General: update requirements to latest Fastify 3.x release ('^3.0.0' or later) 
  and related plugins
- General: update all dependencies
- General: automated/manual builds at Docker Hub now are no more available, 
  so removed references to it; sorry to have there only outdated images
  (up to 2021-04 approx., later I'll remove even them); 
  I'll setup automated builds at GitHub and publish new images only there

## [2.8.0](https://github.com/smartiniOnGitHub/fastify-example/releases/tag/2.8.0) (2022-02-11)
Summary Changelog:
- General: update all dependencies
- General: update requirements to Node.js 12 LTS (12.13.0) 
  because Node.js 10 now is in End-of-Life (EoL); 
  then use ES2019/ES10 and some stuff even from ES2020/ES11 
  (but not yet as syntax)
- General: start to use some modern JavaScript features like async/await
- Feature: split server (the general part) from the web application part 
  (specific of this app), to better reuse it inside tests, etc

## [2.7.0](https://github.com/smartiniOnGitHub/fastify-example/releases/tag/2.7.0) (2021-04-19)
Summary Changelog:
- General: update all dependencies
- General: update my plugins to latest version
- Feature: add sample route to show some Application info at '/info/app'
- Feature: add sample route to show some Source Control Management system info 
  (if any) at '/info/scm'
- Feature: add sample route to show some Operating System info at '/info/os'
- Feature: add sample route to group All info exposed by 3 previous routes at '/info/all', 
  but in a little different way
- Use the new release of 'fastify-cloudevents' aligned with v1.0.1 of the spec
- Small other improvements

## [2.6.1](https://github.com/smartiniOnGitHub/fastify-example/releases/tag/2.6.1) (2020-12-26)
Summary Changelog:
- General: update all dependencies
- General: update requirements to latest Fastify 2.x release ('^2.15.3' or later)
- Feature: add sample Dockerfile to use distroless images, 
  but had to remove HEALTHCHECK directive inside the Dockerfile 
  (container orchestrators do health checks without a specific script/executable inside images)
- Feature: add some useful npm custom command in 'package.json' 

## [2.6.0](https://github.com/smartiniOnGitHub/fastify-example/releases/tag/2.6.0) (2020-10-02)
Summary Changelog:
- General: update all dependencies
- General: update requirements to latest Fastify release ('^2.15.0' or later)
- Feature: some css visual improvements
- Use the new release of 'fastify-cloudevents' aligned with v1.0 of the spec, 
  but no need to update code to use this new version
- Small other improvements

## [2.5.0](https://github.com/smartiniOnGitHub/fastify-example/releases/tag/2.5.0) (2020-05-29)
Summary Changelog:
- General: update all dependencies
- General: update requirements to latest Fastify release ('^2.14.1' or later)
- General: add plugins 'fastify-formbody', 'fastify-jwt' to manage in a simple way 
  form url-encoded data and JWT tokens, for future use
- General: update my plugin 'fastify-healthcheck' to latest version, 
  and configure it to show even process uptime (as a sample, not really critical here)
- Feature: update Dockerfile of both images 
  to use latest Node.js LTS version (which in general is better), 
  so at the moment is 12.x
- Feature: log a warning if current Node.js release is lower than the expected one 
  (for example that written in 'package.json'), with related feature flag to disable that check
- Feature: many visual improvements in css styles (for a more modern layout, look and colors); 
  and update template pages/fragments and even static page (as a sample)
- Feature: add link to project source code at GitHub
- Feature: add link (disabled for now) to a Login page (not present at the moment)
- Fix: keep EJS templates to use latest 2.x release (so '^2.7.4' at the moment), 
  because 3.x does not seem compatible
- Improvement: update/cleanup some old code and some old styles
- Security: let npm and snyk update dependencies, depending on auditing problems; 
  this is visible for example in security auditing on generated Docker image 
  (based on normal Node.js image)
- Doc: added a lot of comments, suggestions, etc in TODO: 
  some implemented, some not, some for the future, some never
- etc


## [2.4.0](https://github.com/smartiniOnGitHub/fastify-example/releases/tag/2.4.0) (2019-11-08)
Summary Changelog:
- Update all dependencies
- Update requirements to latest Fastify release ('^2.10.0' or later)
- Features: update to latest version of my plugin 'fastify-cloudevents' 
  aligned with v0.3 of the spec
- Features: update Dockerfile of both images 
  so that installed packages will be updated, to reduce risk of vulnerabilities
- Fix: update EJS templates to use its newer runtime inclusion, 
  available since '^2.7.1'
- Use Node.js assertions but in strict mode now
- etc

## [2.3.0](https://github.com/smartiniOnGitHub/fastify-example/releases/tag/2.3.0) (2019-06-17)
Summary Changelog:
- Update all dependencies
- Update requirements to latest Fastify release ('^2.4.1' or later)
- Features: add my plugin 'fastify-check-runtime-env' 
  for checking some environmental properties at runtime 
  (like Node.js version, and if not satisfied throw an exception), 
  and add a feature flag to disable it
- Features: add documentation for how to use published Docker images, 
  and a reference to publish and tag them
- Features: cleanup unnecessary badges in the README, 
  and add a badge for for Docker images download
- Features: remove dependency from 'semver', not really used directly
- Publish (automatically) Docker images at DockerHub, for:
  'latest', 'latest-alpine', and source code tags 
  (like '2.3.0' and '2.3.0-alpine')
- etc

## [2.2.0](https://github.com/smartiniOnGitHub/fastify-example/releases/tag/2.2.0) (2019-05-27)
Summary Changelog:
- Update all dependencies
- Content (Home Page): split content and routes in: 
  samples, and routes provided by plugins
- Content (page structure): update header and footer with better/more colors, 
  and better info; improve navigation bar
- Features: add a feature flag, so that at server startup some environment info 
  (like Node.js version, OS name/type, OS release, OS platform, etc) 
  will be written into log
- Features: add a feature flag to disable CloudEvents log to console
- Features: add a feature flag to disable CloudEvents log to file, 
  a structured log file ('fastify-example.json.log') in the 'logs' folder, 
  with 1 CloudEvent serialized per line
- Remove some Fastify plugins not really used at the moment, 
  but keep 'fastify-static'
- Remove dependency on ESDoc and related plugins, not really used here
- Update requirements to Node.js 10.x LTS ('>=10.13.0'), 
  even if not strictly needed; but note that if run with a previous version 
  (like Node.js 8.16.0) no error is thrown (it will be enforced later 
  with a dedicated plugin)
- Update Tap (Node-Tap) to latest (14.x); 
  force the flag '--no-esm', and re-add the flag '--strict'
- Update requirements to Fastify ('^2.3.0'), even if not strictly needed
- Publish (manually) Docker images at DockerHub, for:
  'latest', 'latest-alpine', and source code tags 
  (like '2.2.0' and '2.2.0-alpine')

## [2.1.0](https://github.com/smartiniOnGitHub/fastify-example/releases/tag/2.1.0) (2019-05-05)
Summary Changelog:
- Update all dependencies
- Update Node.js to latest 10.x, but for now only in Docker images
- Update docs
- Update Home Page to add links to published routes and some description
- Update/cleanup to latest standards css styles, 
  to target only 1 last version of most common browsers
- Use the new release of 'fastify-cloudevents' aligned with v0.2 of the spec, 
  and update code to align with its breaking changes
- Small other improvements

## [2.0.0](https://github.com/smartiniOnGitHub/fastify-example/releases/tag/2.0.0) (2019-04-10)
[Full Changelog](https://github.com/smartiniOnGitHub/fastify-example/compare/1.0.0...2.0.0)
Summary Changelog:
- Update requirements to Fastify v2, and related plugins
- Update all dependencies
- Same features as '1.0.0'

## [1.0.0](https://github.com/smartiniOnGitHub/fastify-example/releases/tag/1.0.0) (2019-04-05)
Summary Changelog:
- Same as '0.16.0'

## [0.16.0](https://github.com/smartiniOnGitHub/fastify-example/releases/tag/0.16.0) (2019-04-05)
Summary Changelog:
- Updated all dependencies to latest release
- Update all plugins to latest release for Fastify 1.x

## [0.15.0](https://github.com/smartiniOnGitHub/fastify-example/releases/tag/0.15.0) (2019-03-24)
- Updated all dependencies to latest release
- Update all plugins to latest release for Fastify 1.x
- Ensure that all works as before with 'fastify-cloudevents' new release '0.4.0'
- Improve normal Dockerfile with some best practices for production environments
- Add a Dockerfile using Alpine Linux (smaller) and ensure all works even there

## [0.14.0](https://github.com/smartiniOnGitHub/fastify-example/releases/tag/0.14.0) (2019-03-05)
- Updated all dependencies to latest release
- Update all plugins to latest release for Fastify 1.x
- Ensure that all works as before with 'fastify-cloudevents' new release '0.3.0'
- Fix the warning for exposing template routes async, by exposing as normal (non async) functions

## [0.13.0](https://github.com/smartiniOnGitHub/fastify-example/releases/tag/0.13.0) (2019-01-12)
- Updated all dependencies to latest release
- Simplify and generalize paths, and improve templates
- Add feature flags to disable some functionalities (like those exposed but some plugins); 
  used a disabling logic, so by default related features are enabled
- Move webapp features in its own source, and load it by passing as arguments 
  the fastify instance, and maybe an options object
- Keep dependency on 'dotenv' instead of using its wrapper 'fastify-env' which works 
  in a way different of my setup here: 
  all variables to read must be declared in the schema (which is good), 
  env variables are populated in async, etc; so I prefer to stay with normal 'dotenv' usage
- Send CloudEvent instances (serialized) into the NATS queue

## [0.12.0](https://github.com/smartiniOnGitHub/fastify-example/releases/tag/0.12.0) (2019-01-04)
- Updated all plugins to latest release
- Handle webhook secret key via environmental variable (if given)
- As a sample, call the webhook with something like: `curl http://127.0.0.1:8000/custom-webhook -X POST -H 'Content-Type: application/json' -d '{"payload":"test", "secretKey":"my example Secret Key"}'`
  end try different combinations, even when secret key is not set or the given one (in this call) is wrong
- Add some custom npm command to perform a license check; 
  done, but note that some dependencies currently uses non compatible licenses, 
  and this need to be fixed soon
- Add custom command to generate documentation of sources via ESDoc and related plugins

## [0.11.1](https://github.com/smartiniOnGitHub/fastify-example/releases/tag/0.11.1) (2018-12-25)
- Updated all plugins to latest release
- Ensure that generated CloudEvent instances now contain client IP address in a custom attribute 
  (inside the usual data attribute), could be really useful; this is a feature is latest release 
  of my plugin 'fastify-cloudevents'

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
- Update sample usage of 'fastify-webhook' with some custom options: now try to call it for example with (from Windows): `curl http://127.0.0.1:8000/custom-webhook -X POST -H "Content-Type: application/json" -d "{\"payload\":\"test\"}"`, otherwise remove the escape of double quote chars and keep the rest, so use: `curl http://127.0.0.1:8000/custom-webhook -X POST -H "Content-Type: application/json" -d '{"payload":"test"}'`

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
