'use strict';

// Application Dependencies
const express = require('express');
const superagent = require('superagent');
const pg = require('pg');

// Application Setup
const app = express();
const PORT = process.env.PORT || 3000;

// Application Middleware
app.use(express.static('./public'));
app.use(express.urlencoded({ extended: true }));

const client = new pg.Client('postgres://localhost:5432/books_app');
client.connect();
client.on('error', err => console.log(err));

//Set the view engine for server side templating

app.set('view engine', 'ejs');

// API Routes - rendering the search form
app.get('/', getBooks);
app.post('/searches', createSearch);
app.get('/searches/new', newSearch);
app.post('/books', addBook);
app.get('/books/:id', getOneBook);



// Creates a new search to the Google Books API

// Catch-all
app.get('*', (request, response) => response.status(404).send('This route does not exist'));

app.listen(PORT, () => console.log(`Listening on port: ${PORT}`));

//HELPER FUNCTIONS
function handleError(err, res) {
  console.error(err);
  if (res) res.status(500).send('Sorry, something went wrong')
}

function Book(response) {
  const placeholderImage = 'https://libreshot.com/wp-content/uploads/2016/07/books.jpg';
  this.title = response.title || 'No title available';
  this.author = response.authors || 'No author available';
  this.description = response.description || 'No description available';
  this.image = response.imageLinks.thumbnail || placeholderImage;
  this.isbn = response.industryIdentifiers[1].identifier || 'No ISBN available';
}

function newSearch(request, response) {
  response.render('pages/searches/new');
}

function createSearch(request, response) {
  let url = 'https://www.googleapis.com/books/v1/volumes?q=';

  if (request.body.search[1] === 'title') { url += `+intitle:${request.body.search[0]}`; }
  if (request.body.search[1] === 'author') { url += `+inauthor:${request.body.search[0]}`; }

  superagent.get(url)
    .then(apiResponse => apiResponse.body.items.map(book => new Book(book.volumeInfo)))
    .then(books => response.render('pages/searches/show', { arrayOfBooks: books }))
    .catch(error => handleError(error, response));
}

function getBooks(request, response) {
  let SQL = 'SELECT * from books;';

  return client.query(SQL)
    .then(results => response.render('pages/index', { results: results.rows }))
    .catch(handleError);
}

function getOneBook(request, response) {
  // console.log(request);
  let SQL = 'SELECT * from books WHERE id=$1;';
  let values = [request.params.id];

  return client.query(SQL, values)
    // .then(results => console.log(results.rows[0].id))
    .then(result => response.render('pages/books/show', { book: result.rows[0] }))
    .catch(error => handleError(error, response));
}

function addBook(request, response) {
  console.log(request.body);
  let { author, title, isbn, image_url, book_description, bookshelf } = request.body;
  let SQL = 'INSERT INTO books(author, title, isbn, image_url, book_description, bookshelf) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id;';

  let values = [author, title, isbn, image_url, book_description, bookshelf];

  return client.query(SQL, values)
    .then(results => response.redirect(`/books/${results.rows[0].id}`))
    .catch(err => handleError(err, response));

}
