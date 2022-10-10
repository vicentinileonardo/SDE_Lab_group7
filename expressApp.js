const expressApp = require('express');
const app = expressApp();
const movies = require('./movies');

app.get('/', (req, res) => {
  res.json(movies);
})

module.exports = _ => app.listen(3000, _ => {
  console.log(`Express ready at http://localhost:3000/`)
});