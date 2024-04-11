const connection = require('../db');

exports.getAllPosts = () => {
	return new Promise((resolve, reject) => {
		connection.query('SELECT * FROM Post', (error, result) => {
			if (error) reject(error);
			else resolve(result);
		});
	});
};
