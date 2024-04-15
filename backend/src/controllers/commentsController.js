const commentService = require('../services/commentService');

exports.getCommentsByPostId = async (req, res) => {
	try {
		const postId = req.query.postId;
		if (!postId) {
			res.status(200).json([]);
		} else {
			const comments = await commentService.getCommentsByPostId({ postId });
			res.status(200).json(comments);
		}
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

exports.createComment = async (req, res) => {
	try {
		const commentData = req.body;
		const comment = await commentService.createComment(req, commentData);
		res.status(201).json(comment);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

exports.deleteComment = async (req, res) => {
	try {
		const commentId = req.params?.id;
		if (!commentId) {
			res.status(400).json({ message: 'commentId is required' });
		} else {
			const comment = await commentService.deleteComment(commentId);
			res.status(200).json(comment);
		}
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};
