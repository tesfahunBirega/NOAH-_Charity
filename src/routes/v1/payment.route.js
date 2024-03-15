const express = require('express');
const paymentController = require('../../controllers/payment.controller');

const router = express.Router();

router.route('/process').post(paymentController.processPayment);
router.route('/balance').get(paymentController.getBalance);

module.exports = router;
