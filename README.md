# The Cereal API

The Cereal API is an server application developed to solve [the cereal offer](https://github.com/Superfiliate/hiring/blob/main/the-cereal-offer.md) challenge from @Superfiliate.

# The API structure

The API was developed using Node and TS, and the Fastify framework. I chose Fastify was because it is a technology that I had already been studying for a few weeks.

For automating tests, I used Jest to unit test, and for integration test Fastify comes with a built-in support for fake http injections to simulate and test the server logic.

The application has only the POST endpoint `/discount`, responsible to do the logic to calculate the discount.

The server deploy is avaliable [here](https://cereal-api-polished-dew-4102.fly.dev/).
