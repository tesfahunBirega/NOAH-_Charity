const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { userService } = require('../services');

const createUser = catchAsync(async (req, res) => {
  try {
    const { fullName, phone, email, password, role } = req.body;

    const user = await userService.createUser({ fullName, phone, email, password, role });

    res.status(httpStatus.CREATED).send(user);
  } catch (error) {
    // Handle any errors that occur during authentication
    res.status(httpStatus.UNAUTHORIZED).send({ error: error.message });
  }
});

const login = catchAsync(async (req, res) => {
  try {
    // Extract email and password from the request body
    const { email, password } = req.body;

    // Call the login service function to authenticate the user
    const { user, token } = await userService.login({ email, password });

    // If authentication is successful, send the user and token in the response
    res.status(httpStatus.OK).send({ user, token });
  } catch (error) {
    // Handle authentication errors
    res.status(httpStatus.UNAUTHORIZED).send({ error: error.message });
  }
});

const getUsers = catchAsync(async (req, res) => {
  console.log(req.body, 'bodyyyyy');

  const filter = pick(req.query, ['title']);

  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await userService.queryUsers(filter, options);
  res.send(result);
});

const getUser = catchAsync(async (req, res) => {
  const post = await userService.getUserById(req.params.postId);
  if (!post) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Post not found');
  }
  res.send(post);
});
const getAllUsers = catchAsync(async (req, res) => {
  const users = await userService.getAllUsers();
  res.send(users);
});

const updateUser = catchAsync(async (req, res) => {
  const post = await userService.updateUserById(req.params.postId, req.body);
  res.send(post);
});

const deleteUser = catchAsync(async (req, res) => {
  await userService.deleteUserById(req.params.postId);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
  login,
  getAllUsers,
};
