const { ApolloServer } = require('apollo-server');
const { ApolloServerPluginLandingPageLocalDefault } = require('apollo-server-core');
const { getAuthContext } = require('./auth');

const SKIP_AUTH = true;

const server = new ApolloServer({
  typeDefs: require('./schema'),
  resolvers: require('./resolvers'),
  csrfPrevention: true,
  cache: 'bounded',
  plugins: [
    ApolloServerPluginLandingPageLocalDefault({ embed: true }),
  ],
  context: ({ req }) => {  // TODO Mini-assignment 1
    if(SKIP_AUTH) return { };
    return getAuthContext(req);
  },
});

server.listen(4000).then(({ url }) => {
  console.log(`Apollo ready at ${url}`);
});

require('./expressApp')();
