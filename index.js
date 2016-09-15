var todoList = require('./todoList.js');
var express = require('express');
var bodyParser = require('body-parser');
var template = require('consolidate').handlebars;

var app = express();
app.engine('hbs', template);

app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');

app.use( bodyParser.urlencoded() );
app.use( bodyParser.json() );
 
app.get('/', function (req, res) {
	todoList.list(function(err, rows) {
      if (err)
        throw err;
      res.render('index', {tasks: rows});
    });
});

app.post('/', function (req, res) {
	if (req.body.text) {
		todoList.add(req.body.text);
		todoList.list(function(err, rows) {
      if (err)
        throw err;
      res.render('index', {tasks: rows});
    });
	};
  
	if (req.body.deleteBtn) {
		todoList.delete(req.body.id);
		todoList.list(function(err, rows) {
      if (err)
        throw err;
      res.render('index', {tasks: rows});
    });
	};
  if (req.body.done) {
    todoList.complete(req.body.id);
    todoList.list(function(err, rows) {
      if (err)
        throw err;
      res.render('index', {tasks: rows});
    });
  };
	if (req.body.newText) {
		todoList.change(req.body.id, req.body.newText);
		todoList.list(function(err, rows) {
      if (err)
        throw err;
      res.render('index', {tasks: rows});
    });
	};
	if (req.body.done) {
		todoList.complete(req.body.id);
		todoList.list(function(err, rows) {
      if (err)
        throw err;
      res.render('index', {tasks: rows});
    });
	};
});

app.listen(8000, function () {
  console.log('Server was running on: ', 8000);
});
