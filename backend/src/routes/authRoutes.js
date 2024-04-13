const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

console.log('server: authRoutes');

router.get('/checkEmail', authController.checkEmailExists);
router.post('/signup', authController.signup);
router.post('/signin', authController.signin);

module.exports = router;
