const { ApolloServer } = require('@apollo/server');
const { startStandaloneServer } = require('@apollo/server/standalone');
const { getAuthContext } = require('./libs/auth/auth');

const server = new ApolloServer({
  typeDefs: require('./GraphQL/typeDefs'),
  resolvers: require('./GraphQL/resolvers')
});

startStandaloneServer(server, { 
    listen: { port: 4000 },
    // TODO Mini-assignment 1
    /*context: ({ req }) => {
      return getAuthContext(req);
    }*/
  }).then(({ url }) => { 
    console.log(`Apollo ready at ${url}`); 
});

require('./express_app')();
