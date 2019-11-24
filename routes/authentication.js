const express = require('express');
const router = express.Router();
const checkRequestParamsMW = require('../middlewares/general/checkRequestParams');
const checkUserNotExistsMW = require('../middlewares/user/checkUserNotExists');
const registerMW = require('../middlewares/authentication/register');
const checkRegisterTypeMW = require('../middlewares/authentication/checkRegisterType');
const logoutMW = require('../middlewares/authentication/logoutUser');
const loginMW = require('../middlewares/authentication/loginUser');
const checkUserLoginMW = require('../middlewares/authentication/checkUserLogin');
const changePasswordMW = require('../middlewares/authentication/changePassword');

router.post('/register',
    checkRequestParamsMW('email', 'password', 'name', 'idCard'),
    checkRegisterTypeMW(),
    checkUserNotExistsMW(),
    registerMW(),
	loginMW()
);

router.post('/logout',
    logoutMW()
);

router.post('/login',
	checkRequestParamsMW('email', 'password'),
	loginMW()
);

router.post('/password',
	checkRequestParamsMW('oldPassword', 'newPassword'),
	checkUserLoginMW(),
	changePasswordMW()
);

module.exports = router;
