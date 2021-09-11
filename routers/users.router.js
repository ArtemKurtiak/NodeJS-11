const router = require('express').Router();

const { checkAccessToken } = require('../middlewares/auth.middleware');
const {
    getAllUsers, getUserById, deleteUser, updateUser, createUser, createAdmin
} = require('../controllers/users.controller');
const {
    checkUserPermission,
    isFullDataInUserRequest,
    isUpdateUserDataSent, isUserIdFormatCorrect, checkUserAvailability, isUserNotExists, isUserExists, isUserAdmin
} = require('../middlewares/user.middleware');

router.use(checkAccessToken);

router.post('/admin',
    checkUserAvailability('email'),
    isUserNotExists,
    createAdmin);

router.get('/', getAllUsers);

router.use('/', isFullDataInUserRequest, isUserAdmin, checkUserAvailability('email'), isUserNotExists);

router.post('/', createUser);

router.use('/:userId', isUserIdFormatCorrect);

router.patch('/:userId',
    isUpdateUserDataSent,
    checkUserAvailability('userId', 'params', '_id'),
    isUserExists,
    checkUserAvailability('email'),
    isUserNotExists,
    checkUserPermission,
    updateUser);

router.use('/:userId', checkUserAvailability('userId', 'params', '_id'), isUserExists);

router.get('/:userId', getUserById);

router.delete('/:userId', checkUserPermission, deleteUser);

module.exports = router;
