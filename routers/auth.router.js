const router = require('express').Router();

const { checkAccessToken, checkRefreshToken, checkActionToken } = require('../middlewares/auth.middleware');
const {
    isFullDataInUserRequest, isLoginBodyCorrect, checkUserAvailability, isUserNotExists, isUserExists,
    isResetPassDataInRequest
} = require('../middlewares/user.middleware');
const {
    login, register, refreshToken, logout, logoutEverywhere, resetPassword, forgotPassword
} = require('../controllers/auth.controller');

router.post('/register', isFullDataInUserRequest, checkUserAvailability('email'), isUserNotExists, register);

router.post('/login', isLoginBodyCorrect, checkUserAvailability('email'), isUserExists, login);

router.post('/refresh', checkRefreshToken, refreshToken);

router.post('/forget_pass', checkUserAvailability('email'), isUserExists, forgotPassword);

router.post('/reset_password',
    checkUserAvailability('email'),
    isUserExists,
    checkActionToken,
    isResetPassDataInRequest,
    resetPassword);

router.post('/logout', checkAccessToken, logout);

router.post('/logout_everywhere', checkAccessToken, logoutEverywhere);

module.exports = router;
