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
const updateVolunteryById = async (feedbackId, updateBody) => {
  const feedback = await getVolunteryById(feedbackId);
  if (!feedback) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Feedback not found');
  }
  const updateResult = await volunteryRepository.update({ id: feedbackId }, updateBody);
  const updatedFeedback = await getVolunteryById(feedbackId);
  return { updatedFeedback };
};

module.exports = {
  createvoluntery,
  getVolunteryById,
  getAllVoluntery,
  updateVolunteryById,
};
