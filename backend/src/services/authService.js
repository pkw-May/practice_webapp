const { createUser, checkEmailExists } = require('../models/userModel');

exports.checkEmailExists = async (email) => {
	try {
		const isExist = await checkEmailExists({ email });
		return isExist;
	} catch (err) {
		throw new Error(err);
	}
};

exports.signup = async (userData) => {
	try {
		const user = await createUser({ userData });
		return user;
	} catch (err) {
		throw new Error(err);
	}
};

exports.signin = async (userId) => {
	try {
		const user = await addUserId({ userId });
		return user;
	} catch (err) {
		throw new Error(err);
	}
};
