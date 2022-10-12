const { ApolloServer } = require('apollo-server');
const { ApolloServerPluginLandingPageLocalDefault } = require('apollo-server-core');
const { getHighlightedMovies, getMoviesPage, getMovieDirectors, getMovieReviews, newMovieReview, getMovie} = require('./movies');

const resolvers = {
  Director: {
    __resolveType: director => {
      if (!director._typename)
        director._typename = 'Actor';
      return director._typename;
    }
  },
  Movie: {
    directors: movie => getMovieDirectors(movie.id),
    reviews: movie => getMovieReviews(movie.id)
  },
  Query: {
    highlightedMovies: getHighlightedMovies,
    movies: (_, { page }) => {
      if(page < 0) throw new Error('Invalid page number');
      return getMoviesPage(page);
    }
  },
  Mutation: {
    reviewMovie: (_, params) => {
      newMovieReview(params);
      return { ...getMovie(params.movieID), reviews: getMovieReviews(params.movieID) };
    }
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
