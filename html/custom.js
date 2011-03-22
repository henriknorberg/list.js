

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
		return false;
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
			//Get the list columns from the server
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
	
	ribbonControl.Setup();
});				

//Contains interaction logic for ribbon control
var ribbonControl = new function()
{
	//anchor
	this.ribbon = this;
	
	this.Setup = function()
	{
		//Create main menu items @ ribbon head
		$('#ribbon').html('<button class="listItem">Lists</button><button class="listOptions">List options</buttons>');
		$('.listItem').click(this.Controls.ListActions.ShowLists);
		$('.listOptions').click(this.Controls.ListActions.ShowListActions);
	};
	
	//Handlers for several controls inside the ribbon
	this.Controls = new function()
	{
		var ctl = this;
		
		this.expanded = false;
		
		this.ListActions = new function()
		{	
			//Shows 
			this.ShowLists = function()
			{
				$('#ribbonContent').html('<button id="CreateList">Create list</button>');
				$('#CreateList').click(page.NewList);
				ctl.ShowChildren();
			};
			
			this.ShowListActions = function()
			{
				$('#ribbonContent').html('<button id="AddItem">AddItem</button>');
				$('#AddItem').click(page.AddItemToList);
				ctl.ShowChildren();
			};
		};
		
		this.ShowChildren = function()
		{
			if(ctl.expanded)
			{
				$('#ribbonContent').hide('slow');
				ctl.expanded = false;
			}
			else
			{
				$('#ribbonContent').show('slow');
				ctl.expanded = true;
			}
		};
	};
};
	

var page = new function()
{
	this.NewList = function()
	{
		$('#newListForm').show('slow');
		this.SelectList();
	};
	
	this.AddItemToList = function()
	{
		
	};
	
	this.SelectList = function()
	{
		listSelected = true;
	};
	
	this.ListSelected = false;
};

