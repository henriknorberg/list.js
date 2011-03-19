var http = require('http');
var fs = require('fs');

var couchClient = require('../lib/couchClient');
var cm = require('../lib/configurationManager');
cm.ConfigManager.ReadConfig('../lib/configure.json');
var cfg = cm.ConfigManager.cfg;
console.log('Running setup script');
console.log('read config');
console.log('creating database');
createDb(createViews);

function createDb(callback)
{
	var options = {
	host : cfg.couchDB.host,
	port : cfg.couchDB.port,
	path : '/' + cfg.couchDB.dbname,
	method : 'PUT'
	};
	
	var req = http.request(options, function(res)
	{
		var result = '';
		res.on('data', function(chunk)
		{
			result += chunk;
		});
		res.on('end', function()
		{
			if(callback)callback();
		});
	});
	req.end();
}

function createViews()
{
	console.log('Create view');
	var view = fs.readFileSync('../couchdb/lists.json');
	var options = {
	host : cfg.couchDB.host,
	port : cfg.couchDB.port,
	path : '/' + cfg.couchDB.dbname + '/_design/lists',
	method: 'PUT'
	};
	
	var req = http.request(options, function(res)
	{
		res.on('data', function(chunk)
		{
			res.on('data', function()
			{
				
			});
		});
	});
	req.write(view);
	req.end();
}
