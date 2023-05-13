const usersRouter = require('express').Router();
const {
  getAllUsers, getUserById, changeProfile, changeAvatar, getMyInfo,
} = require('../controllers/users');
const { validateChangeProfile, validateChangeAvatar, validateUserId } = require('../middlewares/validate');

usersRouter.get('/', getAllUsers);
usersRouter.get('/me', getMyInfo);
usersRouter.get('/:userId', validateUserId, getUserById);
usersRouter.patch('/me', validateChangeProfile, changeProfile);
usersRouter.patch('/me/avatar', validateChangeAvatar, changeAvatar);

module.exports = usersRouter;
