const { ApolloServer } = require('apollo-server');
const { ApolloServerPluginLandingPageLocalDefault } = require('apollo-server-core');

const resolvers = {
  Query: {
    movies: () => [],
  },
  Mutation: {
    addMovie: (_, { title }) => ({
      title: title || 'Def',
      directors: [],
      cast: [],
      year: new Date()
    })
  }
};

const server = new ApolloServer({
  typeDefs: require('./schema'),
  resolvers,
  csrfPrevention: true,
  cache: 'bounded',
  plugins: [
    ApolloServerPluginLandingPageLocalDefault({ embed: true }),
  ],
});

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});