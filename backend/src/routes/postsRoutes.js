const express = require('express');
const router = express.Router();
const postsController = require('../controllers/postsController');
const { verifyToken } = require('../middleware/verifyToken');

router.get('', postsController.getPost);
router.post('', verifyToken, postsController.createPost);
// router.delete('', verifyToken, postsController.deletePost);

module.exports = router;
