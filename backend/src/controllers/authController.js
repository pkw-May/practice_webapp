const authService = require('../services/authService');

exports.register = async (req, res) => {
	const { userId, password } = req.body;
	try {
		const user = await authService.register(userId, password);
		res.status(201).json(user);
	} catch (err) {
		res.status(400).json({ error: err.message });
	}
};

exports.signin = async (req, res) => {
	const { userId, password } = req.body;
	try {
		const tokens = await authService.signin(userId, password);
		req.json(tokens);
	} catch (err) {
		res.status(401).json({ error: err.message });
	}
};
