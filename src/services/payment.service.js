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
              images: ['https://ngh1.org/assets/IMG-20240223-WA0001(1).jpg'],
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
    const reg = registerDonation(amount);
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
module.exports = {
  processStripePayment,
  getBalance,
};
