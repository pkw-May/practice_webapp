const jwt = require('jsonwebtoken');
const jwkToPem = require('jwk-to-pem');
const axios = require('axios');
const JWT_VERIFY_KEY = process.env.JWT_VERIFY_KEY;
const ISSUER_AWS = process.env.ISSUER_AWS;

exports.verifyCognitoToken = async (token) => {
	const url = JWT_VERIFY_KEY;
	const { data } = await axios.get(url);
	const pems = {};

	data.keys.forEach((key) => {
		pems[key.kid] = jwkToPem({ kty: key.kty, n: key.n, e: key.e });
	});

	const decodedJwt = jwt.decode(token, { complete: true });
	if (!decodedJwt) throw new Error('Invalid token');

	const pem = pems[decodedJwt.header.kid];
	if (!pem) throw new Error('Invalid token');

	return jwt.verify(token, pem, { issuer: ISSUER_AWS });
};
