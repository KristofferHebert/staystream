var sendgrid = require('sendgrid')(sails.config.sendgrid_api)

module.exports = {
	sendResetPasswordEmail: function(email, cb) {
        var message  = "Hello," +

        "Sorry to hear your password has gone missing!(It happens to the best of us.)" +
        "Here is a link to reset it: ..." +

        "Thanks!" +
        "The Staystream Team"

        var payload = {
			to: email,
			from: 'noreply@staystream.com',
			subject: 'Password reset for staystream.com',
			text: message
		}

		sendgrid.send(payload, function(err, json) {
			if (err) {
				cb(err, null)
			}
			cb(null, json)
		})
	}
}
