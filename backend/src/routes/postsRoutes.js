const express = require('express');
const router = express.Router();
const postsController = require('../controllers/postsController');
const verifyToken = require('../middleware/veryfiToken');

router.get('', postsController.getPosts);
router.post('', verifyToken, postsController.createPost);
router.delete('/:postId', verifyToken, postsController.deletePost);

module.exports = router;
