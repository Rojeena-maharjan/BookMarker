// Listen for form submit

document.getElementById('myForm').addEventListener('submit',saveBookmark);
//save bookmark
function saveBookmark(e)
{
	//Get form values
	var siteName = document.getElementById('siteName').value;
	var siteURL = document.getElementById('siteURL').value;
	if(!validateForm(siteName,siteURL))
	{
		return false;
	}

	var bookmark = {
		name : siteName,
		url : siteURL
	}



	//Local storage test
/*
	localStorage.setItem('test','Hello World');
	console.log(localStorage.getItem('test'));
	localStorage.removeItem('test');
	console.log(localStorage.getItem('test'));*/


	if(localStorage.getItem('bookmarks')=== null)
	{
		//intialize array
		var bookmarks = [];
		//Add to array
		bookmarks.push(bookmark);
		//set to local storage
		localStorage.setItem('bookmarks',JSON.stringify(bookmarks));

	}
	else
	{
		//fetch from local storage
		var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
		//add bookmark to array
		bookmarks.push(bookmark);
		//set to local storege
		localStorage.setItem('bookmarks',JSON.stringify(bookmarks));

	}

	//reset
	document.getElementById('myForm').reset();

	//fetch
	fetchBookmarks();
	
	//Prevent form from submitting
	e.preventDefault();
}

//delete bookmark

function deleteBookmark(url)
{
	//get booksmarks from local storage
	console.log(url);
	var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
	
	for(var i=0;i<bookmarks.length; i++)
	{
		if(bookmarks[i].url == url)
		{
			//remove from array
			bookmarks.splice(i,1);
		}
	}

	localStorage.setItem('bookmarks',JSON.stringify(bookmarks));

	fetchBookmarks();
}

	//fetch bookamrks

	function fetchBookmarks()
	{
		var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
		

		
		//get output id 

		var bookmarksResults = document.getElementById('bookmarksResults');

		bookmarksResults.innerHTML = ' ';

		for(var i=0;i<bookmarks.length;i++)
		{
			var name = bookmarks[i].name;
			var url = bookmarks[i].url;

			bookmarksResults.innerHTML += '<div class="well">'+
										   '<h3>'+name +
										   ' <a class="btn btn-default" target="_blank" href="'+url+'">Visit</a>'+
										   ' <a onclick="deleteBookmark(\''+url+'\')" class="btn btn-danger"  href="#">Delete</a>'
										   +'</h3>'
										   +'</div>';

		}
	}
function validateForm(siteName,siteURL)
{

	if(!siteName || !siteName)
	{
		alert('Please fill in the form');
		return false;
	}

	var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
	var regex = new RegExp(expression);

	if(!siteURL.match(regex))
	{
		alert('Please enter a valid url');
		return false;
	}

	return true;

}