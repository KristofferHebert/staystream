var passport = require('passport')

module.exports = function(req, res, next) {

	passport.authenticate('jwt', function(error, user, info) {

		if (error) return res.serverError(error)
		if (!user) return res.unauthorized(null, info && info.code, info && info.message)

		req.body.owner = user.id
		next()

	})(req, res)
}
