const { ApolloServer } = require('apollo-server');
const { ApolloServerPluginLandingPageLocalDefault } = require('apollo-server-core');
const { getHighlightedMovies, getMoviesPage, getMovieDirectors, getMovieReviews, newMovieReview, getMovie} = require('./movies');
const {GraphQLScalarType} = require('graphql/type');
const {Kind} = require('graphql/language');

const resolvers = {
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
  },
  Date: new GraphQLScalarType({
    name: 'Date',
    parseValue: value => new Date(value + ''), // value from the client
    serialize: value => value.toISOString().substring(0, 10), // value sent to the client
    parseLiteral: ast => ast.kind === Kind.INT ? new Date(+ast.value) : null // ast value is always in string format
  }),

  Datetime: new GraphQLScalarType({
    name: 'Datetime',
    parseValue: value => new Date(value + ''), // value from the client
    serialize: value => value.toISOString(), // value sent to the client
    parseLiteral: ast => ast.kind === Kind.INT ? new Date(+ast.value) : null // ast value is always in string format
  })
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
