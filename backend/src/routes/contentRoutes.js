const express = require('express');
const router = express.Router();
const contentController = require('../controllers/contentsController');
const verifyToken = require('../middleware/verifyToken');

router.get('/contents', verifyToken, contentController.getContent);

module.exports = router;
