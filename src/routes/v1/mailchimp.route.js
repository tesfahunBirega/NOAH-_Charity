const express = require('express');
const { emailController } = require('../../controllers');
const router = express.Router();

router.route('/send-newsletter').post(emailController.sendNewsletter);

module.exports = router;
