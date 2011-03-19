var fs = require('fs');

var configManager = new function()
{
	this.cfg = {};
	this.ReadConfig = function(path)
	{
		//Reading configuration
		var cfg = fs.readFileSync(path);
	
		this.cfg = JSON.parse(cfg);
	};
};

exports.ConfigManager = configManager;
