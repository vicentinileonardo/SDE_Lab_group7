const { readFileSync } = require('fs');

let movies;
if(!movies) movies = JSON.parse(readFileSync('./movies.json').toString());

const getHighlightedMovies = _ => movies.slice(0, 10);
let getAllMovies = _ => movies;

module.exports = { getAllMovies, getHighlightedMovies };