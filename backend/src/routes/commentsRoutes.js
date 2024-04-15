const express = require('express');
const router = express.Router();
const commentsController = require('../controllers/commentsController');
const verifyToken = require('../middleware/veryfiToken');

router.get('', commentsController.getComments);
router.post('', verifyToken, commentsController.createComment);
router.delete('', verifyToken, commentsController.deleteComment);

module.exports = router;
