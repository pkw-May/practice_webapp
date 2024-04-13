const {
	getAllPosts,
	getPostById,
	createPost,
	deletePost,
} = require('../models/postModel');

exports.getPosts = async () => {
	try {
		const posts = await getAllPosts();
		return posts;
	} catch (error) {
		throw new Error(error);
	}
};

exports.getPostById = async (postId) => {
	try {
		const post = await getPostById(postId);
		return post;
	} catch (error) {
		throw new Error(error);
	}
};

exports.createPost = async (postData) => {
	try {
		const post = await createPost({ postData });
		return post;
	} catch (error) {
		throw new Error(error);
	}
};

exports.deletePost = async (postId) => {
	try {
		const post = await deletePost(postId);
		return post;
	} catch (error) {
		throw new Error(error);
	}
};
