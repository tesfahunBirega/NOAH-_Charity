const stripe = require('stripe')(require('../config/paymentConfig').stripeApiKey);
const { Donation } = require('../models');
const dataSource = require('../utils/createDatabaseConnection');

const donationRepository = dataSource.getRepository(Donation);

const registerDonation = async (amount1) => {
  try {
    const amount = amount1 / 100;
    Donation.amount = amount;
    const register = donationRepository.create(Donation);
    const result = await donationRepository.save(register);
    return result;
  } catch (error) {
    throw new Error(error.message);
  }
};

const processStripePayment = async (paymentData) => {
  try {
    const amount = paymentData.donation_ammount * 100;
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: 'Donate',
              description:
                'Your donation will help us continue improving the lives of internally displaced persons in Ethiopia.',
              images: ['https://ngh1.org/assets/logo-485d8758.png'],
            },
            unit_amount: amount,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: 'http://localhost:3000/success',
      cancel_url: 'http://localhost:3000/cancel',
    });
    return session;
  } catch (error) {
    throw new Error(error.message);
  }
};

const processStripeSubscription = async (subsciptionData) => {
  let priceID;
  try {
    const amount = subsciptionData.subscription_ammount * 100;
    switch (amount) {
      case 5000:
        priceID = 'price_1Ow0n7HGaAONVQkK8L1WEZf8';
        break;
      case 10000:
        priceID = 'price_1Ow1ntHGaAONVQkKtWwnXn66';
        break;
      case 20000:
        priceID = 'price_1Ow1ntHGaAONVQkKLUhWUPTa';
        break;
      case 25000:
        priceID = 'price_1Ow1ntHGaAONVQkKRiGUtGkA';
        break;
      case 50000:
        priceID = 'price_1Ow1ntHGaAONVQkKEuRJ3OE7';
        break;
      default:
        try {
          const newPrice = await stripe.prices.create({
            unit_amount: amount, // Replace with the price in cents (e.g., $10.00)
            currency: 'usd', // Replace with the currency of the price
            recurring: {
              interval: 'month', // Specify the interval of the subscription (e.g., 'month', 'year')
            },
            product: 'prod_PlXsWOsJh53OH3', // Specify the ID of the product you created
          });
          priceID = newPrice.id; // Assign the ID of the newly created price
        } catch (error) {
          throw new Error(error.message);
        }
        break;
    }

    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price: priceID,
          quantity: 1,
        },
      ],
      mode: 'subscription',
      success_url: 'http://localhost:3000/success',
      cancel_url: 'http://localhost:3000/cancel',
    });
    return session;
  } catch (error) {
    throw new Error(error.message);
  }
};
const getBalance = async () => {
  try {
    const result = await donationRepository.find();
    return result;
  } catch (error) {
    throw new Error(error.message);
  }
};

const webhook = async (requestData) => {
  try {
    const event = requestData.body;

    const signature = requestData.headers['stripe-signature'];
    const webhookSecret = 'whsec_Mwr1jO0NuQUnxqHmTJexkeao0HLq1Qdi'; // Replace with your webhook secret key
    const eventVerified = stripe.webhooks.constructEvent(requestData.rawBody, signature, webhookSecret);
    switch (eventVerified.type) {
      // case 'checkout.session.async_payment_succeeded':
      //   const checkoutSessionAsyncPaymentSucceeded = event.data.object;
      //   // Then define and call a function to handle the event checkout.session.async_payment_succeeded
      //   break;
      case 'checkout.session.completed':
        // eslint-disable-next-line no-case-declarations
        const checkoutSessionCompleted = event.data.object;
        // Then define and call a function to handle the event checkout.session.completed
        if (checkoutSessionCompleted) {
          const register = registerDonation(event.data.object);
          return register;
        }
        break;
      case 'customer.subscription.created':
        // eslint-disable-next-line no-case-declarations
        const customerSubscriptionCreated = event.data.object;
        // Then define and call a function to handle the event customer.subscription.created
        if (customerSubscriptionCreated) {
          const register = registerDonation(event.data.object);
          return register;
        }
        break;
      default:
        return 'The payment did not go through';
    }
  } catch (error) {
    throw new Error(error.message);
  }
};
module.exports = {
  processStripePayment,
  getBalance,
  processStripeSubscription,
  registerDonation,
  webhook,
};
