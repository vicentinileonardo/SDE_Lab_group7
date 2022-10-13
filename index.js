const { ApolloServer } = require('apollo-server');
const { ApolloServerPluginLandingPageLocalDefault } = require('apollo-server-core');
const { getHighlightedMovies, getMoviesPage, getMovieDirectors, getMovieReviews, newMovieReview, getMovie} = require('./movies');
const { GraphQLScalarType } = require('graphql/type');
const { GraphQLError } = require('graphql/error');
const {readFileSync} = require('fs');

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
    let userAuth = req.header('Authorization');
    if(!userAuth)
      throw new GraphQLError('Authorization not sent', {
        extensions: {
          code: 'UNAUTHENTICATED',
          http: { status: 401 },
        }
      });

    userAuth = userAuth.split(' ')[1];

    const auths = JSON.parse(readFileSync('./auths.json').toString());

    if(!auths || !auths[+userAuth])
      throw new GraphQLError('User is not authenticated', {
        extensions: {
          code: 'UNAUTHENTICATED',
          http: { status: 401 },
        }
      });

    console.log('Auth OK ', +userAuth, auths[+userAuth]);

    return { username: auths[+userAuth] };
  },
});

server.listen(4000).then(({ url }) => {
  console.log(`Apollo ready at ${url}`);
});

require('./expressApp')();
