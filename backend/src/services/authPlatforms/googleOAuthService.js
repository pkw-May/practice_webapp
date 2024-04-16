// const { OAuth2Client } = require('google-auth-library');
// const CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
// const client = new OAuth2Client(CLIENT_ID);

// exports.verifyGoogleToken = async (token) => {
// 	const ticket = await client.verifyIdToken({
// 		idToken: token,
// 		audience: CLIENT_ID, // Specify the CLIENT_ID of the app that accesses the backend
// 	});
// 	const payload = ticket.getPayload();
// 	return payload;
// };
