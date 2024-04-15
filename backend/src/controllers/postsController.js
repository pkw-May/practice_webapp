const postService = require('../services/postService');

exports.getPost = async (req, res) => {
	try {
		const id = req.query.id;
		if (!id) {
			const posts = await postService.getAllPosts();
			res.status(200).json(posts);
		} else {
			const post = await postService.getPostById({ id });
			res.status(200).json(post);
		}
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

exports.createPost = async (req, res) => {
	try {
		const postData = req.body;
		const newPost = await postService.createPost(req, postData);
		res.status(201).json(newPost);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

exports.deletePost = async (req, res) => {
	try {
		const id = req.params?.id;
		if (!id) {
			res.status(400).json({ message: 'postId is required' });
		} else {
			const post = await postService.deletePost({ id });
			res.status(200).json(post);
		}
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};
