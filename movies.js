const { readFileSync } = require('fs');
const movies = JSON.parse(readFileSync('./movies.json').toString());
console.log(movies)
module.exports = movies;