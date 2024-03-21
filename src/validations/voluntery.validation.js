const Joi = require('joi');

const createVoluntery = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    description: Joi.string().required(),
  }),
};

const getVoluntery = {
  query: Joi.object().keys({
    title: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getEvent = {
  params: Joi.object().keys({
    postId: Joi.string(),
  }),
};

const updateEvent = {
  params: Joi.object().keys({
    eventId: Joi.required(),
  }),
  body: Joi.object()
    .keys({
      title: Joi.string(),
      body: Joi.string(),
    })
    .min(1),
};

const deleteEvent = {
  params: Joi.object().keys({
    postId: Joi.string(),
  }),
};

module.exports = {
  createVoluntery,
  getVoluntery,
};
