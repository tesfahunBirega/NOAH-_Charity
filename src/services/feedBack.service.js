const httpStatus = require('http-status');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const ApiError = require('../utils/ApiError');
const sortBy = require('../utils/sorter');
const findAll = require('./Plugins/findAll');
const configs = require('../config/config');
const dataSource = require('../utils/createDatabaseConnection');
const { FeedBack } = require('../models');
const { getConnection } = require('typeorm');

const feedBackRepository = dataSource.getRepository(FeedBack).extend({
  findAll,
  sortBy,
});
// .extend({ sortBy });
//

/**
 * Create a user
 * @param {Object} userBody
 * @returns {Promise<Post>}
 */

const createfeedback = async (ReqBody) => {
  // Generate a salt
  console.log(ReqBody, 'FeedBack data');
  const doc = feedBackRepository.create(ReqBody);
  return userRepository.save(doc);
};

const getAllFeedBack = async () => {
  return feedBackRepository.find();
};
/**
 * Delete user by id
 * @param {ObjectId} postId
 * @returns {Promise<User>}
 */

const getFeedbackById = async (id) => {
  return feedBackRepository.findOneBy({ id });
};
const updateFeedbackById = async (feedbackId, updateBody) => {
  const feedback = await getFeedbackById(feedbackId);
  if (!feedback) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Feedback not found');
  }
  const updateResult = await feedBackRepository.update({ id: feedbackId }, updateBody);
  console.log(updateResult, 'updateResult');
  const updatedFeedback = await getFeedbackById(feedbackId);
  return { updatedFeedback };
};

module.exports = {
  createfeedback,
  getAllFeedBack,
  updateFeedbackById,
};
