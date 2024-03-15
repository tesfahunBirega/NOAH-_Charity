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

const userRepository = dataSource.getRepository(FeedBack).extend({
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
  const doc = userRepository.create(ReqBody);
  return userRepository.save(doc);
};

/**
 * Query for users
 * @param {Object} filter - Filter options
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */

const queryUsers = async (filter, options) => {
  const { limit, page, sortByOp } = options;
  // Fetch users with role 'user'
  const users = await userRepository.findAll({ where: { role: 'user' } });
  return users;
};

/**
 * Delete user by id
 * @param {ObjectId} postId
 * @returns {Promise<User>}
 */
const deleteUserById = async (postId) => {
  const post = await getUserById(postId);
  if (!post) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Post not found');
  }
  return userRepository.delete({ id: postId });
};

module.exports = {
  createfeedback,
  queryUsers,
  deleteUserById,
};
