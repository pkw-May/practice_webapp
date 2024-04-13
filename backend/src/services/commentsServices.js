const { getComments } = require('../models/commentsModel');

exports.getComments = async (postId) => {
	try {
		const comments = await getComments({ postId });
		return comments;
	} catch (err) {
		throw new Error(err);
	}
};
