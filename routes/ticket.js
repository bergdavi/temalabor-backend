const express = require('express');
const router = express.Router();
const checkUserLoginMW = require('../middlewares/authentication/checkUserLogin');
const checkUserIdMW = require('../middlewares/authentication/checkUserId');
const checkRequestParamsMW = require('../middlewares/general/checkRequestParams');
const addTicketMW = require('../middlewares/ticket/addTicket');
const getTicketDataMW = require('../middlewares/ticket/getTicketData');
const updateTicketDataMW = require('../middlewares/ticket/updateTicketData');
const deleteTicketMW = require('../middlewares/ticket/deleteTicket');


router.post('/',
	checkRequestParamsMW('type', 'price'),
    checkUserLoginMW(),
	checkUserIdMW('admin'),
	addTicketMW()
);

router.get('/:ticketId',
	getTicketDataMW()
);

router.post('/:ticketId',
	checkUserLoginMW(),
	checkUserIdMW('self', 'admin'),
	updateTicketDataMW()
);

router.delete('/:ticketId',
	checkUserLoginMW(),
    checkUserIdMW('self', 'admin'),
	deleteTicketMW()
);

module.exports = router;
