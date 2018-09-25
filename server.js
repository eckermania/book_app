'use strict';

// Application Dependencies
const express = require('express');
const superagent = require('superagent');

// Application Setup
const app = express();
const PORT = process.env.PORT || 3000;

// Application Middleware
app.use(express.static('./public'));
app.use(express.urlencoded ({extended: true}));

//Set the view engine for server side templating

app.set('view engine', 'ejs');

// API Routes - rendering the search form
app.get('/', newSearch);

// Creates a new search to the Google Books API
app.post('/searches', createSearch);

// Catch-all
app.get('*', (request, response) => response.status(404).send('This route does not exist'));

app.listen(PORT, () => console.log(`Listening on port: ${PORT}`));

//HELPER FUNCTIONS
function Book(info) {
  const placeholderImage = 'https://libreshot.com/wp-content/uploads/2016/07/books.jpg';

  this.title = info.title || 'No title available';
}

function newSearch(request, response) {
  response.render('pages/index');
}

function createSearch(request, response) {
  let url = 'https://www.googleapis.com/books/v1/volumes?q=';

  console.log(request.body);

  if (request.body.search[1] === 'title') {url += `+intitle:${request.body.search[0]}`;}
  if (request.body.search[1] === 'author') {url += `+inauthor:${request.body.search[0]}`;}

  superagent.get(url)
    .then(apiResponse => apiResponse.body.items.map(book => {return new Book(book.volumeInfo);
    }))

}
