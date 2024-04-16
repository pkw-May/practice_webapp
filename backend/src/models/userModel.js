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

exports.getUserById = ({ userId }) => {
	return new Promise((resolve, reject) => {
		const query = 'SELECT * FROM Users WHERE id = ?';
		connection.query(query, [userId], (error, results) => {
			if (error) reject(error);
			else resolve(results);
		});
	});
};

exports.getUserByOAuthId = ({ oauthId }) => {
	return new Promise((resolve, reject) => {
		const query = 'SELECT * FROM Users WHERE oauthId = ?';
		connection.query(query, [oauthId], (error, results) => {
			if (error) reject(error);
			else resolve(results);
		});
	});
};

exports.createUser = ({ userData }) => {
	const { email, oauthId } = userData;

	return new Promise((resolve, reject) => {
		const name = email.substring(0, email.indexOf('@'));
		const colorCode = Math.floor(Math.random() * 16777215).toString(16);
		const query =
			'INSERT INTO Users (name, colorCode, email, oauthId, deleted) VALUES (?, ?, ?, ?, false)';
		connection.query(
			query,
			[name, colorCode, email, oauthId],
			(error, result, fields) => {
				if (error) {
					console.error(error);
					reject(error);
				} else {
					resolve({ success: true, id: result.insertId, ...result });
				}
			}
		);
	});
};
