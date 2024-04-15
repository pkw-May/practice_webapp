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
		const id = req.params?.id;
		if (!id) {
			res.status(400).json({ message: 'comment id is required' });
		} else {
			const comment = await commentService.deleteComment(req, id);
			if (!comment) {
				res.status(403).json({ message: '삭제 권한이 없는 사용자입니다.' });
			} else {
				res.status(200).json(comment);
			}
		}
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};
