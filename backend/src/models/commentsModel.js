const connection = require('../db/db');

exports.getCommentsByPostId = (postId) => {
	return new Promise((resolve, reject) => {
		connection.query(
			'SELECT * FROM Comments WHERE postId = ?',
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
