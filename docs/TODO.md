# fastify-example - TODO

## TODO

* [x] general: send some CloudEvent events (serialized) the the NATS queue ... wip
* [x] general: tag sources as '0.13.0' ...

* [x] content: start to use [marko](https://markojs.com/), but in a branch (to merge later info master, and before it, create a maintanance branch for ejs) ... wip
* [x] general: tag sources as '0.14.0' ...

* [ ] general: check if use [fastify-sensible - Fastify](https://github.com/fastify/fastify-sensible), to add some standard and useful defaults ...

* [ ] general: update folders for pages (public, templates, etc) to move all under a 'web' or 'pages' folder (but with 'git mv' to not losing files history) ... wip

* [ ] general: implement some automation tool, using [Gulp](https://gulpjs.com/) or [WebPack](https://webpack.js.org/) ...
* [ ] general: rewrite all using latest [TypeScript](https://www.typescriptlang.org/), but in a branch (and merge later into master) ...

* [ ] content: add something protected by authentication; maybe here start with something really simple, with some fixed user/group/role, but defined via env ('fastify-env'), not hardcoded in code ...
* [ ] content: add other routes, but in a dedicated source (or folder) ...
* [ ] content: add error handlers ...
* [ ] content cleanup/update to latest standards my custom styles ...
* [ ] content: remove my custom styles from pages and change with some good default style, for example starting from latest [Bootstrap](https://getbootstrap.com/), then update licenses ...
* [ ] content: implement a full-stack webapp, with a modern front-end (Angular or React or Vue.js or other) ...


---------------


## DONE

* [x] general: create/update initial skeleton (from an existing example) and tag it in git ... ok
* [x] general: update dependencies/devDependencies etc in 'package.json', references to my remote repository, etc ... ok
* [x] general: update the sample code with my standards (formatting, port 8000 for the dev server, etc) ... ok
* [x] general: add License header in all source files ... ok
* [x] general: update to Fastify 1.0.0 (just released), and related plugins, to ensure all work ... ok, done and tested
* [x] general: update README to add reference to Dockerfile-usage ... ok
* [x] general: add a precommit hook that trigger tests before a git commit ... maybe later

* [x] content: add some simplified sources and resources (templates, pages, etc), to use as a base (and example) for others ... ok
* [x] content: add 'nodemon' in devDependencies to be able to reload all content (even sources) in DEV environment ... ok
* [x] content: printing routes at server startup, but only for non production environments ... ok

* [x] example: use fastify options to change log level, etc ... ok
* [x] example: use the 'fastify-favicon' plugin, to test it ... done (in page, still not in tests), but when calling [favicon.ico - localhost 8000](http://localhost:8000/favicon.ico) still it doesn't return the requested resource (should be published by the plugin)... ok, needed to update to a newer release of the plugin ('0.1.1')
* [x] example: tag initial release (but without changing release number in 'package.json') ... ok
* [x] example: use the 'fastify-webhook' plugin, to test it ... but for now don't add specific unit tests here ... ok
* [x] example: test 'fastify-webhook' plugin, even from a CLI tool like curl, for example run the server with: `npm start` and check with a Browser that the [Home page](http://localhost:8000) is reachable; then in another terminal do: `curl http://127.0.0.1:8000/webhook -X POST -H "Content-Type: application/json" -d '{"payload":"test"}'` => returning a JSON response (maybe in this case a dump of the given data), and no error thrown ... yes but maybe it would be better to have another example server script ... done, but note that on Windows I need to do the curl call in this way (in the json data using a double quote but escaping it in json fields), so: `curl http://127.0.0.1:8000/webhook -X POST -H "Content-Type: application/json" -d "{\"payload\":\"test\"}"`; check if I could move that data in a file (for example 'body.json') and point to it with: `curl http://127.0.0.1:8000/webhook -X POST -H "Content-Type: application/json" -d @body.json` not only for Windows; expected response: `{"statusCode":200,"result":"success"}` ... ok
* [x] example: update usage of 'fastify-webhook' plugin, to better test it, but keep previous code commented (for a minimal sample usage) ... ok, so now try to call it for example with (from Windows): `curl http://127.0.0.1:8000/custom-webhook -X POST -H "Content-Type: application/json" -d "{\"payload\":\"test\"}"`, otherwise remove the escape of double quote chars and keep the rest for Linux/Mac: `curl http://127.0.0.1:8000/custom-webhook -X POST -H "Content-Type: application/json" -d '{"payload":"test"}'`

* [x] general: update to latest (post-1.0.x) stable Fastify ... ok, so for now use '^1.2.1'

* [x] general: update npm custom commands to run unit tests to not call 'standard' directly, but to call its custom task 'lint' defined in this project ... ok, done; note that calling only 'standard' (but always better to call the local installation of it) without arguments let it scan all folders in the project, so in this case passing the list of folders/subfolders to scan should be better/faster
* [x] general: like in Fastify (and its core plugins), check if remove the dev dependency on 'request', and instead use 'simple-get' ... changed, now update all tests ... ok, done; but improve later all tests here
- general: add a dependency on [is-docker](https://www.npmjs.com/package/is-docker), to change (in the server script) the listening address to '0.0.0.0' when in Docker, as in [fastify-cli - Fastify](https://github.com/fastify/fastify-cli); anyway the change to replicate in this project is shown [here](https://github.com/fastify/fastify-cli/commit/0d581c474bd6c7ade5c292decf5fe1062c1e5e03) ... added in dependencies, but need to use it now ... ok, done
* [x] general: check if use [fast-json-stringify - Fastify](https://github.com/fastify/fast-json-stringify) to generate (and maybe even validate) output in JSON; should be faster that 'JSON.stringify' ... try to use it in some function in the 'utils.js' module ... added in dependencies ... ok, but use later in utils
* [x] general: like in Fastify (and its core plugins), check if remove the dev dependency on 'request', and instead use 'simple-get' ... changed, now update all tests ... ok, done; but improve later all tests here
* [x] general: check if empty peerDependencies and move them under devDependencies in 'package.json'; for more info see even [peer-dependencies - node.js](https://nodejs.org/en/blog/npm/peer-dependencies/) ... try removing 'request' from dev dependencies and (like other Fastify core plugin) use 'simple-get'; but first try emptying peerDependencies, from: '''
"ajv": "^5.0.0",
"eslint-plugin-import": "^2.8.0",
"eslint-plugin-promise": "^3.6.0",
"eslint-plugin-react": "^7.6.1"
 ''' ... ok, and all tests seems to run well
* [x] general: in the example, use latest version of my 'fastify-favicon' plugin ('0.2.1'), to test it ... ok
* [x] general: after latest updates (as of today, 2018-04-13), check why the response for any page is very very slow, urgent ... note that even after a manual cleanup of 'node_modules' folder and redo an 'npm install' nothing changed; but it I open Browser Developer Console all seems to be good (both in latest Firefox and Chrome); check with Fastify guys, urgent ... not sure it's a bug, so for now I just opened an help request [here](https://github.com/fastify/help/issues/9) ... now check as suggested, and then maybe debug 'fastify-static' ... no wait, probably the issue is this: [issue#50 - fastify-static](https://github.com/fastify/fastify-static/issues/50) and maybe even [issue#23 - node-fastify-auto-push](https://github.com/google/node-fastify-auto-push/issues/23) even if not strictly related to my usage; so wait for the fix and a new release of 'fastify-static' to test ... ok, with '0.10.1' the problem is resolved
* [x] general: update to latest Fastify 1.3.0 (just released) and related plugins, to ensure all work ... ok, done and tested
* [x] general: update to latest Fastify 1.4.0 (just released) and related plugins, to ensure all work; then update CHANGELOG, commit and tag ... ok
* [x general: start to move to ES Modules, enabled since Node.js 10 as seen [here](https://levelup.gitconnected.com/whats-new-in-node-10-ad360ae55ee4); look [here](https://medium.com/@giltayar/native-es-modules-in-nodejs-status-and-future-directions-part-i-ee5ea3001f71) for an overview ... do only some trivial changes accordingly to [package.json - npmjs](https://docs.npmjs.com/files/package.json) ... maybe later do more
* [x] general: update npm custom commands to use local installed tools via [npx](https://www.npmjs.com/package/npx) ... note that should already be installed with latest npx, but if not (sometimes in Windows) install with `npm install -g npx`, then check with `npx --version` ... no, because as seen [here](https://michael-kuehnel.de/tooling/2018/03/22/helpers-and-tips-for-npm-run-scripts.html), npx can't run npm custom commands but instead is made for run local tools; anyway, simplify 'package.json' to remove './node_modules/.bin/' from any custom command, and (recommended) remove those (and in general any if possible) global npm packages
* [x] general: update the example (and first the test) to show a sample with custom options, and let it work with a sample 'favicon.ico' (16x16) generated with GIMP ... note that it seems that there is a problem in 'fastify-favicon' with custom path (both absolute and relative to server script); check from the 'temp' folder with `wget http://localhost:8000/favicon.ico --no-cache` (or similar with 'curl') and then open generated file to ensure it's the custom favicon; then update changelog, release number, etc ...  ok, but no issue raised because it was due to a wrong path given; so updated readme and the example
* [x] general: update all core dependencies on Fastify and related plugins ... ok
* [x] general: run all even with Node.js 10.x.x, to check if everything works (as should) ... ok, all works even with Node.js 10.1.0
* [x] example: update 'fastify-webhook' to latest version ... ok

* [x] general: check licenses of dependencies, for example with [legally - npm](https://www.npmjs.com/package/legally) or with [license-checker - npm](https://www.npmjs.com/package/license-checker); then repeat after some time ... ok, used 'legally' but run via npx, all seems to be good
* [x] general: update to latest Fastify (1.7.0), and update diagnostic code on the listening address and port using the new syntax ... ok
* [x] general: change all references to js sources by removing its '.js' explicit extension, to be more future proof for using Node.js modules ('.mjs') since Node.js 10 ... ok, done in 'package.json' commands and even when using 'handlers' from 'fastify-webhook' for example

* [x] general: update sample docker-related files with some best practices, as seen [here](https://nodesource.com/blog/containerizing-node-js-applications-with-docker/) ... maybe later
* [x] general: add some example route to use the async/await syntax, as seen in [Fastify goes LTS with 1.0.0 - Medium](https://medium.com/@fastifyjs/fastify-goes-lts-with-1-0-0-911112c64752) ... maybe later

* [x] example: use the 'fastify-cloudevents' plugin, to test it (configure it for a common usage scenario, and add a /time route) ... but for now don't add specific unit tests here ... ok, even if 'loggingCallback' does some noise (additional output for the dump of related Cloudevents) in the console

* [x] general: change template engine from 'ejs' to [Nunjucks](https://mozilla.github.io/nunjucks/) or [Marko](https://markojs.com), but in a branch (and merge later into master) ... maybe later, or in another repository
* [x] example: update 'point-of-view' to latest version (when published) ... ok
* [x] general: update all core dependencies on Fastify and related plugins ... ok, and often repeat this task
* [x] example: add some minimal unit test to ensure published routes are available (at least that for the home page), using  'simple-get' (already available in devDependencies); and that some are no more available (default webhook url for example, but that the new one it is) ... maybe later
* [x] general: in the branch 'add-fastify-nats', use my fork of 'fastify-nats', with its temporary name 'fastify-nats-client' and ensure all is good; but do not merge those changes into master ... ok
* [x] general: update dependencies to latest Fastify 1.x (1.13.1) and all plugins ... ok
* [x] general: in the branch 'add-fastify-nats', revert the use of 'fastify-nats-client' and use the new version of 'fastify-nats' (one time it has been published) and ensure all is good; then merge those changes into master (via Pull Request) ... maybe later (see next comment)
* [x] example: in the branch 'add-fastify-nats' branch, use the 'fastify-nats' pligin to send/receive messages with a publiuc NATS server; but instead (at least for now) use my fork of that plugin, 'fastify-nats-client' that has some more features and more updates ... ok, but do not merge this branch because in some cases the external NATS server could not be reachable (for example by corporate firewall rules), instead keep it not merged and see later if/what to do
* [x] general: add badges at the top of README ... ok
* [x] general: update 'fastify-cloudevents' to latest release ('0.2.0' or later), and update server script (some TODO in sources are for this) ... ok
* [x] general: update dependencies etc ... ok
* [x] general: add 'dotenv' in dependencies, to be able to define some environment-dependent variables in a '.env' file (excluded by source control) and have all them populated as environment variables ... ok, but use later if/when needed
* [x] example: in the branch 'add-fastify-nats' branch, use the 'fastify-nats' pligin to send/receive messages with a publiuc NATS server; but instead (at least for now) use my fork of that plugin, 'fastify-nats-client' that has some more features and more updates ... ok, but do not merge this branch because in some cases the external NATS server could not be reachable (for example by corporate firewall rules), instead keep it not merged and see later if/what to do
* [x] general: rebase the branch 'add-fastify-nats' on top of updated master ... ok, but instead of rebase I used a Pull Request (PR) and GitHub Review and Web UI to fix conflicts
* [x] general: to handle command-line options, use [yargs-parser](https://www.npmjs.com/package/yargs-parser) (already used in other Fastify-related projects) ... maybe later
* [x] general: to improve the NATS queue feature (usage), add a command-line flag to disable the publish/subscribe of messages to the public NATS server (and add an npm custom command with that flag) ... no, use an environment variable instead (see related note)
* [x] general: to improve the NATS queue feature (usage), configure the NATS server URL with the environmental variable NATS_SERVER_URL (for example using .env file), and use NATS_SERVER_DISABLE to disable it (and related features), instead of using command-line arguments/flags ... ok
* [x] general: in the '.env' (local, not in source control, as per best practices), comment the line with `NATS_SERVER_DISABLE=true`, and ensure all works as before ... ok
* [x] general: fix TODO in the `route` source, to be able to use publish/subscribe functions ... ok
* [x] general: to improve the NATS queue feature (usage), add even a counter for messages sent and received ... maybe later (not really needed now)
* [x] general: tag sources as '0.11.0' ... ok
* [x] general: tag sources as '0.11.1' with latest changes (see CHANGELOG and README)... ok
* [x] general: like in Fastify, add a custom npm command to perform a license check (but for production dependencies only) using 'license-checker', with only some acceptable licenses ('Apache-2.0;BSD-2-Clause;BSD-3-Clause;MIT;ISC'); some more info on Apache compatible/incompatible licenses [here](https://www.apache.org/legal/resolved.html#what-can-we-not-include-in-an-asf-project-category-x) ... done, but check what to do for a package that has a license (incompatible) 'Artistic-2.0'; note that even some npm related packages use that license, so a good compromise (for now) is to add it in acceptable licenses (even in the Apache compatibility page is not explicitly forbidden so should be good the same) ... note that this npm custom command still raise errors because other dependencies are found, fix later by removing my dependencies (using them) ... maybe later
* [x] general: on license-checker, for private npm packages still is seems that an 'UNLICENSED' license is assigned (without reading related license) ... ok, could be a bug in the library
* [x] general: get webhook secretKey from an environment variable (so could be defined like others enev in the '.env' file) or null, then test all cases (not present, present but wrong, present and good) ... ok
* [x] general: add a dev dependency on [ESDoc](https://www.npmjs.com/package/esdoc) and related plugins for esnext, etc, and the add an npm custom command to generate doc (in the usual output folder 'out' already excluded by '.gitignore'); and provide a configuration file for it (.esdoc.json') as seen in their docs ... ok
* [x] general: use ESDoc to generate the right documentation, at least for public functions (from folders './src/', and maybe even for './example/', './test/'), and add an npm custom task to generate/update it, but in this case in the './out/' folder (already excluded from commits, via '.gitignore') instead of the usual './docs/' ... ok, all done in the '.esdoc.json' configuration file
* [x] general: tag sources as '0.12.0' ... ok


---------------
