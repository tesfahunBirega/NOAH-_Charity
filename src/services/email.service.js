const { MAILCHIMP_API_KEY, MAILCHIMP_SERVER_PREFIX } = process.env;
const mailchimp = require('@mailchimp/mailchimp_marketing');
const nodemailer = require('nodemailer');
const config = require('../config/config');
const logger = require('../config/logger');

// const transport = nodemailer.createTransport(config.email.smtp);
/* istanbul ignore next */
// if (config.env !== 'test') {
//   transport
//     .verify()
//     .then(() => logger.info('Connected to email server'))
//     .catch(() => logger.warn('Unable to connect to email server. Make sure you have configured the SMTP options in .env'));
// }

/**
 * Send an email
 * @param {string} to
 * @param {string} subject
 * @param {string} text
 * @returns {Promise}
 */
const sendEmail = async (to, subject, text) => {
  const msg = { from: config.email.from, to, subject, text };
  // await transport.sendMail(msg);
};

/**
 * Send reset password email
 * @param {string} to
 * @param {string} token
 * @returns {Promise}
 */
const sendResetPasswordEmail = async (to, subjectParam, token) => {
  const subject = 'Reset password';
  const resetPasswordUrl = `http://link-to-app/reset-password?token=${token}`;
  const text = `Dear user,
To reset your password, click on this link: ${resetPasswordUrl}
If you did not request any password resets, then ignore this email.`;
  try {
    await sendEmail(to, subject, text);
  } catch (error) {
    throw new Error(`Failed to send reset password email: ${error.message}`);
  }
};

/**
 * Send verification email
 * @param {string} to
 * @param {string} token
 * @returns {Promise}
 */
const sendVerificationEmail = async (to, token) => {
  const subject = 'Email Verification';
  // replace this url with the link to the email verification page of your front-end app
  const verificationEmailUrl = `http://link-to-app/verify-email?token=${token}`;
  const text = `Dear user,
To verify your email, click on this link: ${verificationEmailUrl}
If you did not create an account, then ignore this email.`;
  await sendEmail(to, subject, text);
};

mailchimp.setConfig({
  apiKey: '70a230e765f219d94fe6224399dbafcb-us22',
  server: 'us22',
});

async function sendMailChimp(to, subject, message) {
  // Implement your logic to send emails using Mailchimp API
  try {
    const listId = 'your_mailchimp_list_id_here'; // Replace with your Mailchimp list ID
    const response = await mailchimp.lists.addListMember(listId, {
      email_address: to,
      status: 'subscribed',
      merge_fields: {
        FNAME: 'Subscriber', // You can customize merge fields as per your requirement
        LNAME: '',
      },
    });
    const mailSent = await mailchimp.messages.send({
      to: [{ email: to }],
      subject: subject,
      html: message,
    });
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  // transport,
  sendEmail,
  sendResetPasswordEmail,
  sendVerificationEmail,
  sendMailChimp,
};
