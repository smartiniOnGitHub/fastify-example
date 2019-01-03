# Webapp and Docker

## Usage

To use Docker, all is already configured via code in its 'Dockerfile', so you only need to tell Docker to use it.

For simplicity, the current webapp name here is 'test-webapp'.

Note that by default no user is able to run Docker commands without 'sudo', unless it is in the 'docker' group.


### Build

- to build the image: `docker build -t test-webapp`.
- to inspect image (for check contents, etc): `docker exec -it test-webapp /bin/bash`
- to install dependencies (if not already installed during the build): `docker run -t test-webapp npm install`
- to install dependencies (if not already installed during the build) for production environment: `docker run -t test-webapp npm install --only=production`

### Run

- to run   the image (normal):   `docker run -p 8080:8000 test-webapp`
- to run   the image (detached): `docker run -d -p 8080:8000 test-webapp`
- to run   the image (detached and a name for the instance 1 and related port, example): `docker run -d -p 8001:8000 test-webapp --name test-webapp-1 test-webapp`
  - and then get container ID: `docker ps`
  - and get its logs:          `docker logs <container id>`
- to run   the image (normal) via npm command start (in this case the process will stay active, so I need to stop later): `docker run -p 8080:8000 -t test-webapp bash -c "npm start"`
- to run   the image (normal) via npm command: `docker run -p 8080:8000 -t test-webapp bash -c "npm test"`
- to run   the image (detached) via npm command start (in this case the process will stay active in background, so I need to stop later): `docker run -d -p 8080:8000 -t test-webapp bash -c "npm start"`
  - and then I could get its logs with (requires its id): `docker logs <container id>`
  - or to display all or only latest n lines, for example: `docker logs <container id> --tail="all"`

### Inspect/Checks

- to enter in the container (for check contents, etc, but attention to entry point if set): `docker run  -it test-webapp bash`
- to enter in the container (for check contents, etc, but attention to entry point if set): `docker exec -it <container id> /bin/bash`
- to check the container works, for example: `curl -i http://localhost:8080`

### Stop/Cleanup

- to stop  the container, for example: `docker stop <container id>`
- to cleanup all images, containers, etc: `docker system prune --all`

----
