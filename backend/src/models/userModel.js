const connection = require('../db/db');

exports.checkEmailExists = ({ email }) => {
	return new Promise((resolve, reject) => {
		connection.query(
			'SELECT * FROM Users WHERE email = ?',
			[email],
			(error, results) => {
				if (error) {
					reject(error);
				} else if (results.length > 0) {
					resolve(true);
				} else {
					resolve(false);
				}
			}
		);
	});
};

exports.getAllUsers = () => {
	return new Promise((resolve, reject) => {
		connection.query('SELECT * FROM Users', (error, results) => {
			if (error) reject(error);
			else resolve(results);
		});
	});
};

exports.createUser = ({ userData }) => {
	console.log('server: model signup, userData: ', userData);
	const { email, oauthId } = userData;

	return new Promise((resolve, reject) => {
		const name = email.substring(0, email.indexOf('@'));
		const query =
			'INSERT INTO Users (name, email, oauthId, deleted) VALUES (?, ?, ?, false)';
		connection.query(query, [name, email, oauthId], (error, result, fields) => {
			if (error) {
				console.error(error);
				reject(error);
			} else {
				resolve({ success: true, id: result.insertId, ...result });
			}
		});
	});
};

exports.getUserById = ({ userId }) => {
	return new Promise((resolve, reject) => {
		const query = 'SELECT * FROM Users WHERE id = ?';
		connection.query(query, [userId], (error, results) => {
			if (error) reject(error);
			else resolve(results);
		});
	});
};
