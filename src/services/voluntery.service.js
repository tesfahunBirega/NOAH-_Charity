const httpStatus = require('http-status');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const ApiError = require('../utils/ApiError');
const sortBy = require('../utils/sorter');
const findAll = require('./Plugins/findAll');
const configs = require('../config/config');
const dataSource = require('../utils/createDatabaseConnection');
const { Voluntery } = require('../models');

const volunteryRepository = dataSource.getRepository(Voluntery).extend({
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

const createvoluntery = async ({ name, description }) => {
  // Create a new post object with the provided details
  const Voluntery = await volunteryRepository.create({ name, description });

  // Save the post to the database
  return volunteryRepository.save(Voluntery);
};

const getAllVoluntery = async () => {
  return volunteryRepository.find();
};
/**
 * Delete user by id
 * @param {ObjectId} postId
 * @returns {Promise<User>}
 */

const getVolunteryById = async (id) => {
  return postRepository.findOneBy({ id });
};
const updateVolunteryById = async (feedbackId, updateBody) => {
  const feedback = await getPostById(feedbackId);
  if (!feedback) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Feedback not found');
  }
  const updateResult = await postRepository.update({ id: feedbackId }, updateBody);
  console.log(updateResult, 'updateResult');
  const updatedFeedback = await getPostById(feedbackId);
  return { updatedFeedback };
};

module.exports = {
  createvoluntery,
  getVolunteryById,
  getAllVoluntery,
  updateVolunteryById,
};
