const express = require('express');
const router = express.Router();
const checkUserLoginMW = require('../middlewares/authentication/checkUserLogin');
const checkUserIdMW = require('../middlewares/authentication/checkUserId');
const getAllVehicleDataMW = require('../middlewares/vehicle/getAllVehicleData');

router.get('/',
    checkUserLoginMW(),
    checkUserIdMW('admin'),
    getAllVehicleDataMW()
);

module.exports = router;
