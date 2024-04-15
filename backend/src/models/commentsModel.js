const connection = require('../db/db');

exports.getCommentsByPostId = (postId) => {
	return new Promise((resolve, reject) => {
		connection.query(
			'SELECT * FROM Comments WHERE deleted = false AND postId = ?',
			[postId],
			(error, results) => {
				if (error) {
					reject(error);
				} else {
					resolve(results);
				}
			}
		);
	});
};

exports.createComment = ({ commentData }) => {
	const { postId, content, userId } = commentData;
	return new Promise((resolve, reject) => {
		connection.query(
			'INSERT INTO Comments (postId, content, userId) VALUES (?, ?, ?)',
			[postId, content, userId],
			(error, results) => {
				if (error) {
					reject(error);
				}
				resolve(results);
			}
		);
	});
};

exports.getCommentOwnerId = (id) => {
	return new Promise((resolve, reject) => {
		connection.query(
			'SELECT userId FROM Comments WHERE id = ?',
			[id],
			(error, results) => {
				if (error) {
					reject(error);
				}
				resolve(results);
			}
		);
	});
};

exports.deleteComment = (id) => {
	return new Promise((resolve, reject) => {
		const query = 'UPDATE Comments SET deleted = true WHERE id = ?';
		connection.query(query, [id], (error, result) => {
			if (error) reject(error);
			else resolve(result);
		});
	});
};
