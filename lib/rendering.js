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
};

function RenderLists(lists)
{
	var html = "<ul>";
	
	for(var i = 0; i < lists.length; i++)
	{
	
		var elem = "<li>" + lists[i] + "</li>";
	}
	
	html += "</ul>";
	
	return html;
}

exports.JsonToHtml = JsonToHtml;
