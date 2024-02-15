# The Cereal API

The Cereal API is an server application developed to solve [the cereal offer](https://github.com/Superfiliate/hiring/blob/main/the-cereal-offer.md) challenge from @Superfiliate.

# The API structure

The API was developed using Node and Typescript, and the Fastify framework. Fastify was chosed because it is a technology which I had already been studying for a few weeks.

For automating tests, Jest was used to unit test, and for integration test Fastify comes with a built-in support for fake http injections to simulate and test the server logic.

The application has only the POST endpoint `/discount`, responsible to do the logic to calculate the discount.

The server url to make requests is avaliable [here](https://cereal-api-polished-dew-4102.fly.dev/discount).

<!-- PRO: Documentation is overall good with a basic explanation of what technologies were used. -->
<!-- CON: Docs could explain how to run this project locally, with or without the docker setup. -->
