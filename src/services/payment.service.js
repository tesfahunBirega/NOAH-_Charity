const stripe = require('stripe')(require('../config/paymentConfig').stripeApiKey);

const processStripePayment = async (paymentData) => {
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: paymentData.amount,
      currency: paymentData.currency,
      description: paymentData.description,
      payment_method: paymentData.payment_method,
      confirm: true,
    });
    return paymentIntent;
  } catch (error) {
    throw new Error(error.message);
  }
};
module.exports = {
  processStripePayment,
};
