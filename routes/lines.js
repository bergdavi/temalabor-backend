const express = require('express');
const router = express.Router();
const getAllLineDataMW = require('../middlewares/line/getAllLineData');

router.get('/',
    getAllLineDataMW()
);

module.exports = router;
