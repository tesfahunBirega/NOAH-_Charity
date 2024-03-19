const httpStatus = require('http-status');
const { Event, Post } = require('../models');
const dataSource = require('../utils/createDatabaseConnection');
const ApiError = require('../utils/ApiError');
const sortBy = require('../utils/sorter');
const findAll = require('./Plugins/findAll');

const eventRepository = dataSource.getRepository(Event).extend({
  findAll,
  sortBy,
});
const postRepository = dataSource.getRepository(Post).extend({
  findAll,
  sortBy,
});
const createEvent = async (eventBody) => {
  const doc = eventRepository.create(eventBody);
  const result = await eventRepository.save(doc);
  return result;
};

const queryEvents = async () => {
  // eslint-disable-next-line no-shadow
  // const { limit, page, sortBy } = options;

  const result = await eventRepository.findAll({ tableName: 'events' });
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

const createPost = async (postBody) => {
  const doc = postRepository.create(postBody);
  const result = await postRepository.save(doc);
  return result;
};

const queryPosts = async (filter, options) => {
  const { limit, page } = options;

  const result = await postRepository.findAll({
    tableName: 'post',
    sortOptions: sortBy && { option: sortBy },
    paginationOptions: { limit, page },
  });
  return result;
};

const getPostById = async (id) => {
  const result = await postRepository.findOneBy({ id });
  return result;
};

const updatePostById = async (postId, updateBody) => {
  const post = await getPostById(postId);
  if (!post) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Post not found');
  }
  await postRepository.update({ id: postId }, updateBody);
  const result = await getPostById(postId);
  return result;
};

const deletePostById = async (postId) => {
  const post = await getPostById(postId);
  if (!post) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Post not found');
  }
  const result = await postRepository.delete({ id: postId });
  return result;
};
module.exports = {
  createEvent,
  queryEvents,
  getEventById,
  updateEventById,
  deleteEventById,
  createPost,
  queryPosts,
  getPostById,
  updatePostById,
  deletePostById,
};
