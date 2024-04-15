const {
	getCommentsByPostId,
	createComment,
} = require('../models/commentsModel');
const { getUserById, getUserByOAuthId } = require('../models/userModel');

exports.getCommentsByPostId = async (postId) => {
	try {
		const comments = await getCommentsByPostId(postId.postId);
		// forEach나 map 함수는 async-await와 함께 사용할 수 없음.
		// 비동기를 기다려주지 않는 애들임
		for (const comment of comments) {
			const userInfo = await getUserById({ userId: comment.userId });
			comment.name = userInfo[0].name;
		}
		return comments;
	} catch (err) {
		throw new Error(err);
	}
};

exports.createComment = async (req, commentData) => {
	try {
		const oauthId = req.user.sub;
		const userInfo = await getUserByOAuthId({ oauthId });
		commentData.userId = userInfo[0].id;

		const comment = await createComment({ commentData });
		return comment;
	} catch (err) {
		throw new Error(err);
	}
};
