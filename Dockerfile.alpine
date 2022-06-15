FROM node:lts-alpine as builder

LABEL version="3.0.0"
LABEL description="Example Fastify (Node.js) webapp Docker Image"
LABEL maintainer="Sandro Martini <sandro.martini@gmail.com>"

# update packages, to reduce risk of vulnerabilities
RUN apk update && apk upgrade
# RUN apk cache clean

# set a non privileged user to use when running this image
RUN addgroup -S nodejs && adduser -S nodejs -G nodejs
USER nodejs
# set right (secure) folder permissions
RUN mkdir -p /home/nodejs/app/node_modules && chown -R nodejs:nodejs /home/nodejs/app

WORKDIR /home/nodejs/app

# set default node env
# to be able to run tests (for example in CI), do not set production as environment
ENV NODE_ENV=production

ENV NPM_CONFIG_LOGLEVEL=warn

# copy project definition/dependencies files, for better reuse of layers
COPY --chown=nodejs:nodejs package*.json ./

# copy stuff required by prepublish (postinstall)
COPY .snyk ./

# install dependencies here, for better reuse of layers
RUN npm install && npm audit fix && npm cache clean --force

# copy all sources in the container (exclusions in .dockerignore file)
COPY --chown=nodejs:nodejs . .

EXPOSE 8000

# add an healthcheck, useful
# healthcheck by calling the additional script exposed by the plugin
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s CMD npm run healthcheck-manual

# ENTRYPOINT [ "npm" ]
# CMD [ "npm", "start" ]
CMD [ "node", "./src/server" ]
