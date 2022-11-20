const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const { getHighlightedMovies, getMoviesPage, getAllGenres, getMovieReviews, getMovieDirectors} = require('./libs/movies/movies');
const { readFileSync, writeFile } = require('fs');

const auths = JSON.parse(readFileSync('./libs/auth/auths.json').toString());

app.use(cookieParser());

app.get('/auth', (req, res) => {
  let randomNumber = parseInt((Math.random() * 1000000) + '') + '';
  res.cookie('auth', randomNumber, { maxAge: 900000, domain: 'localhost', path: '/' });
  auths[+randomNumber] = req.query.username;
  writeFile('./libs/auth/auths.json', JSON.stringify(auths), err => console.log(err));
  res.send('OK');
});

app.get('/', (req, res) => {
  res.sendFile('./tests.html', {root: __dirname })
});

app.get('/movies', async (req, res) => {
  res.status(200).json(await Promise.all(getHighlightedMovies().map(async m => {
    m.reviews = getMovieReviews(m.id);
    m.directors = await getMovieDirectors(m.id);
    return m;
  })));
});

app.get('/movies/page/:page?', async (req, res) => {    
    let page = parseInt(req.params.page);
    if(!page) page = 0;
    if(page >= 0)
      res.json(await Promise.all(getMoviesPage(page).map(async m => {
        m.reviews = getMovieReviews(m.id);
        m.directors = await getMovieDirectors(m.id);
        return m;
      })));
    else
      res.status(400).send('Invalid page number');
});

app.get('/movies/genres', (req, res) => {
  res.send(getAllGenres());
});


module.exports = _ => app.listen(3000, _ => {
  console.log(`Express ready at http://localhost:3000/`)
});