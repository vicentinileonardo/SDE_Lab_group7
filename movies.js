const { readFileSync } = require('fs');

let movies;
if(!movies) movies = JSON.parse(readFileSync('./movies.json').toString());

const PAGE_SIZE = 20;

const getHighlightedMovies = _ => movies.slice(0, 10);
const getMoviesPage = page => movies.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE);
const getAllMovies = _ => movies;

module.exports = { getAllMovies, getHighlightedMovies, getMoviesPage };