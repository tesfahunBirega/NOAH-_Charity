const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
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

const getAllPosts = catchAsync(async (req, res) => {
  try {
    // Fetch all posts from the database using the postService
    const posts = await postService.getAllPost();

    // Map each post to include the image URL
    const postsWithImageUrl = posts.map((post) => {
      const imageUrl = `${req.protocol}://${req.get('host')}/v1/public/${post.image}`;
      return {
        id: post.id,
        createdAt: post.createdAt,
        name: post.name,
        description: post.description,
        image: post.image,
        imageUrl: imageUrl,
      };
    });

    // Respond with the posts including image URLs
    res.status(httpStatus.OK).json({
      status: 'Success',
      posts: postsWithImageUrl,
    });
  } catch (error) {
    // Handle errors
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ error: error.message });
  }
});

module.exports = {
  createVoluntery,
  getAllPosts,
};
