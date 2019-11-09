const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/',
    function(req, res, next) {
      res.json({
            name: "Temalabor backend",
            version: 1,
            deployed: '2019.11.09 17:45'
      });
});

module.exports = router;
