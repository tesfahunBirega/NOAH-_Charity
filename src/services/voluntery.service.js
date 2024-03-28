const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const sortBy = require('../utils/sorter');
const findAll = require('./Plugins/findAll');
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
  const Volunteryres = await volunteryRepository.create({ name, description });

  // Save the post to the database
  const result = volunteryRepository.save(Volunteryres);
  return result;
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
const updateVolunteryById = async (volunteryId, updateBody) => {
  const voluntery = await getVolunteryById(volunteryId);
  if (!voluntery) {
    throw new ApiError(httpStatus.NOT_FOUND, 'voluntery not found');
  }
  const updateResult = await volunteryRepository.update({ id: volunteryId }, updateBody);
  const updatedFeedback = await getVolunteryById(volunteryId);
  return { updatedFeedback };
};

const deleteVoluntery = async (volunteryId) => {
  const voluntery = await getVolunteryById(volunteryId);
  if (!voluntery) {
    throw new ApiError(httpStatus.NOT_FOUND, 'voluntery not found');
  }
  const Voluntery = await volunteryRepository.delete({ id: volunteryId });
  return Voluntery;
};
module.exports = {
  createvoluntery,
  getVolunteryById,
  getAllVoluntery,
  updateVolunteryById,
  deleteVoluntery,
};
