const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const { getFeedbackById, feedBackRepository } = require('./feedBack.service');

const updateFeedbackById = async (feedbackId, updateBody) => {
  const feedback = await getFeedbackById(feedbackId);
  if (!feedback) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Feedback not found');
  }
  const updateResult = await feedBackRepository.update({ id: feedbackId }, updateBody);
  if (updateResult) {
    const updatedFeedback = await getFeedbackById(feedbackId);
  }
  else {
    return 'none updated';
  }
  return { updatedFeedback };
};
