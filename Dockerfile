# syntax = docker/dockerfile:1

# Adjust NODE_VERSION as desired
ARG NODE_VERSION=18.18.2
ARG YARN_VERSION=1.22.21
FROM node:${NODE_VERSION}-slim as build-image

LABEL fly_launch_runtime="Node.js"
ENV PORT=8080

WORKDIR /usr/src/app
RUN npm install -g yarn@$YARN_VERSION --force

COPY package.json yarn.lock tsconfig.json tsconfig.build.json ./
COPY ./src ./src

RUN yarn install
RUN yarn build

COPY . .

EXPOSE 8080
CMD [ "node", "dist/server.js" ]
