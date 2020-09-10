FROM node:12.13.0-alpine as BUILD
WORKDIR /app
COPY . /app

ARG GIT_COMMIT
ENV GIT_COMMIT=${GIT_COMMIT}
ENV NODE_ENV production

RUN yarn install --frozen-lockfile --non-interactive --production
RUN BUGSNAG_APP_VERSION=$GIT_COMMIT yarn build

FROM nginx:latest
COPY --from=BUILD /app/build /var/www/app
COPY nginx-config/production.conf /etc/nginx/conf.d/default.conf

EXPOSE 80