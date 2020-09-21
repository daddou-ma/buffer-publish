FROM node:12.13.0-alpine as BUILD
WORKDIR /app
COPY . /app

# We used to `yarn install` and `yarn build` here to serve the static
# assets from nginx, but we're moving that to serve from S3 again
# so this is an unecessary multi-stage build now, but :shrug: we'll
# be getting rid of these soon once we serve from the edge.

FROM nginx:latest
COPY --from=BUILD /app/build /var/www/app
COPY nginx-config/production.conf /etc/nginx/conf.d/default.conf

EXPOSE 80