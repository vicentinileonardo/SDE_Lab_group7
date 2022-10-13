const { readFileSync, writeFile } = require('fs');

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

const reviews = JSON.parse(readFileSync('./reviews.json').toString());
for (const k in reviews) {
  reviews[k] = reviews[k].map(r => ({ review: r.review, when: new Date(r.when) }));
}
console.log(reviews)

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

module.exports = {
  getMovie: movieID => movies[movieID],
  getHighlightedMovies: _ => movies.slice(0, 10),
  getMoviesPage: page => movies.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE),
  getAllMovies: _ => movies,
  getAllGenres: _ => Object.keys(genres).map(g => g).join('\n'),
  getMovieDirectors: movieID => new Promise(r => setTimeout(_ => r(directors[movieID]), 2000)),
  getMovieReviews: movieID => reviews[movieID] || [],
  newMovieReview: ({ movieID, review }) => {
    if(!movies[movieID]) throw new Error('Invalid movieID: ' + movieID);
    if(!review || review.length === 0) throw new Error('Invalid review: ' + review);
    if(!reviews[movieID]) reviews[movieID] = [];
    reviews[movieID].push({ review, when: new Date() });
    writeFile('./reviews.json', JSON.stringify(reviews), err => console.log(err))
  }
};