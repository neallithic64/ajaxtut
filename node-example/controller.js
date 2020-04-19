

postLogin: function(req, res) {
	var email = req.body.email;
	var pass = req.body.password;
	
	model.findOne({email: email, password: pass}, function(err, match) {
		/* list of errors:
			1. server error
			2. NO users found with that email-pass combo
			3. more validations: email format, may email ba?, may password ba?
			ELSE, log in the user.
		*/
		
		if (err) { // #1
			// experimental, not sure if sending 2 params to AJAX will work!
			res.send(500, 'Server error! ' + err);
			// res.send('Server error!');
		}
		
		else if (!match) { // #2
			res.send(401, 'No users found with that email/password!');
		}
		
		else { // ELSE
			req.session.user = match;
			res.send(200, 'Success!');
		}
		
	});
}

