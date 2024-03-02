const paymentService = require('../services/payment.service');
const catchAsync = require('../utils/catchAsync');

const processPayment = catchAsync(async (req, res) => {
  try {
    const paymentIntent = await paymentService.processStripePayment(req.body);
    res.status(200).json({ success: true, clientSecret: paymentIntent.client_secret });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = {
  processPayment,
};
