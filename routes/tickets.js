const express = require('express');
const router = express.Router();
const checkUserLoginMW = require('../middlewares/authentication/checkUserLogin');
const checkRequestParamsMW = require('../middlewares/general/checkRequestParams');
const getAllTicketDataMW = require('../middlewares/ticket/getAllTicketData');
const buyTicketMW = require('../middlewares/ticket/buyTicket');


router.get('/',
    getAllTicketDataMW()
);

router.post('/buy',
    checkUserLoginMW(),
    checkRequestParamsMW('typeId', 'fromDate'),
    buyTicketMW()
);

module.exports = router;
