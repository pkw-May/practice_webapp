const {
	getAllPosts,
	getPostById,
	createPost,
	deletePost,
} = require('../models/postModel');
const { getUserById, getUserByOAuthId } = require('../models/userModel');

exports.getAllPosts = async () => {
	try {
		const posts = await getAllPosts();
		return posts;
	} catch (error) {
		throw new Error(error);
	}
};

exports.getPostById = async (id) => {
	try {
		const post = await getPostById(id);
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

exports.createPost = async (req, postData) => {
	try {
		const oauthId = req.user.sub;
		const userInfo = await getUserByOAuthId({ oauthId });
		postData.userId = userInfo[0].id;

		const post = await createPost({ postData });
		return post;
	} catch (error) {
		throw new Error(error);
	}
};

exports.deletePost = async (id) => {
	try {
		const post = await deletePost(id);
		return post;
	} catch (error) {
		throw new Error(error);
	}
};
