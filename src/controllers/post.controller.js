const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { postService } = require('../services');

const createPost = catchAsync(async (req, res) => {
  try {
    // Get the uploaded image file
    const image = req.file ? req.file.filename : null;

    // Extract other fields from request body
    const { name, description } = req.body;

    // Create the post with image details
    const post = await postService.createPost({ name, description, image });

    // Construct the URL for the uploaded image
    const imageUrl = `${req.protocol}://${req.get('host')}/public/${image}`;

    // Respond with success and image URL
    res.status(httpStatus.CREATED).json({
      status: 'Success',
      imageUrl: imageUrl,
      post: post,
    });
  } catch (error) {
    // Handle errors
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ error: error.message });
  }
});

const getAllPosts = catchAsync(async (req, res) => {
  const posts = await postService.getAllPost();
  res.send(Feedbacks);
});
const getFeedback = catchAsync(async (req, res) => {
  console.log(req.body, 'bodyyyyy');

  const filter = pick(req.query, ['title']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await userService.queryUsers(filter, options);
  res.send(result);
});

const updatePost = catchAsync(async (req, res) => {
  const { is_seen } = req.body;
  const post = await feedBackService.updatePostById(req.params.userId, { is_seen }); // Pass is_seen directly
  if (!post) {
    throw new ApiError(httpStatus.NOT_FOUND, 'FeedBack not found');
  }
  res.send(post);
});

module.exports = {
  createPost,
  updatePost,
  getAllPosts,
};
