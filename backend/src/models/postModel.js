const connection = require('../db/db');

exports.getAllPosts = () => {
	return new Promise((resolve, reject) => {
		connection.query('SELECT * FROM Posts', (error, result) => {
			if (error) {
				reject(error);
			} else {
				resolve(result);
			}
		});
	});
};

exports.getPostById = ({ id }) => {
	return new Promise((resolve, reject) => {
		const query = 'SELECT * FROM Posts WHERE id = ?';
		connection.query(query, [id], (error, result) => {
			if (error) {
				reject(error);
			} else {
				resolve(result);
			}
		});
	});
};

exports.createPost = ({ postData }) => {
	const { title, content, userId } = postData;
	return new Promise((resolve, reject) => {
		const query = 'INSERT INTO Posts (title, content, userId) VALUES (?, ?, ?)';
		connection.query(query, [title, content, userId], (error, result) => {
			if (error) reject(error);
			else resolve(result);
		});
	});
};

exports.deletePost = ({ id }) => {
	return new Promise((resolve, reject) => {
		const query = 'DELETE FROM Posts WHERE id = ?';
		connection.query(query, [id], (error, result) => {
			if (error) reject(error);
			else resolve(result);
		});
	});
};
