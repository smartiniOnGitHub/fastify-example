# fastify-example - TODO

## TODO

* [x] general: bump release to '2.0.0' ... but only when my plugin 'fastify-cloudevents' will be compatible to Fastify v2 ... ok, all updated now (mine and all others)
* [x] general: unsure all works with latest Node.js 8.x ... then ensure that publishing to NATS queues works good (on-line and even in the Docker version) ... ok
* [x] general: update to Fastify v2, but in a branch (at the beginning, until it works); then merge with a PR (but merge with squash) ... ok
* [x] general: update my code to use new/updated features of my plugins, and fix all breaking changes ... ok
* [x] general: use new features exposed by 'cloudevent' (wrapped by 'fastify-cloudevents') to build CloudEvent instances from Error, etc ... ok
* [x] general: check if use [fastify-sensible - Fastify](https://github.com/fastify/fastify-sensible), to add some standard and useful defaults ... maybe later
* [x] general: add here the same additional lint command (via TypeScript and related plugins, and maybe even with TSLint) ... no, not really needed here because all code is JavaScript, but maybe later
* [x] general: update readme ... ok
* [x] general: update changelog ... wip
* [x] general: tag sources ... wip
* [x] general: after the '2.0.0' release, create a maintenance branch '2.0.x' ... wip

* [x] general: bump release to '2.1.0' ... wip
* [x] general: remove dependencies (and dev dependencies) not really used here ... wip
* [x] general: check if remove some Fastify plugins not really used at the moment, but keep 'fastify-static' (even if for a real deployment probably static assets will be delivered via NGINX or another Web Server)... wip
* [x] general: add a feature flag to disable Fastify logging ... wip
* [x] general: add a feature flag to change the callback for CloudEvents, to save them in a file (like a '.log.json' file, is possible with log files rotation) ... wip
* [x] general: update all requirements to Node.js 10.x (more modern, even if not strictly required here, but just to start using it), even in Docker images ... wip
* [x] content cleanup/update to latest standards my custom styles ... wip
* [x] general: tag sources, at least going to '2.1.0' ... wip

* [x] general: bump release to '2.2.0' ... wip
* [x] content: check if provide a route to serve SPA (all client-side UI) via [Preact - npmjs](https://www.npmjs.com/package/preact) (like React but without transpillation of code and Babel usage, so simpler), doing something like described in the article [Fastify and Preact for quick web app prototyping - Loige](https://loige.co/fastify-and-preact-for-quick-web-app-prototyping/); at least as a Single-Page-Application (SPA) in a dedicated route ... wip
* [x] content: check if provide an SPA (maybe a new one) even as a Progressive Web-App (PWA), for example as seen [here](https://blog.heroku.com/how-to-make-progressive-web-app) ... wip
* [x] general: tag sources, at least going to '2.2.0' ... wip

* [ ] content: add something protected by authentication; maybe here start with something really simple, with some fixed user/group/role, but defined via env ('fastify-env'), not hardcoded in code ...
* [ ] content: add other routes, but in a dedicated source (or folder) ...
* [ ] content: add error handlers ...
* [ ] content cleanup/update to latest standards my custom styles ...
* [ ] content: remove my custom styles from pages and change with some good default style, for example starting from latest [Bootstrap](https://getbootstrap.com/), then update licenses ...
* [ ] content: start to use [marko](https://markojs.com/), but in a branch (to merge later info master, and before it, create a maintanance branch for ejs) ...
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
* [x] general: simplify and generalize paths, and improve templates (and use common variables to merge with specific variables when using templates); move folders names into constants (maybe in a Map); then ensure all works as before ... ok
* [x] general: enable functions using feature flags (set in the environment) ... for NATS queue keep the (already existing) NATS_SERVER_DISABLE env var; for others check if/when to use a disable flag or an enable one ... ok, but used a disable logic, so by default any feature is enabled
* [x] general: move in a new source ('features.js') all code blocks that load?register/configure/etc application features; note that related source must accept arguments, so it has to be exposed as a function (or as a class) ... ok, implemented/exposed as a function (at least for now)
* [x] general: remove dependency on 'dotenv' and use its wrapper 'fastify-env' instead ... no, I tried but the plugin works in a way different that my setup here: all variables to read must be declared in the schema (which is good), are populated in async, etc; so I prefer ro revert to normal 'dotenv' usage
* [x] general: move listen port in the constants source (like others) ... ok, and removed from fastifyOptions because it was there only to be used manually
* [x] general: handle Fastify main options (for example the logger level, etc) via an environment variable (like for many other options); check if even the whole js object would be accepted in an env var (and by default use current value I used); then update README ... ok, and of course I had to write it as a JSON string, so: '{ "logger": { "level": "info" } }'; chose to used this as a default instead of an empty object ('{ }')
* [x] general: change all callbacks to follow best practices, so: ensure that a callbacks is callable (if it's a function), always pass error parameter first with something like 'function callback (err, data) { }', inside a callback always check for its error parameter (if not null), etc ... so here fix callbacks for cloudevents and callbacks for nats (check if related plugins must be updated before) ... note that for nats callbacks (cb) it seems no possible due to the underlying implementation ... maybe later, after 'fastify-cloudevents' release '0.3.0' or later (if callbacks will be changed with that format)
* [x] general: send some CloudEvent events (serialized) the the NATS queue ... done, now test all with nats feature enabled (then re-disable it) ... ok
* [x] general: as usual, update all dependencies to latest release ... ok
* [x] general: tag sources as '0.13.0' ... ok
* [x] general: check if use [require-all](https://www.npmjs.com/package/require-all) to load many/all source ('.js' and maybe even all '.json') files from a given folder, but filtered ... maybe later
* [x] general: check if use [fastify-acl-auth](https://www.npmjs.com/package/fastify-acl-auth) for a generic authentication and authorization flow for routes here ... maybe later
* [x] content: check if use [fastify-nextjs](https://www.npmjs.com/package/fastify-nextjs) to have a pre-configured (and simplified, ready to use) environment with React pages rendered at Server-Side, using [next](https://www.npmjs.com/package/next); but note that next has many dependencies; check if it could render pages even at client side; note that next can render even to static pages (to have a fully static web site); anyway try in a branch ... maybe later
* [x] content: check if add in 'package.json' a proxy statement like `"proxy": "http://localhost:8000/"`, as seen in [Proxying API Requests in Development - Create React App](https://facebook.github.io/create-react-app/docs/proxying-api-requests-in-development), [How to get create-react-app to work with a Node.js back-end API - freeCodeCamp](https://medium.freecodecamp.org/how-to-make-create-react-app-work-with-a-node-backend-api-7c5c48acb1b0), [Setting up a proxy server in create-react-app - vschool](https://coursework.vschool.io/setting-up-a-full-stack-react-application/), etc ... maybe later, because at the moment here I don't use React for the client part so I don't have a subproject in a folder '/client/' (and related 'package.json' where to put that setting); check if it would be useful the same with a different framework for client side, like Angular
* [x] general: add npm custom command to run unit tests with nodejs debugger breaks enabled (inspector) and no parallel and no timeout, useful for example in Visual Studio Code; some info [here](https://github.com/fastify/fastify/blob/master/docs/Testing.md), [here](https://nodejs.org/en/docs/guides/debugging-getting-started/), [here](https://code.visualstudio.com/blogs/2018/07/12/introducing-logpoints-and-auto-attach) ... ok, added a debugger attach configuration (in '.vscode/launch.json'), and an npm custom command 'test:unit:debug' to run Tap unit tests with Node.js inspector enabled (and without timeout)
* [x] general: implement some automation tool, using [Gulp](https://gulpjs.com/) or [WebPack](https://webpack.js.org/) ... maybe later, but with [WebPack](https://webpack.js.org)
* [x] general: rewrite all using latest [TypeScript](https://www.typescriptlang.org/), but in a branch (and merge later into master) ... maybe later, or (even better) in a similar project 'fastify-example-ts'
* [x] general: update folders for pages (public, templates, etc) to move all under a 'web' or 'pages' folder (but with 'git mv' to not losing files history) ... maybe later
* [x] general: check if introduct the [TypeScript]() compile, maybe only to let it check JavaScript code, as seen [here](https://slack.engineering/typescript-at-slack-a81307fa288d) and [here](https://blog.bitsrc.io/why-and-how-use-typescript-in-your-react-app-60e8987be8de) ... maybe later, but do changes in a branch
* [x] general: in 'features.js' source, check if add an internal function that uses `const NODE_ENV = process.env` to give only env var name (as a string), to hide that's reading from the env ... ok, but added in utilities functions, in 'utils.js'
* [x] general: refactor main server source as described in [Testing - fastify](https://github.com/fastify/fastify/blob/master/docs/Testing.md), for simpler testing and have Fastify instance exposed by a specific source (maybe a new here here) ... maybe later
* [x] general: as a sample, under the folder './docs/', add a copy of Visul Studio Code launch configurations (copied from project root '.vscode/launch.json') because usually the folder '.vscode/' is excluded by git (by adding it in '.gitignore') ... ok
* [x] general: as a sample, under the folder './docs/', add a copy of a sample local environment variables configurations (copied from project root '.env' but renamed into '_env') because usually that file (and related variants) is excluded by git (by adding it in '.gitignore') ... ok
* [x] general: enable strict mode in all created CloudEvent instances if environment is not production ... better, use a feature flag like others (so something like 'FEATURE_CLOUDEVENTS_STRICT_DISABLE') and get it from env vars (so disable/enable it in any specific environment); then update related info in the README ... ok
* [x] general: check how to pass to the Docker container all environment variables used here (called 'feature flags', and maybe even others); see [Builder - Docker Docs](https://docs.docker.com/engine/reference/builder/#arg); and the same for env vars; note that ARG variables (set via the '--build-arg' flag to 'docker build' command) are not persisted into the built image, but ENV variables (set via the '--env' flag in 'docker run/exec' commands) yes; and ENV variables have priority over ARG variables, so a good trick is to set ARG and then ENV to refer to it but with a default value; maybe then check if use even for specify a user for running the node process in the container, andthe production mode (or not) for npm install, etc ... ok, but maybe later
* [x] general: improve Docker image generated here using some tricks seen [here](https://blog.bitsrc.io/manage-your-node-app-using-docker-like-a-pro-6266f6516cf), like multi-stage image, etc ... maybe later, not really needed here at the moment (no package generation via WebPack or other similar)
* [x] general: improve the flow and data transformation paths using CQRS and Event Sourcing (ES), for example as seen [here](https://blog.bitsrc.io/building-a-cqrs-es-app-with-resolve-41f839362ffd) ... maybe later, not really needed here now
* [x] general: check if the warning "Promise may not be fulfilled with 'undefined' when statusCode is not 204" (since Fastify 1.13.4) is related to the 'ejs' templating engine ... ok, it was related to exposing routes as an async function, and even the '/template' route was defined with an async function but without return value, so for now I fixed all by moving back to normal (non-async) functions; let's improve later
* [x] general: update all dependencies, mainly to latest 'fastify-cloudevents' release '0.3.0' or later ... ok, all works good as before
* [x] general: change all callbacks to the (standard) arguments format like 'function callback (err, data) { }', could call the callback with (err, null) or with (null, data) ... no, it doesn't worth the effort because at the moment I'm not using so much async functions here, and normal callbacks are good enough at the moment
* [x] general: update info in the README and CHANGELOG ... ok
* [x] general: tag sources as '0.14.0' ... ok
* [x] content: check if/how to use [lit-html](https://lit-html.polymer-project.org/guide) and [lit-element](https://lit-element.polymer-project.org/guide) as templating/view engine; but note that at the moment there is not plugin (nor support in 'point-of-view') ... no, it's too early now and related Server-Side Rendering (SSR) is provided only by a third party library (otherwise those modules works only at client side); but maybe later
* [x] general: update all dependencies and all my plugins to latest, for example 'fastify-cloudevents' ... ok
* [x] content: remove some inline definition/behavior and use instead those exposed by the new release of 'fastify-cloudevents' ... ok
* [x] general: bump release ... no, because here I keep the same release (at least for now on '1.0.0') and I tag sources at the end of any minimal and continuous release
* [x] general: Docker image, in the 'Dockerfile', add some LABEL statements to add more info on Node.js version, Fastify version, etc; if possible the same statement but multi-line ... maybe later
* [x] general: Docker image, in the 'Dockerfile', add an argument (ARG), and its override from environment (ENV) for specifying if install production only dependencies or not (all dependencies, even for dev) ... ok, but keep 'development' as default
* [x] general: Docker image, in the 'Dockerfile', group all ENV statements in a single one but multi-line (one key/value per line), should be possible ... maybe later
* [x] general: Docker image, in the 'Dockerfile', do some small tweaks and improvements, using official [Node.js Docker image](https://hub.docker.com/_/node/) by default based on Debian ... ok; created even a group and user to run the webapp (in a safer way, instead of the default root in Docker containers) and related file system permissions in its folders, as seen [here](https://www.digitalocean.com/community/tutorials/how-to-build-a-node-js-application-with-docker) for example
* [x] general: Docker image, check using the alpine version, so 'node:8-alpine' (much smaller, based on BusyBox, instead of the normal node image), if it's good enough for all commands used here; and maybe add another Dockerfile for the other base image (not based on alpine, so the current one), like 'Dockerfile.dev'; but check if it would be possible to run for example the npm custom task 'healthcheck-manual', otherwise keep the alpine version as a secondary Docker image ... start by creating a dedicated 'Dockerfile.alpine' for production but not referenced in npm custom commands (maybe in a command like 'docker:build:alpine') ... ok, but used the tirck to tag the image with the same name, to be able to resuse others npm custom command already defined (most)
* [x] content: expose a route that always raise an error ... ok
* [x] general: use new features exposed by 'cloudevent' (wrapped by 'fastify-cloudevents') to build CloudEvent instances from Error, etc ... maybe later, because I need related hook (since Fastify v2)
* [x] general: update changelog ... ok

* [x] general: tag sources as '0.15.0' ... ok
* [x] general: update all my other plugins to '1.0.0' (for Fastify v1) when available: 'fastify-nats-client', 'fastify-webhook', and maybe others ... ok
* [x] general: use new features of my plugins (new releases) ... ok
* [x] general: update changelog ... ok
* [x] general: tag sources as '0.16.0' and then maybe even as '1.0.0' ... ok
* [x] general: after the '1.0.0' release, create a maintenance branch '1.x' ... ok


---------------
