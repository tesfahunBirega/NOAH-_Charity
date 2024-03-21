const httpStatus = require('http-status');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const ApiError = require('../utils/ApiError');
const sortBy = require('../utils/sorter');
const findAll = require('./Plugins/findAll');
const configs = require('../config/config');
const dataSource = require('../utils/createDatabaseConnection');
const { Post } = require('../models');
const { getConnection } = require('typeorm');

const postRepository = dataSource.getRepository(Post).extend({
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

const createPost = async ({ name, description, image }) => {
  // Create a new post object with the provided details
  const post = await postRepository.create({ name, description, image });

  // Save the post to the database
  return postRepository.save(post);
};

const getAllPost = async () => {
  return postRepository.find();
};
/**
 * Delete user by id
 * @param {ObjectId} postId
 * @returns {Promise<User>}
 */

const getPostById = async (id) => {
  return postRepository.findOneBy({ id });
};
const updatePostById = async (feedbackId, updateBody) => {
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
  createPost,
  getAllPost,
  updatePostById,
};
