const { Login } = require('../database/models');
const { generateToken } = require('../helpers/jsonWebToken');

const getUsers = async () => {
  const users = await Login.findAll();

  if (!users) {
    return null;
  }

  return users;
};

const getUserById = async (id) => {
  const user = await Login.findByPk(id);

  if (!user) {
    return null;
  }

  return user.dataValues;
};

const getUserByName = async (name) => {
  const user = await Login.findOne({ where: { userName: name } });

  if (!user) {
    return null;
  }

  return user.dataValues;
};

const userExists = async (name) => {
  const user = await getUserByName(name);

  if (!user) {
    return false;
  }

  return true;
};

const getToken = async (user) => {
  const userData = await getUserByName(user.userName);

  if (!userData) return null;
  console.log(userData);

  const token = await generateToken({
    id: userData.id,
    userName: userData.userName,
    role: userData.role,
  });

  if (!token) return null;

  return { user: userData, token };
};

const createUser = async (user) => {
  const alreadyExists = await userExists(user.userName);

  if (alreadyExists) {
    return null;
  }

  const newUser = await Login.create(user);
  if (!newUser) {
    return null;
  }

  return newUser.dataValues;
};

const updateUser = async (id, user) => {
  const userToUpdate = await getUserById(id);
  if (!userToUpdate) return null;

  const updatedUser = await Login.update(user, { where: { id: id } });

  if (!updatedUser) {
    return null;
  }

  return updatedUser;
};

const deleteUser = async (id) => {
  const userToDelete = await getUserById(id);
  if (!userToDelete) return null;

  const deletedUser = await Login.destroy({ where: { id: id } });

  if (!deletedUser) {
    return null;
  }

  return deletedUser;
};

module.exports = {
  getUsers,
  getUserById,
  getUserByName,
  getToken,
  createUser,
  updateUser,
  deleteUser,
};
