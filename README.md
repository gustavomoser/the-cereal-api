# The Cereal API

The Cereal API is an server application developed to solve [the cereal offer](https://github.com/Superfiliate/hiring/blob/main/the-cereal-offer.md) challenge from @Superfiliate.

# The API structure

The API was developed using Node and Typescript, and the Fastify framework. Fastify was chosed because it is a technology which I had already been studying for a few weeks.

For automating tests, Jest was used to unit test, and for integration test Fastify comes with a built-in support for fake http injections to simulate and test the server logic.

The application has only the POST endpoint `/discount`, responsible to do the logic to calculate the discount.

The server url to make requests is avaliable [here](https://cereal-api-polished-dew-4102.fly.dev/discount) and the JSON body example can be found at the challenge description.

# Install and run

## Install dependencies

To install project dependencies use:

```
yarn install
```

## Run project

### Using node

To run the application locally using node, use:

```
yarn start
```

and to run it on developing mode, use:

```
yarn start:dev
```

### Using Dockerfile

TODO

## Run tests

To run application tests, use:

```
yarn test
```

and to run it attaching a watcher:

```
yarn start:dev
```

## Build and deploy

To build the application, use:

```
yarn build
```

and to deploy the API on Fly.io, use:

```
yarn deploy
```
