var express = require('express');
var router = express.Router();

var people_controller = require('../controllers/people_controller');

/* GET users listing. */
router.get('/', people_controller.index);

module.exports = router;
