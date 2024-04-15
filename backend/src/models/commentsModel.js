const connection = require('../db/db');

exports.getCommentsByPostId = ({ postId }) => {
	return new Promise((resolve, reject) => {
		connection.query(
			'SELECT * FROM Comments WHERE postId = ?',
			[postId],
			(error, results) => {
				if (error) {
					reject(error);
				}
				resolve(results);
			}
		);
	});
};

// exports.createComment = ({ postData }) => {
// 	const { title, content } = postData;
// 	return new Promise((resolve, reject) => {
// 		const query = 'INSERT INTO Posts (title, content) VALUES (?, ?)';
// 		connection.query(query, [title, content], (error, result) => {
// 			if (error) reject(error);
// 			else resolve(result);
// 		});
// 	});
// };

// exports.deleteComment = ({ postId }) => {
// 	return new Promise((resolve, reject) => {
// 		const query = 'DELETE FROM Posts WHERE id = ?';
// 		connection.query(query, [postId], (error, result) => {
// 			if (error) reject(error);
// 			else resolve(result);
// 		});
// 	});
// };
