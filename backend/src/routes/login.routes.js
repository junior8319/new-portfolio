const express = require('express');
const loginController = require('../controllers/Login.controller');
const { loginValidate } = require('../middlewares/login.validate.middleware');
const { tokenValidate } = require('../middlewares/token.validate.middleware');

const loginRouter = express.Router();

loginRouter.get('/', loginController.getUsers);
loginRouter.get('/:id', loginController.getUserById);
loginRouter.post('/', tokenValidate, loginValidate, loginController.createUser);
loginRouter.post('/login', loginValidate, loginController.login);
loginRouter.put('/:id', tokenValidate, loginController.updateUser);
loginRouter.delete('/:id', tokenValidate, loginController.deleteUser);

module.exports = {
  loginRouter,
};