const express = require('express');
const router = express.Router();
const checkUserLoginMW = require('../middlewares/authentication/checkUserLogin');
const checkUserIdMW = require('../middlewares/authentication/checkUserId');
const getUserDataMW = require('../middlewares/user/getUserData');
const getOwnUserDataMW = require('../middlewares/user/getOwnUserData');

router.get('/',
    checkUserLoginMW(),
    getOwnUserDataMW()
);

router.get('/:userId',
    checkUserLoginMW(),
    checkUserIdMW(),
    getUserDataMW()
);

module.exports = router;
