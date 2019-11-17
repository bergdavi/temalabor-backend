const express = require('express');
const router = express.Router();
const checkUserLoginMW = require('../middlewares/authentication/checkUserLogin');
const checkUserIdMW = require('../middlewares/authentication/checkUserId');
const checkRequestParamsMW = require('../middlewares/general/checkRequestParams');
const getAllTicketDataMW = require('../middlewares/ticket/getAllTicketData');
const buyTicketMW = require('../middlewares/ticket/buyTicket');
const validateTicketMW = require('../middlewares/ticket/validateTicket');
const inspectTicketMW = require('../middlewares/ticket/inspectTicket');


router.get('/',
    getAllTicketDataMW()
);

router.post('/buy',
    checkUserLoginMW(),
    checkRequestParamsMW('typeId'),
    buyTicketMW()
);

router.post('/validate',
    checkUserLoginMW(),
    checkRequestParamsMW('vehicleId'),
    validateTicketMW()
);

router.post('/inspect',
    checkUserLoginMW(),
    checkUserIdMW('admin', 'inspector'),
    checkRequestParamsMW('id', 'vehicleId'),
    inspectTicketMW()
);

module.exports = router;
