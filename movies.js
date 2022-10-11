const { readFileSync } = require('fs');

let movies, genres = {}, actors;
if(!movies) {
  movies = JSON.parse(readFileSync('./movies.json').toString());
  for (let i = 0; i < movies.length; i++) {

    for (let j = 0; j < movies[i].genres.length; j++) {
      movies[i].genres[j] = movies[i].genres[j].replace(' ', '_');
      if (!genres[movies[i].genres[j]])
        genres[movies[i].genres[j]] = movies[i].genres[j];
    }

    //TODO directors

  }
}

const PAGE_SIZE = 20;

const getHighlightedMovies = _ => movies.slice(0, 10);
const getMoviesPage = page => movies.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE);
const getAllMovies = _ => movies;
const getAllGenres = _ => Object.keys(genres).map(g => g).join('\n');

module.exports = { getAllMovies, getHighlightedMovies, getMoviesPage, getAllGenres };