var fs = require('fs');

var configManager = new function ()
{
	this.cfg = {};
	this.ReadConfig = function()
	{
		//Reading configuration
		var cfg = fs.readFileSync('configure.json');
	
		this.cfg = JSON.parse(cfg);
	};
};

exports.ConfigManager = configManager;
