const { ApolloServer } = require("apollo-server");
const typeDefs = require("./schema");

const server = new ApolloServer({ typeDefs });

server
  .listen()
  .then(({ url }) => {
    console.log(`Apollo server ready at ${url}`);
  })
  .catch(e => {
    console.log(e);
  });
