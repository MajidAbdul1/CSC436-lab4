var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var todoRouter = require('./routes/todo');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

require('./setupMongo')();

app.use(express.json());
app.use("/auth", require("./routes/auth"));
app.use("/todo", require("./routes/todo"));

app.use(function (err, req, res, next) {
    console.error(err.stack);
});

module.exports = app;