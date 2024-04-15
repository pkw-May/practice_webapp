const postService = require('../services/postsService');

exports.getPosts = async (req, res) => {
	try {
		const postId = req.query.id;
		if (!postId) {
			const posts = await postService.getPosts();
			res.status(200).json(posts);
		} else {
			const post = await postService.getPostById({ postId });
			res.status(200).json(post);
		}
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

exports.createPost = async (req, res) => {
	try {
		const postData = req.body;
		const post = await postService.createPost(postData);
		res.status(201).json(post);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

exports.deletePost = async (req, res) => {
	try {
		const postId = req.params?.postId;
		if (!postId) {
			res.status(400).json({ message: 'postId is required' });
		} else {
			const post = await postService.deletePost(postId);
			res.status(200).json(post);
		}
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};
