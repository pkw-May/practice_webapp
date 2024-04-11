const jwt = require('jsonwebtoken');

function verifyToken(req, res, next) {
	// Bearer 분리
	const token = req.headers.authorizarion.split(' ')[1];
	const decoded = jwt.decode(token, { complete: true });
	const issuer = decoded.payload.iss;

	if (issuer.includes('cognito')) {
		verifyCognitoToken(token, (err, result) => {
			if (err) {
				return res.status(403).json({ meesage: 'Auth Failed' });
			}
			req.user = result;
			next();
		});
	} else if (issuer.includes('google')) {
		verifyGoogleToken(token, (err, result) => {
			if (err) {
				return res.status(403).json({ message: 'Auth Failed' });
			}
			req.user = result;
			next();
		});
	} else {
		return res.status(403).json({ message: 'Anonymous Issuer' });
	}
}

function verifyCognitoToken(token, callback) {}

function verifyGoogleToken(token, callback) {}

module.exports = verifyToken;
