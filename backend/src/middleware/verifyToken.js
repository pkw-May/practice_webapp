const jwt = require('jsonwebtoken');
const {
	verifyCognitoToken,
} = require('../services/authPlatforms/awsCognitoService');
// const verifyGoogleToken = require('../services/authPlatforms/googleOAuthService');

exports.verifyToken = async (req, res, next) => {
	try {
		const token = req.headers.authorization.split(' ')[1];
		const decoded = jwt.decode(token, { complete: true });
		const issuer = decoded.payload.iss;

		if (issuer.includes('cognito')) {
			const user = await verifyCognitoToken(token);
			req.user = user;
			next();
		} else {
			const error = new Error('Unsupported Issuer');
			error.status = 403;
			next(error);
		}
	} catch (err) {
		console.error(err);
		next(err);
	}
};
