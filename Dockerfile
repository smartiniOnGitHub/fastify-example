FROM node:8 as builder

LABEL version="1.0.0"
LABEL description="Example Fastify (Node.js) webapp Docker Image"
LABEL maintainer "Sandro Martini <sandro.martini@gmail.com>"

RUN mkdir -p /work
WORKDIR /work

# Set a non privileged user to use when running this image
# USER node

ARG NODE_ENV
ENV NODE_ENV $NODE_ENV
# ENV NODE_ENV production
# to be able to run tests (for example in CI), do not set production as environment

ENV NPM_CONFIG_LOGLEVEL warn

# copy project definition/dependencies files, for better reuse of layers
COPY ./package*.json ./$WORKDIR

# install dependencies here, for better reuse of layers
RUN npm install
# RUN npm install --only=production

# copy all sources in the container (exclusions in .dockerignore file)
COPY . $WORKDIR

# build/pack binaries from sources ...


# This results in a single layer image
# FROM scratch AS release
# COPY --from=builder /dist /dist

EXPOSE 8000

# ENTRYPOINT [ "npm" ]
# CMD [ "start" ]

CMD [ "npm", "start" ]

# end.
