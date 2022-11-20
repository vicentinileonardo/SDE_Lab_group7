const {readFileSync} = require('fs');
const {GraphQLError} = require('graphql/error');
module.exports = {
  getAuthContext: req => {
    let userAuth = req.header('Authorization');
    if(!userAuth)
      throw new GraphQLError('Authorization not sent', {
        extensions: {
          code: 'UNAUTHENTICATED',
          http: { status: 401 },
        }
      });

    userAuth = userAuth.split(' ');

    if(userAuth[0] !== 'Basic')
      throw new GraphQLError('Authorization wrong format', {
        extensions: {
          code: 'UNAUTHENTICATED',
          http: { status: 401 },
        }
      });

    const auths = JSON.parse(readFileSync('./auths.json').toString());
    const username = auths[+userAuth[1]];

    if(!username)
      throw new GraphQLError('Wrong credentials', {
        extensions: {
          code: 'UNAUTHENTICATED',
          http: { status: 401 },
        }
      });
    return auths ? { username, secretWord: 'BaNaNa!' } : null;
  }
};