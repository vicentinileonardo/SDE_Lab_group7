const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const { getHighlightedMovies, getMoviesPage, getAllGenres } = require('./movies');
const { readFileSync, writeFile } = require('fs');

const auths = JSON.parse(readFileSync('./auths.json').toString());

app.use(cookieParser());

app.get('/auth', (req, res) => {
  let randomNumber = parseInt((Math.random() * 1000000) + '') + '';
  res.cookie('auth', randomNumber, { maxAge: 900000, domain: 'localhost', path: '/' });
  auths[+randomNumber] = req.query.username;
  writeFile('./auths.json', JSON.stringify(auths), err => console.log(err));
  res.send('OK');
});

app.get('/', (req, res) => {
  res.sendFile('./tests.html', {root: __dirname })
});

app.get('/movies', (req, res) => {
  res.status(200).json(getHighlightedMovies());
});

app.get('/movies/page/:page?', (req, res) => {      // TODO Exercise 1.2b
    let page = parseInt(req.params.page);
    if(!page) page = 0;
    if(page >= 0)
      res.json(getMoviesPage(page));
    else
      res.status(400).send('Invalid page number');
});

app.get('/movies/genres', (req, res) => {
  res.send(getAllGenres());
});


module.exports = _ => app.listen(3000, _ => {
  console.log(`Express ready at http://localhost:3000/`)
});