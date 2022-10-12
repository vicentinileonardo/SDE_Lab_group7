const { ApolloServer } = require('apollo-server');
const { ApolloServerPluginLandingPageLocalDefault } = require('apollo-server-core');
const { getHighlightedMovies, getMoviesPage, getMovieDirectors} = require('./movies');

const resolvers = {
  Director: {
    __resolveType: director => {
      if (!director._typename)
        director._typename = 'Actor';
      return director._typename;
    }
  },
  Movie: {
    directors: movie => getMovieDirectors(movie.id)
  },
  Query: {
    highlightedMovies: getHighlightedMovies,
    movies: (_, { page }) => getMoviesPage(page)
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
