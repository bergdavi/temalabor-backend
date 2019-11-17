const express = require('express');
const router = express.Router();
const checkUserLoginMW = require('../middlewares/authentication/checkUserLogin');
const checkUserIdMW = require('../middlewares/authentication/checkUserId');
const getSaleStats = require('../middlewares/stats/sales');
const getRegistrationStats = require('../middlewares/stats/registration');

router.get('/sales',
    checkUserLoginMW(),
    checkUserIdMW('admin'),
    getSaleStats()
);

router.get('/registrations',
    checkUserLoginMW(),
    checkUserIdMW('admin'),
    getRegistrationStats()
);

module.exports = router;
