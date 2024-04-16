const authService = require('../services/authService');

exports.checkEmailExists = async (req, res) => {
	const { email } = req.query;
	try {
		const isExist = await authService.checkEmailExists(email);
		res.status(200).json({ isExist });
	} catch (err) {
		res.status(400).json({ error: err.message });
	}
};

exports.signup = async (req, res) => {
	const { userData } = req.body;
	try {
		const user = await authService.signup(userData);
		res.status(201).json(user);
	} catch (err) {
		res.status(400).json({ error: err.message });
	}
};
