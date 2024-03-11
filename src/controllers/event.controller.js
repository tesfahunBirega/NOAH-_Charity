const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { eventService } = require('../services');

const createEvent = catchAsync(async (req, res) => {
  const post = await eventService.createEvent(req.body);
  res.status(httpStatus.CREATED).send(post);
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
  const post = await eventService.updateEventById(req.params.postId, req.body);
  res.send(post);
});

const deleteEvent = catchAsync(async (req, res) => {
  await eventService.deleteEventById(req.params.postId);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createEvent,
  getEvents,
  getEvent,
  updateEvent,
  deleteEvent,
};
