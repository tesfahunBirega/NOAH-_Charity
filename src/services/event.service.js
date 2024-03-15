const httpStatus = require('http-status');
const { Event } = require('../models');
const dataSource = require('../utils/createDatabaseConnection');
const ApiError = require('../utils/ApiError');
const sortBy = require('../utils/sorter');
const findAll = require('./Plugins/findAll');

const eventRepository = dataSource.getRepository(Event).extend({
  findAll,
  sortBy,
});
const createEvent = async (eventBody) => {
  const doc = eventRepository.create(eventBody);
  const result = await eventRepository.save(doc);
  console.log('event');
  return result;
};

const queryEvents = async (filter, options) => {
  // eslint-disable-next-line no-shadow
  const { limit, page, sortBy } = options;

  const result = await eventRepository.findAll({
    tableName: 'event',
    sortOptions: sortBy && { option: sortBy },
    paginationOptions: { limit, page },
  });
  return result;
};

const getEventById = async (id) => {
  const result = await eventRepository.findOneBy({ id });
  return result;
};

const updateEventById = async (postId, updateBody) => {
  const event = await getEventById(postId);
  if (!event) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Post not found');
  }
  await eventRepository.update({ id: postId }, updateBody);
  const result = await getEventById(postId);
  return result;
};

const deleteEventById = async (postId) => {
  const event = await getEventById(postId);
  if (!event) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Post not found');
  }
  const result = await eventRepository.delete({ id: postId });
  return result;
};

module.exports = {
  createEvent,
  queryEvents,
  getEventById,
  updateEventById,
  deleteEventById,
};
