ARG NODE_VERSION=20.11.1
ARG YARN_VERSION=1.22.21
FROM node:${NODE_VERSION}-slim as build-image

LABEL fly_launch_runtime="Node.js"

WORKDIR /usr/src/app
RUN npm install -g yarn@$YARN_VERSION --force

COPY package.json yarn.lock tsconfig.json tsconfig.build.json ./
COPY ./src ./src

RUN yarn install
RUN yarn build

COPY . .

CMD [ "node", "dist/server.js" ]
