const express = require('express');
const router = express.Router();
const checkUserLoginMW = require('../middlewares/authentication/checkUserLogin');
const checkRequestParamsMW = require('../middlewares/general/checkRequestParams');
const getAllTicketDataMW = require('../middlewares/ticket/getAllTicketData');
const buyTicketMW = require('../middlewares/ticket/buyTicket');
const validateTicketMW = require('../middlewares/ticket/validateTicket');


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

module.exports = router;
