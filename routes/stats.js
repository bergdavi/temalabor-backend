const express = require('express');
const router = express.Router();
const checkUserLoginMW = require('../middlewares/authentication/checkUserLogin');
const checkUserIdMW = require('../middlewares/authentication/checkUserId');
const getSaleStats = require('../middlewares/stats/sales');
const getRegistrationStats = require('../middlewares/stats/registration');
const getIncomeStats = require('../middlewares/stats/income');

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

router.get('/income',
    checkUserLoginMW(),
    checkUserIdMW('admin'),
    getIncomeStats()
);

module.exports = router;
