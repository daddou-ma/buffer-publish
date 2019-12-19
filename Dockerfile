FROM node:8.12.0-alpine

WORKDIR /usr/src/app


COPY packages/constants /usr/src/app/packages/constants
COPY packages/server/package.json /usr/src/app
RUN yarn install --non-interactive

COPY packages/server /usr/src/app
COPY staticAssets.json /usr/src/app
COPY version.json /usr/src/app

FROM node:8.12.0-alpine
WORKDIR /usr/src/app
COPY --from=0 /usr/src/app .
ENV NODE_ENV production

EXPOSE 80

CMD node ./index.js
