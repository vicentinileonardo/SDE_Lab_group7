const { readFileSync } = require('fs');

const NON_ACTOR_DIRECTORS = [
  {
    _typename: 'NonActorDirector',
    name: 'Topolino',
  },
  {
    _typename: 'NonActorDirector',
    name: 'Frodo',
  },
  {
    _typename: 'NonActorDirector',
    name: 'Piergiorgio',
  },
  {
    _typename: 'NonActorDirector',
    name: 'Gandalf',
  },
  {
    _typename: 'NonActorDirector',
    name: 'Mr.Bean',
  },
  {
    _typename: 'NonActorDirector',
    name: 'Harry Potter',
  },
  {
    _typename: 'NonActorDirector',
    name: 'Pluto',
  },
  {
    _typename: 'NonActorDirector',
    name: 'Pingu',
  },
  {
    _typename: 'NonActorDirector',
    name: 'The muffin man',
  },
  {
    _typename: 'NonActorDirector',
    name: 'Pippo',
  },
  {
    _typename: 'NonActorDirector',
    name: 'Hannibal',
  },
  {
    _typename: 'NonActorDirector',
    name: 'Saetta Mc.Queen',
  },
  {
    _typename: 'NonActorDirector',
    name: 'Buzz Lightyear',
  },
  {
    _typename: 'NonActorDirector',
    name: 'Tony Stark',
  },
];

ACTORS = [

];

let movies, genres = {}, directors = [];
if(!movies) {
  movies = JSON.parse(readFileSync('./movies.json').toString()).reverse();
  for (let i = 0; i < movies.length; i++) {

    movies[i].id = i;

    // GENRES
    for (let j = 0; j < movies[i].genres.length; j++) {
      movies[i].genres[j] = movies[i].genres[j].replace(' ', '_');
      if (!genres[movies[i].genres[j]])
        genres[movies[i].genres[j]] = movies[i].genres[j];
    }

    //CAST
    movies[i].cast = movies[i].cast.map(a => ({ name: a }));

    // DIRECTORS
    directors[i] = [];
    let nToPick = parseInt(Math.random() * 10 % 2 + '');
    for (let k = 0; k < nToPick; k++)
      if(Math.random() * 10 % 2)
        if(movies[i].cast[k])
          directors[i].push(movies[i].cast[parseInt(Math.random() * 100 % movies[i].cast.length + '')]);
      else
          directors[i].push(NON_ACTOR_DIRECTORS[parseInt(Math.random() * 100 % NON_ACTOR_DIRECTORS.length + '')]);
    nToPick = directors[i].length === 0 ? nToPick +1 : nToPick;
    directors[i].push(NON_ACTOR_DIRECTORS[parseInt(Math.random() * 100 % NON_ACTOR_DIRECTORS.length + '')]);

  }
}

const PAGE_SIZE = 20;
//console.log(movies.findIndex(m => m.cast.length > 3))
//console.log(movies.slice(361))

const getHighlightedMovies = _ => movies.slice(0, 10);
const getMoviesPage = page => movies.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE);
const getAllMovies = _ => movies;
const getAllGenres = _ => Object.keys(genres).map(g => g).join('\n');
const getMovieDirectors = movieID => directors[movieID];

module.exports = { getAllMovies, getHighlightedMovies, getMoviesPage, getAllGenres, getMovieDirectors };