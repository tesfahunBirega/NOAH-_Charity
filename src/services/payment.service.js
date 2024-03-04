const stripe = require('stripe')(require('../config/paymentConfig').stripeApiKey);

const processStripePayment = async (paymentData) => {
  try {
    // const token = await stripe.tokens.create({
    //   card: {
    //     number: '4242424242424242',
    //     exp_month: 12,
    //     exp_year: 2023,
    //     cvc: '123',
    //   },
    // });
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: 'T-shirt',
            },
            unit_amount: paymentData.donation_ammount,
          },
          quantity: 1,
        },
      ],
      // allow_custom: true,
      mode: 'payment',
      // images: ['https://yourwebsite.com/logo.png'],
      success_url: 'http://localhost:4242/success',
      cancel_url: 'http://localhost:4242/cancel',
    });
    // const paymentIntent = await stripe.paymentIntents.create({
    //   amount: paymentData.amount,
    //   currency: paymentData.currency,
    //   description: paymentData.description,
    //   payment_method: paymentData.payment_method,
    // });
    return session;
  } catch (error) {
    throw new Error(error.message);
  }
};
module.exports = {
  processStripePayment,
};
