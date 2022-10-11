const expressApp = require('express');
const app = expressApp();
const { getHighlightedMovies, getMoviesPage, getAllGenres } = require('./movies');

app.get('/movies', (req, res) => {
  res.json(getHighlightedMovies());
});

app.get('/movies/page/:page?', (req, res) => {
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