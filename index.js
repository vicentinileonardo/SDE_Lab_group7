const { ApolloServer } = require('apollo-server');
const { ApolloServerPluginLandingPageLocalDefault } = require('apollo-server-core');
const { getHighlightedMovies, getMoviesPage, getMovieDirectors, getMovieReviews, newMovieReview, getMovie } = require('./movies');
const { getAuthContext } = require('./auth');
const { GraphQLScalarType } = require('graphql/type');
const { GraphQLError } = require('graphql/error');

const SKIP_AUTH = true;

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
    },
    auth: (_, __, context) => context.username
  },
  Mutation: {
    reviewMovie: (_, params) => {
      newMovieReview(params);
      return { ...getMovie(params.movieID), reviews: getMovieReviews(params.movieID) };
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

const server = new ApolloServer({
  typeDefs: require('./schema'),
  resolvers,
  csrfPrevention: true,
  cache: 'bounded',
  plugins: [
    ApolloServerPluginLandingPageLocalDefault({ embed: true }),
  ],
  context: async ({ req }) => {
    if(SKIP_AUTH) return { };
    const authContext = getAuthContext(req);
    console.log('Auth OK ', authContext);
    return authContext;
  },
});

server.listen(4000).then(({ url }) => {
  console.log(`Apollo ready at ${url}`);
});

require('./expressApp')();
