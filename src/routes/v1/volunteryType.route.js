const express = require('express');
const validate = require('../../middlewares/validate');
const { volunteryValidation } = require('../../validations');
const { volunteryTypeController } = require('../../controllers');
// const authMiddleware = require('../../middlewares/authMiddleware');

const router = express.Router();

router
  .route('/')
  .post(validate(volunteryValidation.createVoluntery), volunteryTypeController.createvolunteryType)
  .get(validate(volunteryValidation.getVoluntery), volunteryTypeController.getAllPosts);

module.exports = router;
