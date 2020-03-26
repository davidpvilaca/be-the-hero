################################################################
# Install dev dependencies and build
################################################################
FROM node:12-alpine as builder

ADD . /app/service

WORKDIR /app/service

RUN yarn install --dev

RUN yarn build

RUN yarn knex:ts migrate:latest

COPY ./src/db/db.sqlite ./dist/db/db.sqlite

################################################################
# Only install production dependencies
################################################################
FROM node:12-alpine as installer

RUN 	mkdir -p /app/service

WORKDIR /app/service

COPY --from=builder /app/service/package.json .
COPY --from=builder /app/service/yarn.lock .

RUN  yarn install --prod

################################################################
# Production container
################################################################
FROM node:12-alpine

RUN 	mkdir -p /app/service

WORKDIR /app/service

COPY --from=builder /app/service/package.json .
COPY --from=builder /app/service/dist ./dist
COPY --from=installer /app/service/node_modules ./node_modules

EXPOSE 3333

CMD ["yarn", "start:prod"]
