const express = require('express');
const router = express.Router();
const checkRequestParamsMW = require('../middlewares/general/checkRequestParams');
const checkUserLoginMW = require('../middlewares/authentication/checkUserLogin');
const checkUserIdMW = require('../middlewares/authentication/checkUserId');
const addLineMW = require('../middlewares/line/addLine');
const getLineDataMW = require('../middlewares/line/getLineData');
const updateLineDataMW = require('../middlewares/line/updateLineData');
const deleteLineMW = require('../middlewares/line/deleteLine');

router.post('/',
    checkRequestParamsMW('name', 'type'),
    checkUserLoginMW(),
	addLineMW()
);

router.get('/:lineId',
	getLineDataMW()
);

router.post('/:lineId',
	checkUserLoginMW(),
	checkUserIdMW('self', 'admin'),
	updateLineDataMW()
);

router.delete('/:userId',
	checkUserLoginMW(),
    checkUserIdMW('self', 'admin'),
	deleteLineMW()
);

module.exports = router;
