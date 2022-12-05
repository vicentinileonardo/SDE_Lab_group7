const {
  getMovieDirectors,
  getMovieReviews,
  getHighlightedMovies,
  getMoviesPage,
  newMovieReview,
  getMovie
} = require('../libs/movies/movies');
const { GraphQLScalarType } = require('graphql/type');

module.exports = {
  // Uncomment for Exercise 3.3
  /*Director: {
    __resolveType: director => {
      if (!director._typename)
        director._typename = 'ActorDirector';
      return director._typename;
    }
  },*/
  Movie: {
    // TODO Exercise 3.3
    reviews: movie => getMovieReviews(movie.id)
  },
  Query: {
    // TODO Exercise 1.1
    // TODO Exercise 1.2
    // TODO Mini-assignment 4
    /*auth: (_, __, context) => {                               
      if(!context.username)  throw new Error('User not authenticated');
      return {
        username: context.username,
        secretWord: context.secretWord
      };
    }*/
  },
  Mutation: {
    // TODO Exercise 2
  },
  Date: new GraphQLScalarType({
    name: 'Date',
    parseValue: value => new Date(value), // value from the client
    parseLiteral: ({ value }) => new Date(value), // value sent as inline value
    serialize: value => value.toISOString().substring(0, 10) // value sent as variable
  }),
    Datetime: new GraphQLScalarType({
    name: 'Datetime',
    parseValue: value => new Date(value), // value from the client
    parseLiteral: ({ value }) => new Date(value), // value sent as inline value
    serialize: value => value.toISOString() // value sent as variable
  })
};