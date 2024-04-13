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

exports.getPostById = ({ postId }) => {
	console.log(postId);
	return new Promise((resolve, reject) => {
		const query = 'SELECT * FROM Posts WHERE id = ?';
		connection.query(query, [postId], (error, result) => {
			if (error) {
				reject(error);
			} else {
				console.log(result);
				resolve(result);
			}
		});
	});
};

exports.createPost = ({ postData }) => {
	const { title, content } = postData;
	return new Promise((resolve, reject) => {
		const query = 'INSERT INTO Posts (title, content) VALUES (?, ?)';
		connection.query(query, [title, content], (error, result) => {
			if (error) reject(error);
			else resolve(result);
		});
	});
};

exports.deletePost = ({ postId }) => {
	return new Promise((resolve, reject) => {
		const query = 'DELETE FROM Posts WHERE id = ?';
		connection.query(query, [postId], (error, result) => {
			if (error) reject(error);
			else resolve(result);
		});
	});
};
