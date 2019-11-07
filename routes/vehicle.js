const express = require('express');
const router = express.Router();
const checkUserLoginMW = require('../middlewares/authentication/checkUserLogin');
const checkUserIdMW = require('../middlewares/authentication/checkUserId');
const checkRequestParamsMW = require('../middlewares/general/checkRequestParams');
const addVehicleMW = require('../middlewares/vehicle/addVehicle');
const getVehicleDataMW = require('../middlewares/vehicle/getVehicleData');
const updateVehicleDataMW = require('../middlewares/vehicle/updateVehicleData');
const deleteVehicleMW = require('../middlewares/vehicle/deleteVehicle');
const generateNewVehicleIdMW = require('../middlewares/vehicle/generateNewVehicleId');


router.post('/',
	checkRequestParamsMW('licencePlate', 'type'),
    checkUserLoginMW(),
	checkUserIdMW('admin'),
	addVehicleMW()
);

router.get('/:vehicleId',
	checkUserLoginMW(),
	checkUserIdMW('admin'),
	getVehicleDataMW()
);

router.post('/:vehicleId',
	checkUserLoginMW(),
	checkUserIdMW('admin'),
	updateVehicleDataMW()
);

router.post('/:vehicleId/newid',
	checkUserLoginMW(),
	checkUserIdMW('admin'),
	generateNewVehicleIdMW()
);

router.delete('/:vehicleId',
	checkUserLoginMW(),
    checkUserIdMW('admin'),
	deleteVehicleMW()
);

module.exports = router;
