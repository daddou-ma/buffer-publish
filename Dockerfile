FROM node:12.13.0-alpine

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

ENV NODE_ENV production

COPY packages/constants /usr/src/app/packages/constants
COPY packages/server/package.json /usr/src/app
RUN yarn install --non-interactive

COPY packages/server /usr/src/app
COPY version.json /usr/src/app