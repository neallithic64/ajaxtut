/*
	Welcome! AJAX is a very useful tool in Web Application Development and User Experience. AJAX stands
	for Asynchronous Javascript And XML, which is how this entire framework... well... works. It uses
	Javascript and XML to communicate with a server asynchronously, so that the web page will update in
	response to user actions without refreshing the page.
	
	Okay that's cool and all, but how do you use it? Well, let's see an example: reading from a JSON
	file for data and loading it to the page.
*/


// Global variable of the URL where my JSON file is hosted. I'd use the data.json file, but I can't make
// GET or POST requests to a local file, since it doesn't have an API (usually only servers have one).
var url = "http://www.json-generator.com/api/json/get/bUYOgvpDjC?indent=2";


/* Here's one way to submit AJAX requests using the 
*/
function sendHttpRequest() {
	var xhr = new XMLHttpRequest();
	xhr.open('GET', url, true);
	xhr.setRequestHeader("Content-Type", "application/json");

	xhr.onreadystatechange = function() {
		if (xhr.status === 200 && xhr.readyState === 4) {
			alert('Data received');
			// blah blah blah
			// $('select#ids').append( S T U F F );
		}
	};
	xhr.send();
}
/* Looks complicated, right? Usually these are used for much more complicated server processes, but
	forget about that. What's nice is that the jQuery library already has AJAX integrated in it, so
	you get all the benefits of AJAX with less complications. An example is given below.
*/



// We begin by making the usual $(document).ready() function using jQuery.
$(document).ready(function() {
	/* Inside, we load up the JSON file using AJAX! Notice the usual $ notation? AJAX is actually
		part of jQuery, so you can easily make use of it through there. Below, I used $.getJSON().
		That's just a quick way to retrieve data from a JSON file using AJAX.
	*/ 
	$.getJSON(url, function(data) {
		// For each element "data" in the array returned by the request, put the id as an option
		// in the dropdown.
		data.forEach(function(elem) {
			$('select#ids').append('<option>' + elem._id + '</option>');
		});
	});
	
	/* This is the full version of the above AJAX call. Functionably, they do the same thing, but
		$.ajax() is used for wider uses, like working with .txt files, or databases. *wink wink*
	*/
	$.ajax({dataType: "json", url: url, success: function(data) {
			// function logic here!
		}
	});
	
	// Here, I get that JSON file again to retrieve data from it and make a query.
//	$('button#submit').click(function() { // use the button as a submit button
	$('select#ids').change(function() { // when the dropdown menu is updated, rerender
		$('table#userdeets').empty();
		var query = $('select#ids').val(); // Get the id the user selected in the dropdown.
		
		// Make the same query to the JSON file similar to earlier...
		$.getJSON(url, function(data) {
			
			// Filter through the array to find the user data that corresponds to the id submitted...
			var user = data.find(function(elem) {
				return elem._id === query;
			});
			
			// Convert the user object to an array of its attributes.
			var keys = Object.keys(user);
			
			/* Make a table of the user's details. For each attribute (key-value pair), make a
				table row and put the attribute name (key) and its value (user[key]).
			*/
			keys.forEach(function(key) {
				$('table#userdeets').append("<tr><td>" + key + "</td><td>" + user[key] + "</td></tr>");
			});
		});
	});
});

/* Of course, there's more to AJAX than just making requests to JSON or text files. You can apply
	this in MongoDB servers by making a query using Mongoose. Below is a sample I've made before.
	It makes a GET request to my Node.js server.
	Goes to the /checkEmail URL (1st parameter) and passes a query for the email (2nd parameter).
	The 3rd parameter defines the behaviour of when the server completes the request and returns
	the resulting data to the client. The data is stored inside "result".


$.get('/checkEmail', {email: emailIn}, function(result) { // result is bool
	if(result) { // if result is true, either NOT email or EXISTING user
		$('#email').css('border-color', 'red');
		$('#regSub').prop('disabled', true);
	} else {
		$('#email').css('border-color', '#dfe7f1');
		$('#regSub').prop('disabled', false);
	}
});


	That's not to say that you can also do POST requests using AJAX! You may access it through the
	use of $.post(). What's nice is that there's a whole lot of documentation when it comes to AJAX
	because the folks over a jQuery did a lot of work into making it.
	You can find it here:
		- https://api.jquery.com/jquery.get/
		- https://api.jquery.com/jquery.post/
		- https://api.jquery.com/jquery.ajax/
	
	And that should be all of it! This is a very simple tutorial, but there's a whole lot of work that
	can be done with AJAX, jQuery, and Node.js. If you have any questions, feel free to ask me. Have fun!
*/



// Neal