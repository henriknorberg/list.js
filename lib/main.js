var express = require('express');
var manager = require('./FileManager');

var loader = new manager.DocumentLoader('../html');
loader.Load();

var app = express.createServer();

app.configure(function()
{
	app.use(express.bodyParser());
});

app.post('/', function(req, res)
{
	console.log(req.body);
	res.redirect('/');
});


app.get('/', function(req, res)
{
	var index = loader.Files['index.html'];
	
	res.send(index.toString());
});

app.get('/heading.gif', function(req, res)
{
	res.setHeader('Content-Type', 'image/gif');
	res.send(loader.Files['heading.gif']);
});

app.get('/style.css', function(req, res)
{
	res.setHeader('Content-Type', 'text/css');
	res.send(loader.Files['style.css']);
});

app.get('/custom.js', function(req, res)
{
	res.setHeader('Content-Type', 'text/javascript');
	res.send(loader.Files['custom.js']);
});

app.get('/jquery.js', function(req, res)
{
	res.setHeader('Content-Type', 'text/javascript');
	res.send(loader.Files['jquery.js']);
});

app.listen(8080);

console.log('Server listening @ 8080');
