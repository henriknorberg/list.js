var http = require('http');
var uuid = require('node-uuid');

var client = function(port, host,dbname)
{
	this.port = port;
	this.host = host;
	this.dbname = dbname;
	
	this.GetAll = function(callback)
	{
		var options = {
			host : this.host,
			port : this.port,
			path : '/' + this.dbname + '/_all_docs?include_docs=true',
			method : 'GET'
		};
		
		var req = http.request(options, function(res)
		{
			var data = '';
			res.on('data', function(chunk)
			{
				data += chunk;
			});
			res.on('end', function()
			{
				if(callback)callback(data);
			});
		});
		req.end();
	};
	
	this.GetById = function(id, callback)
	{
		var options = {
			host : this.host,
			port : this.port,
			path : '/' + dbname + '/' + id.toString(),
			method : 'GET'
		};
		
		var req = http.request(options, function(res)
		{
			var data = '';
			res.on('data', function(chunk)
			{
				data += chunk;
			});
			res.on('end', function()
			{
				if(callback) callback(data);
			});
		});
		req.end();
	};
	
	this.Insert = function(data, callback)
	{
		var id = uuid();
	
		var options = {
			host : this.host,
			port : this.port,
			path : '/' + dbname + '/' + id.toString(),
			method : 'PUT'
		};
		
		var req = http.request(options, function(res)
		{
			var data = '';
			res.on('data', function(chunk)
			{
				data += chunk;
			});
			res.on('end', function()
			{
				if(callback) callback();
			});
		});
		req.write(data);
		req.end();
	};
	
	this.CallView = function(designDoc, viewname, callback)
	{
		var options = {
			host : this.host,
			port : this.port,
			path : '/' + this.dbname + '/_design/' + designDoc + '/_view/' + viewname + '?include_docs=true',
			method: 'GET'
		};
		
		var req = http.request(options, function(res)
		{
			var data = '';
			res.on('data', function(chunk)
			{
				data += chunk;
			});
			
			res.on('end', function()
			{
				if(callback) callback(data);
			});
		});
		req.end();
	};
	
	
};

exports.Client = client;
