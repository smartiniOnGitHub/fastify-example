# test-fastify-ejs - Docker

## Usage

To use Docker, all is already configured via code in its 'Dockerfile', so you only need to tell Docker to use it.


### Build

- to build the image: sudo docker build -t test-fastify .
- to inspect image (for check contents, etc): sudo sudo docker exec -it test-fastify /bin/bash
- to install dependencies (if not already installed during the build): sudo sudo docker run -t test-fastify npm install
- to install dependencies (if not already installed during the build) for production environment: sudo sudo docker run -t test-fastify npm install --only=production

### Run

- to run   the image (normal):   sudo docker run -p 8080:8000 test-fastify
- to run   the image (detached): sudo docker run -d -p 8080:8000 test-fastify
- to run   the image (detached and a name for the instance 1 and related port, example): sudo docker run -d -p 8001:8000 test-fastify --name test-fastify-1 test-fastify
  - and then get container ID: sudo docker ps
  - and get its logs:          sudo docker logs <container id>
- to run   the image (normal) via npm command start (in this case the process will stay active, so I need to stop later): sudo docker run -p 8080:8000 -t test-fastify bash -c "npm start"
- to run   the image (normal) via npm command: sudo docker run -p 8080:8000 -t test-fastify bash -c "npm test"
- to run   the image (detached) via npm command start (in this case the process will stay active in background, so I need to stop later): sudo docker run -d -p 8080:8000 -t test-fastify bash -c "npm start"
  - and then I could get its logs with (requires its id): sudo docker logs <container id>
  - or to display all or only latest n lines, for example: sudo docker logs <container id> --tail="all"

### Inspect/Checks

- to enter in the container (for check contents, etc, but attention to entry point if set): sudo docker run  -it test-fastify bash
- to enter in the container (for check contents, etc, but attention to entry point if set): sudo docker exec -it <container id> /bin/bash
- to check the container works, for example: curl -i http://localhost:8080

### Stop/Cleanup

- to stop  the container, for example: sudo docker stop <container id>
- to cleanup all images, containers, etc: sudo docker system prune --all

----

