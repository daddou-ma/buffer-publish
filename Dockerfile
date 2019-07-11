FROM node:8.12.0-alpine AS builder

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
EXPOSE 80
ENV NODE_ENV production

COPY packages/server/package.json /usr/src/app
RUN yarn install --non-interactive

COPY packages/server /usr/src/app
COPY staticAssets.json /usr/src/app
COPY version.json /usr/src/app


FROM node:8.12.0-alpine
WORKDIR /usr/src/app
COPY --from=builder /usr/src/app .
CMD ["node", "./index.js"]
