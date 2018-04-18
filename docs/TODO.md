# fastify-example - TODO

## TODO

* [ ] example: update usage of 'fastify-webhook' plugin, to better test it, but keep previous code commented (for a minimal sample usage) ... wip
* [ ] example: add some minimal unit test to ensure published routes are available (at least that for the home page), using  'simple-get' (already available in devDependencies) ... wip

* [ ] general: add some example route to use the async/await syntax, as seen in [Fastify goes LTS with 1.0.0 - Medium](https://medium.com/@fastifyjs/fastify-goes-lts-with-1-0-0-911112c64752) ... wip

* [ ] general: use ESDoc to generate the right documentation, at least for public functions (from folders './src/', and maybe even for './example/', './test/'), and add an npm custom task to generate/update it, but write docs to the usual output folder './out/' (already excluded from commits, via '.gitignore') ...
* [ ] general: check if add a dev dependency on [ESDoc](https://www.npmjs.com/package/esdoc), and the add an npm custom command to generate doc (in the usual output folder 'out' already excluded by '.gitignore'); and provide a configuration file for it (.esdoc.json') as seen in their docs ...
* [ ] general: check if use [fastify-sensible - Fastify](https://github.com/fastify/fastify-sensible), to add some standard and useful defaults ...

* [ ] general: update folders for pages (public, templates, etc) to move all under a 'web' or 'pages' folder (but with 'git mv' to not losing files history) ... wip

* [ ] general: change template engine from 'ejs' to [Nunjucks](https://mozilla.github.io/nunjucks/) or [Marko](https://markojs.com), but in a branch (and merge later into master) ...
* [ ] general: implement some automation tool, using [Gulp](https://gulpjs.com/) or [WebPack](https://webpack.js.org/) ...
* [ ] general: rewrite all using latest [TypeScript](https://www.typescriptlang.org/), but in a branch (and merge later into master) ...

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


---------------
