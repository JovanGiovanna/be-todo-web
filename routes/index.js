var express = require('express');
var router = express.Router();

//greeting API
router.get('/', function (req, res) {
  res.send('halo');
});

module.exports = router;
