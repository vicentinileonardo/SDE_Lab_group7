const expressApp = require('express');
const app = expressApp();
const { getHighlightedMovies, getMoviesPage} = require('./movies');

app.get('/movies', (req, res) => {
  res.json(getHighlightedMovies());
});

app.get('/movies/page/:page', (req, res) => {
    const page = parseInt(req.params.page);
    if(page)
      res.json(getMoviesPage(page));
    else
      res.status(400).send('Invalid page number');
});


module.exports = _ => app.listen(3000, _ => {
  console.log(`Express ready at http://localhost:3000/`)
});