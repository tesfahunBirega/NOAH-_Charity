const httpStatus = require('http-status');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const ApiError = require('../utils/ApiError');
const sortBy = require('../utils/sorter');
const findAll = require('./Plugins/findAll');
const configs = require('../config/config');
const dataSource = require('../utils/createDatabaseConnection');
const { User } = require('../models');
const { getConnection } = require('typeorm');

const userRepository = dataSource.getRepository(User).extend({
  findAll,
  sortBy,
});
// .extend({ sortBy });
//

/**
 * Create a user
 * @param {Object} userBody
 * @returns {Promise<Post>}
 */

const hash = (pass) => {
  return bcrypt.hashSync(pass, 10);
};
const editUser = async (id, data) => {
  try {
    const idUser = id;
    const updatedFields = data;
    const connection = getConnection();
    const userRepository = connection.getRepository(User);
    const user = await userRepository.findOne({ where: { id: idUser } });
    if (!user) {
      throw new Error('User not found');
    }
    await userRepository.update(id, {
      first_name: updatedFields?.first_name,
      last_name: updatedFields?.last_name,
      phone_number: updatedFields?.phone_number,
      user_type: updatedFields?.user_type,
      profile_pic: updatedFields?.profile_pic,
    });

    const userTeamRepository = connection.getRepository(TeamUser);
    await userTeamRepository.delete({ user_id: id });

    if (updatedFields.team_id) {
      const teams = updatedFields.team_id;
      const teamEntities = teams.map((teamId) => ({
        user_id: id,
        team_id: teamId,
      }));
      await userTeamRepository.save(teamEntities);
    }
    return user;
  } catch (error) {
    throw error;
  }
};
const getUserByEmail = async (credentials) => {
  try {
    const { email, password } = credentials;

    // Form Connection
    // const connection = getConnection();
    // const userRepository = connection.getRepository(User);
    const user = await userRepository.findOne({
      where: { email: email },
    });
    if (!user) {
      throw new Error('User not found');
    }

    // Check if the password matches
    const passwordMatches = await bcrypt.compare(password, user.password);
    if (!passwordMatches) {
      throw new Error('Incorrect password');
    }

    return user;
  } catch (error) {
    throw error;
  }
};

const createUser = async (ReqBody) => {
  const { email } = ReqBody;

  // Check if the email already exists in the database
  const existingUser = await userRepository.findOne({ where: { email } });
  if (existingUser) {
    throw new Error('Email is already in use.');
  }
  const { password } = ReqBody;

  if (password) {
    // Generate a salt
    const salt = await bcrypt.genSalt(10);
    // Hash the password using the generated salt
    const hashedPassword = await bcrypt.hash(password, salt);
    // Update the password in the request body
    // eslint-disable-next-line no-param-reassign
    ReqBody.password = hashedPassword;
  }
  // Generate a salt
  const doc = userRepository.create(ReqBody);
  return userRepository.save(doc);
};

const login = async (credentials, expiresIn = '1h') => {
  const { email, password } = credentials;

  // Retrieve the user from the database based on the email
  const user = await userRepository.findOne({ where: { email } });

  if (!user) {
    throw new Error('User not found');
  }

  // Verify if the provided password matches the stored hashed password
  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    throw new Error('Invalid password');
  }

  // Generate JWT token
  const token = jwt.sign({ id: user.id, email: user.email }, configs.secret, { expiresIn });

  // Return the user and token
  return { user, token };
};

/**
 * Query for users
 * @param {Object} filter - Filter options
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */

const queryUsers = async () => {
  // Fetch users with role 'user'
  const users = await userRepository.findAll({ where: { role: 'user' } });
  return users;
};

/**
 * Get post by id
 * @param {ObjectId} id
 * @returns {Promise<Post>}
 */
const getAllUsers = async () => {
  return userRepository.find({ where: { role: 'user' } });
};

const getUserById = async (id) => {
  return userRepository.findOneBy({ id });
};

/**
 * Update user by id
 * @param {ObjectId} postId
 * @param {Object} updateBody
 * @returns {Promise<Post>}
 */
const updateUserById = async (userId, updateBody) => {
  const userById = await getUserById(userId);
  if (!userById) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  const updateResult = await userRepository.update({ id: userId }, updateBody); // Use updateBody to specify updated values
  return updateResult;
};
/**
 * Delete user by id
 * @param {ObjectId} postId
 * @returns {Promise<User>}
 */
const deleteUserById = async (postId) => {
  const post = await getUserById(postId);
  if (!post) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Post not found');
  }
  return userRepository.delete({ id: postId });
};

module.exports = {
  createUser,
  queryUsers,
  getUserById,
  updateUserById,
  deleteUserById,
  login,
  getAllUsers,
  getUserByEmail,
  editUser,
  hash,
};
