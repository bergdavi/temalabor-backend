const express = require('express');
const router = express.Router();
const checkRequestParamsMW = require('../middlewares/general/checkRequestParams');
const checkUserNotExistsMW = require('../middlewares/user/checkUserNotExists');
const registerMW = require('../middlewares/authentication/register');
const checkRegisterTypeMW = require('../middlewares/authentication/checkRegisterType');
const checkUserLoginMW = require('../middlewares/authentication/checkUserLogin');
const logoutMW = require('../middlewares/authentication/logoutUser');
const loginMW = require('../middlewares/authentication/loginUser');


router.post('/register',
    checkRequestParamsMW('email', 'password', 'name', 'idCard'),
    checkRegisterTypeMW(),
    checkUserNotExistsMW(),
    registerMW()
);

router.post('/logout',
    checkUserLoginMW(),
    logoutMW()
);

router.post('/login',
	checkRequestParamsMW('email', 'password'),
    loginMW()
);

module.exports = router;
