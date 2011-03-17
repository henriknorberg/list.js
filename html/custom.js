$(document).ready(function()
{
	$('#toolbar button.add').click(page.NewList);
	$('#toolbar button.home').click(function()
	{
		$.location.attr('href', '/');
	});
	$('#newListForm button.submit').click(function(event)
	{		
		var columns = $('#Columns').val();

		var listname = $('#ListName').val();

		$.post('/', [columns, listname]);
		
		$('#newListForm').hide('fast');
		return false;
	});
	
	$('#newListForm button.cancel').click(function()
	{
		$('#newListForm').hide('fast');
	});
});


var page = new function()
{
	this.NewList = function()
	{
		$('#newListForm').show('slow');
	};
};
