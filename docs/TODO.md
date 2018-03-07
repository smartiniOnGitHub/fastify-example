# fastify-example - TODO

## TODO

- general: add some example route to use the async/await syntax, as seen in [Fastify goes LTS with 1.0.0 - Medium](https://medium.com/@fastifyjs/fastify-goes-lts-with-1-0-0-911112c64752) ... wip
- general: update to latest (post-1.0.x) Fastify ... wip

- general: update folders for pages (public, templates, etc) to move all under a 'web' or 'pages' folder (but with 'git mv' to not losing files history) ... wip

- general: change template engine from 'ejs' to [Nunjucks](https://mozilla.github.io/nunjucks/) or [Marko](https://markojs.com), but in a branch (and merge later into master) ...
- general: implement some automation tool, using [Gulp](https://gulpjs.com/) or [WebPack](https://webpack.js.org/) ...
- general: rewrite all using latest [TypeScript](https://www.typescriptlang.org/), but in a branch (and merge later into master) ...

- content: add other routes, but in a dedicated source (or folder) ...
- content: add error handlers ...
- content cleanup/update to latest standards my custom styles ...
- content: remove my custom styles from pages and change with some good default style, for example starting from latest [Bootstrap](https://getbootstrap.com/), then update licenses ...
- content: implement a full-stack webapp, with a modern front-end (Angular or React or Vue.js or other) ...


---------------


## DONE

- general: create/update initial skeleton (from an existing example) and tag it in git ... ok
- general: update dependencies/devDependencies etc in 'package.json', references to my remote repository, etc ... ok
- general: update the sample code with my standards (formatting, port 8000 for the dev server, etc) ... ok
- general: add License header in all source files ... ok
- general: update to Fastify 1.0.0 (just released), and related plugins, to ensure all work ... ok, done and tested
- general: update README to add reference to Dockerfile-usage ... ok
- general: add a precommit hook that trigger tests before a git commit ... maybe later

- content: add some simplified sources and resources (templates, pages, etc), to use as a base (and example) for others ... ok
- content: add 'nodemon' in devDependencies to be able to reload all content (even sources) in DEV environment ... ok
- content: printing routes at server startup, but only for non production environments ... ok

- example: use fastify options to change log level, etc ... ok
- example: use the 'fastify-favicon' plugin, to test it ... done (in page, still not in tests), but when calling [favicon.ico - localhost 8000](http://localhost:8000/favicon.ico) still it doesn't return the requested resource (should be published by the plugin)... ok, needed to update to a newer release of the plugin ('0.1.1')
- example: tag initial release (but without changing release number in 'package.json') ... ok


---------------
