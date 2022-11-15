const {
  getMovieDirectors,
  getMovieReviews,
  getHighlightedMovies,
  getMoviesPage,
  newMovieReview,
  getMovie
} = require('./movies');
const { GraphQLScalarType } = require('graphql/type');

module.exports = {
  Director: {
    __resolveType: director => {
      if (!director._typename)
        director._typename = 'ActorDirector';
      return director._typename;
    }
  },
  Movie: {
    directors: movie => getMovieDirectors(movie.id),
    reviews: movie => getMovieReviews(movie.id)
  },
  Query: {
    highlightedMovies: getHighlightedMovies,                  // TODO Exercise 1.1
      movies: (_, { page }) => {
      if(page < 0) throw new Error('Invalid page number');    // TODO Exercise 1.2a
      return getMoviesPage(page);
    },
    auth: (_, __, context) => {                               // TODO Mini-assignment 4
      if(!context.username)  throw new Error('User not authenticated');
      return {
        username: context.username,
        secretWord: context.secretWord
      };
    }
  },
  Mutation: {
    reviewMovie: (_, params) => {                             // TODO Exercise 2
      newMovieReview(params);
      return {                                                // TODO Exercise 2b
        ...getMovie(params.movieID),
        reviews: getMovieReviews(params.movieID)
      };
    }
  },
  Date: new GraphQLScalarType({
    name: 'Date',
    parseValue: value => new Date(+value), // value from the client
    serialize: value => value.toISOString().substring(0, 10), // value sent as variable
    parseLiteral: ast => new Date(+ast) // value sent as inline value
  }),
    Datetime: new GraphQLScalarType({
    name: 'Datetime',
    parseValue: value => new Date(+value), // value from the client
    serialize: value => value.toISOString(), // value sent as variable
    parseLiteral: ast => new Date(+ast) // value sent as inline value
  })
};