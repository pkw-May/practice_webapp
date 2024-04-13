const { getUserById } = require('../models/userModel');

exports.getUserById = async (userId) => {
	try {
		const user = await getUserById({ userId });
		return user;
	} catch (error) {
		throw new Error(error);
	}
};
