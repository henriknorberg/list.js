$(document).ready(function()
{

	$('#newListForm button.submit').click(function(event)
	{		
		var columns = $('#Columns').val();

		var listname = $('#ListName').val();
		
		var obj = {
			schema : columns,
			listname : listname
		};

		$.post('/NewList', obj, function(data)
		{
			$('#lists').html(data);
		});
		
		$('#newListForm').hide('fast');
		return false;
	});
	
	$('#newListForm button.close').click(function()
	{
		$('#newListForm').hide('fast');
	});
	
	//Loading lists from server
	$.get('/GetLists', {}, function(data)
	{
		var htmlStr = '<ul style="list-style:none;">';
	
		for(var i = 0; i < data.length; i++)
		{
			htmlStr += '<li><button class="ListButton">' + data[i] + '</button></li>';
		}
	
		htmlStr += '</ul>';
	
		$('#lists').html(htmlStr);
		
		$('button.ListButton').click(function(event)
		{
			$.post('/Content',{Name : $(this).html()}, function(data)
			{
				var columns = data.split(',');
				
				$('#content').empty();
				
				for(var i = 0; i < columns.length; i++)
				{
					$('#content').append('<span> ' + columns[i] + '</span>').addClass('columnHeader');
				}
			});
		});
	});
	
	$('.listItem').click(function()
	{
		$('#ribbonContent').html('<button id="CreateList">Create list</button>');
		$('#CreateList').click(page.NewList);
		$('#ribbonContent').show('slow');
	});

});


var page = new function()
{
	this.NewList = function()
	{
		$('#newListForm').show('slow');
	};
};


