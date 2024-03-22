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
  return volunteryRepository.findOneBy({ id });
};
const updateVolunteryById = async (VolunteryId, updateBody) => {
  const Voluntery = await getVolunteryById(VolunteryId);
  if (!Voluntery) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Voluntery not found');
  }
  const updateResult = await postRepository.update({ id: VolunteryId }, updateBody);
  const updatedVoluntery = await getPostById(VolunteryId);
  return { updatedVoluntery };
};

module.exports = {
  createvoluntery,
  getVolunteryById,
  getAllVoluntery,
  updateVolunteryById,
};
