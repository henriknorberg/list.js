function JsonToHtml(json, renderHtmlCallback)
{
	if(json == typeof string)
		json = JSON.parse(json);

	var html = '';

	if(!renderHtmlCallback)
		throw new Error('No callback method specified');

	for(var i = 0; i < json.rows.length; i++)
	{
		var row = json.rows[i].doc;
		
		html += renderHtmlCallback(row);
	}
	
	return html;
}

exports.JsonToHtml = JsonToHtml;
