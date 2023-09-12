const express = require('express');
const loginController = require('../controllers/Login.controller');

const loginRouter = express.Router();

loginRouter.get('/', loginController.getUsers);
loginRouter.get('/:id', loginController.getUserById);
loginRouter.post('/', loginController.createUser);
loginRouter.post('/login', loginController.login);
loginRouter.put('/:id', loginController.updateUser);
loginRouter.delete('/:id', loginController.deleteUser);

module.exports = {
  loginRouter,
};