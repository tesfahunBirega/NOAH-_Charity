const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { volunteryService } = require('../services');

const createVoluntery = catchAsync(async (req, res) => {
  try {
    // Get the uploaded image file

    // Extract other fields from request body
    const { name, description } = req.body;

    // Create the post with image details
    const voluntery = await volunteryService.createvoluntery({ name, description });
    res.status(httpStatus.CREATED).send(voluntery);
  } catch (error) {
    // Handle errors
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ error: error.message });
  }
});

// const getAllPost = catchAsync(async (req, res) => {
//   const posts = await postService.getAllPost();
//   res.send(posts);
// });

const getAllVolunterys = catchAsync(async (req, res) => {
  const voluntery = await volunteryService.getAllVoluntery();
  res.send(voluntery);
});

module.exports = {
  createVoluntery,
  getAllVolunterys,
};
