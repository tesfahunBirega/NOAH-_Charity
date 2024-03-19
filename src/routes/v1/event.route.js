const express = require('express');
const validate = require('../../middlewares/validate');
const { eventValidation } = require('../../validations');
const { eventController } = require('../../controllers');

const router = express.Router();

router.route('/').post(eventController.createEvent).get(validate(eventValidation.getEvents), eventController.getEvents);

router
  .route('/:eventId')
  .get(validate(eventValidation.getEvent), eventController.getEvent)
  .patch(validate(eventValidation.updateEvent), eventController.updateEvent)
  .delete(validate(eventValidation.deleteEvent), eventController.deleteEvent);

router.route('/post').post(eventController.createPost).get(eventController.getPosts);

router.route('/:postId').get(eventController.getPost).patch(eventController.updatePost).delete(eventController.deletePost);
module.exports = router;
