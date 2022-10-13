const {readFileSync} = require('fs');
module.exports = {
  getUsername: authToken => {
    const auths = JSON.parse(readFileSync('./auths.json').toString());
    return auths ? auths[+authToken] : null;
  }
};