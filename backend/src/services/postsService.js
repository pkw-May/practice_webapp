const {
	getAllPosts,
	getPostById,
	createPost,
	deletePost,
} = require('../models/postModel');
const { getUserById } = require('../models/userModel');

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
		post[0].date = new Date(post[0].date)
			.toLocaleDateString('ko-KR')
			.split('T')[0];

		const userInfo = await getUserById({ userId: post[0].userId });
		post[0].name = userInfo[0].name;

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
