const express = require('express');
const router = express.Router();
const checkUserLoginMW = require('../middlewares/authentication/checkUserLogin');
const getAllUserDataMW = require('../middlewares/user/getAllUserData');

router.get('/',
    checkUserLoginMW('admin'),
    getAllUserDataMW()
);

module.exports = router;
