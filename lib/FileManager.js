var fs = require('fs');

exports.DocumentLoader = function(directory)
{
	this.directory = directory;
	
	this.Files = [];
	
	this.Load = function()
	{
		var loader = this;
		var content = fs.readdirSync(this.directory);
		
		for(var i = 0; i < content.length; i++)
		{
			var path = loader.directory + '/' + content[i];

			var stats = fs.statSync(path);
			if(stats.isFile())
				this.Files[content[i]] = fs.readFileSync(path);
		}
	};
};
