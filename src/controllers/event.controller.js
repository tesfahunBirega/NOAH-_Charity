const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { eventService } = require('../services');

const createEvent = catchAsync(async (req, res) => {
  const image = req.file ? req.file.filename : null;
  const { name, date, event_time, event_price, charityAddress, description } = req.body;
  const post = await eventService.createEvent({ name, date, event_time, event_price, charityAddress, image, description });
  const imageUrl = `${req.protocol}://${req.get('host')}/v1/public/${image}`;

  // Respond with success and image URL
  res.status(httpStatus.CREATED).json({
    status: 'Success',
    imageUrl: imageUrl,
    post: post,
  });
  // res.status(httpStatus.CREATED).send(post);
});

const getEvents = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['title']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await eventService.queryEvents(filter, options);
  res.send(result);
});

const getEvent = catchAsync(async (req, res) => {
  const post = await eventService.getEventById(req.params.postId);
  if (!post) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Post not found');
  }
  res.send(post);
});

const updateEvent = catchAsync(async (req, res) => {
  const post = await eventService.updateEventById(req.params.eventId, req.body);
  res.send(post);
});

const deleteEvent = catchAsync(async (req, res) => {
  await eventService.deleteEventById(req.params.postId);
  res.status(httpStatus.NO_CONTENT).send();
});

const createPost = catchAsync(async (req, res) => {
  const post = await eventService.createPost(req.body);
  res.status(httpStatus.CREATED).send(post);
});

const getPosts = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['title']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await eventService.queryPosts(filter, options);
  res.send(result);
});

const getPost = catchAsync(async (req, res) => {
  const post = await eventService.getPostById(req.params.postId);
  if (!post) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Post not found');
  }
  res.send(post);
});

const updatePost = catchAsync(async (req, res) => {
  const post = await eventService.updatePostById(req.params.postId, req.body);
  res.send(post);
});

const deletePost = catchAsync(async (req, res) => {
  await eventService.deletePostById(req.params.postId);
  res.status(httpStatus.NO_CONTENT).send();
});
module.exports = {
  createEvent,
  getEvents,
  getEvent,
  updateEvent,
  deleteEvent,
  createPost,
  getPosts,
  getPost,
  updatePost,
  deletePost,
};
