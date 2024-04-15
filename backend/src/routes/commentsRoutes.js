const express = require('express');
const router = express.Router();
const commentsController = require('../controllers/commentsController');
const { verifyToken } = require('../middleware/verifyToken');

router.get('', commentsController.getCommentsByPostId);
router.post('', verifyToken, commentsController.createComment);
// router.delete('', verifyToken, commentsController.deleteComment);

module.exports = router;
