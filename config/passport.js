var passport = require('passport')
var LocalStrategy = require('passport-local').Strategy
var JwtStrategy = require('passport-jwt').Strategy

var EXPIRATION = 60 * 24

// TODO: keep in seperate config file
// var SECRET = process.env.secret
// var ISSUER = process.env.issuer
// var AUDIENCE = process.env.audience

var SECRET = 'tNWS6MTXrYc5J97nXD'
var ISSUER = 'Issuer Name'
var AUDIENCE = 'sitename.com'

// Configure local Strategy for Passport
var LOCAL_STRATEGY_CONFIG = {
	usernameField: 'email',
	passwordField: 'password',
	passReqToCallback: false
}

// Configure JWT Strategy for Passport
var JWT_STRATEGY_CONFIG = {
	secretOrKey: SECRET,
	issuer: ISSUER,
	audience: AUDIENCE,
    authScheme: 'Bearer:',
	passReqToCallback: false
}

// handlers for passport authentication

function handleLocalStrategy(email, password, next) {
	User.findOne({
			email: email
		})
		.exec(function(error, user) {
			if (error) return next(error, false, {})

			if (!user) return next(null, false, {
				code: 'E_USER_NOT_FOUND',
				message: email + ' is not found'
			})

			console.log(EncryptionService.comparePassword(password, user.password), password, user.password)

			if (!EncryptionService.comparePassword(password, user.password))
				return next(null, false, {
					code: 'E_WRONG_CREDENTIALS',
					message: 'Email/Password was wrong'
				})

			return next(null, user, {})
		})
}

function handleJwtStrategyAuth(payload, next) {
	var user = payload.user;
	return next(null, user, {})
}

passport.use(new LocalStrategy(LOCAL_STRATEGY_CONFIG, handleLocalStrategy))
passport.use(new JwtStrategy(JWT_STRATEGY_CONFIG, handleJwtStrategyAuth))

module.exports.jwtSettings = {
	expiresIn: EXPIRATION,
	secret: SECRET,
	algorithm: 'HS256',
	issuer: ISSUER,
	audience: AUDIENCE
}
