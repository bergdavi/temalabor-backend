const express = require('express');
const router = express.Router();
const getAllTicketDataMW = require('../middlewares/ticket/getAllTicketData');

router.get('/',
    getAllTicketDataMW()
);

module.exports = router;
