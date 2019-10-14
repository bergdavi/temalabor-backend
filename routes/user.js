const express = require('express');
const router = express.Router();
const checkUserLoginMW = require('../middlewares/authentication/checkUserLogin');
const checkUserIdMW = require('../middlewares/authentication/checkUserId');
const getUserDataMW = require('../middlewares/user/getUserData');
const getOwnUserDataMW = require('../middlewares/user/getOwnUserData');
const deleteUserMW = require('../middlewares/user/deleteUser')

router.get('/',
    checkUserLoginMW(),
    getOwnUserDataMW()
);

router.get('/:userId',
    checkUserLoginMW(),
    checkUserIdMW('self', 'inspector', 'admin'),
    getUserDataMW()
);

router.delete('/:userId',
	checkUserLoginMW(),
    checkUserIdMW('self', 'admin'),
	deleteUserMW()
);

module.exports = router;
