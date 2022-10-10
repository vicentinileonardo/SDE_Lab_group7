const { ApolloServer } = require('apollo-server');
const { ApolloServerPluginLandingPageLocalDefault } = require('apollo-server-core');
const movies = require('./movies');

const resolvers = {
  Movie: {
    year: (movie) => movie.year
  },
  Query: {
    movies: () => [{
      title: 'xdxx',
      year: new Date('2022-01-01')
    }],
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

server.listen(4000).then(({ url }) => {
  console.log(`Apollo ready at ${url}`);
});

require('./expressApp')();
