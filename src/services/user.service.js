const httpStatus = require('http-status');
const { User } = require('../models');
const dataSource = require('../utils/createDatabaseConnection');
const ApiError = require('../utils/ApiError');
const sortBy = require('../utils/sorter');
const findAll = require('./Plugins/findAll');

const userRepository = dataSource.getRepository(User).extend({
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
const createUser = async (postBody) => {
  const doc = userRepository.create(postBody);
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

  return userRepository.findAll({
    tableName: 'user',
    sortOptions: sortByOp && { option: sortBy },
    paginationOptions: { limit, page },
  });
};

/**
 * Get post by id
 * @param {ObjectId} id
 * @returns {Promise<Post>}
 */
const getUserById = async (id) => {
  return userRepository.findOneBy({ id });
};

/**
 * Update user by id
 * @param {ObjectId} postId
 * @param {Object} updateBody
 * @returns {Promise<Post>}
 */
const updateUserById = async (postId, updateBody) => {
  const UserByID = await getUserById(postId);
  if (!UserByID) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  const update = await userRepository.update({ id: postId }, updateBody);
  return update;
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
  createUser,
  queryUsers,
  getUserById,
  updateUserById,
  deleteUserById,
};
