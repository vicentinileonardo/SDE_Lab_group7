const { ApolloServer } = require('apollo-server');
const { ApolloServerPluginLandingPageLocalDefault } = require('apollo-server-core');
const { getAuthContext } = require('./libs/auth/auth');

const SKIP_AUTH = true;

const server = new ApolloServer({
  typeDefs: require('./GraphQL/typeDefs'),
  resolvers: require('./GraphQL/resolvers'),
  csrfPrevention: true,
  cache: 'bounded',
  plugins: [
    ApolloServerPluginLandingPageLocalDefault({ embed: true }),
  ],
  // TODO Mini-assignment 1
  /*context: ({ req }) => {  
    if(SKIP_AUTH) return { };
    return getAuthContext(req);
  },*/
});

server.listen(4000).then(({ url }) => {
  console.log(`Apollo ready at ${url}`);
});

require('./express_app')();
