var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var morgan = require('morgan');

var Book = require('./models/book');

app.use(morgan('combined'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const uri = "mongodb://mongo:27017";

mongoose.connect(uri);

// CONNECTION EVENTS
// When successfully connected
mongoose.connection.on('connected', function () {
  console.log('Mongoose default connection open to ' + uri);
});

// If the connection throws an error
mongoose.connection.on('error',function (err) {
  console.log('Mongoose default connection error: ' + err);
});

// When the connection is disconnected
mongoose.connection.on('disconnected', function () {
  console.log('Mongoose default connection disconnected');
});

app.get('/', function(request, response) {
  response.send("Hello World!");
});

app.post('/books', function(request, response) {
  //console.log(request.body);
    var book = new Book();
    // set book attributes from post request
    book.title = request.body.title;
    book.author = request.body.author;
    book.year = request.body.year;
    //console.log(book);
    // save book
    book.save(function(err) {
        if (err) {
            response.send(err);
        } else {
            response.json(book);
        }
    });
});

app.get('/books', function (request, response) {
  Book.find(function(err, books) {
        if (err) {
            response.send(err);
        } else {
            response.json(books);
        }
    });
});

app.listen(3000, function() {
  console.log('Example app listening on port 3000!');
});
