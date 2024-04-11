const connection = require('../db');

exports.getAllUsers = () => {
	return new Promise((resolve, reject) => {
		connection.query('SELECT * FROM User', (error, results) => {
			if (error) reject(error);
			else resolve(results);
		});
	});
};

exports.createUser = (user) => {
	return new Promise((resolve, reject) => {
		const { userId, password } = user;
		const query = `INSERT INTO User (userId, password) VALUES (?, ?)`;
		connection.query(query, [userId, password], (error, result) => {
			if (error) reject(error);
			else resolve(result);
		});
	});
};
