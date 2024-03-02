const express = require('express');
const paymentController = require('../../controllers/payment.controller');

const router = express.Router();

router.route('/process').post(paymentController.processPayment);

module.exports = router;
