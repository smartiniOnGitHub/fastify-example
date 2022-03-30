# How to publish Webapp Docker images to DockerHub

## General info

Main purpose of this page is to describe/show how to publish Docker images 
of the current webapp to Docker images Repository [DockerHub](https://hub.docker.com).

Note that in this webapp I have two Docker files:
- `Dockerfile`, the default one, with all project Developer dependencies etc
- `Dockerfile.alpine`, a variant but much smaller, no Developer dependencies, 
  and tailored for running the image in Production

Docker tags by default are for the default Docker image, 
and there are other tags (with suffix '-alpine') 
that refers to the Alpine based Docker image.

Webapp Docker images are all based on standard Node.js (official) images.

Note that the repository at DockerHub was [smartiniatdocker09/fastify-example](https://hub.docker.com/r/smartiniatdocker09/fastify-example/), 
with automatic build rules so that any push in the git 'master' branch 
will trigger a build of both images. 
A push for a git tag should build an image with the same tag (and maybe a suffix).
So manual publish shouldn't be needed, anyway it's here just for reference.

Image tags were at [tags - smartiniatdocker09/fastify-example](https://hub.docker.com/r/smartiniatdocker09/fastify-example/tags), and you can find tags like:
'latest' / 'latest-alpine' and even '2.2.0' / '2.2.0-alpine', etc ...

Note: since some time all this is **no more available** without a Pro subscription; 
so to avoid stale/outdated images (with security vulnerabilities inside, etc) 
I **deleted** that repo and all related images and tags.


### Manual Publish

To manually publish images of the current webapp, do the following steps.
Note that when using default file ('Dockerfile') no need to specify it 
in Docker commands, otherwise you need to specify the file (as seen in following examples) with the option '-f file_to_use'.

- DockerHub username, represented here as `$dockerhub_username`
- login to DockerHub with `docker login`, 
- build the image, with the username as first part of the name: `docker build -t $dockerhub_username/fastify-example -f Dockerfile.alpine .`
- inspect current images, with: `docker images`, and from the list 
  get related image ID (called here 'imageID'), 
  opz. pipe with grep to filter images only with that name, 
  by appending: ` | grep fastify-example`
- create the tag, for example with: `docker tag imageID $dockerhub_username/fastify-example:2.2.0-alpine`; by default tag is 'latest'
- push that tag, with: `docker push $dockerhub_username/fastify-example:2.2.0-alpine`
- remove generated images, with `docker rmi imageID` (add the flag ‘-f’ if needed)
- repeat previous steps for other tags, for example for 'latest' 
  if it's the same of current tag
- optional, logout from DockerHub with `docker logout`

Note that images for 'latest' can be done/repeated even at any commit/push of code, 
but for milestones it's better to build/tag just after a git tag has been created 
(so it's aligned with source code).


### Verify published images/tags

To test, run it: 
`docker run -d -p 8080:8000 -t $dockerhub_username/fastify-example:latest-alpine`
and browse to [localhost:8080](http://localhost:8080), 
because container port has been redirected to host port 8080.
Otherwise change the public (host) port from 8080 to 8000, and browse to:
[localhost:8000](http://localhost:8000).

Note that in some cases if NATS public server is not reachable 
(for example by Corporate IF firewalls), you need to pass to Docker 
the env var to disable that feature, with `-e “FEATURE_NATS_DISABLE=true”`
before the image name in the command-line.

Then stop that image but getting the list of running containers with:
`docker container ls`, and stop with `docker kill containerID`.

Last, to cleanup related images, use usual Docker commands, like:
`docker rmi imageID`, maybe with the '-f' flag to force their deletion.

----
