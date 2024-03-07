const stripe = require('stripe')(require('../config/paymentConfig').stripeApiKey);

const processStripePayment = async (paymentData) => {
  try {
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: 'Donate',
              description: 'sample',
              images: ['https://ngh1.org/assets/ElderlyEt-aoA5sfie.jpg'],
            },
            unit_amount: paymentData.donation_ammount,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: 'http://localhost:4242/success',
      cancel_url: 'http://localhost:4242/cancel',
    });
    return session;
  } catch (error) {
    throw new Error(error.message);
  }
};
module.exports = {
  processStripePayment,
};
