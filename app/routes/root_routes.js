var express = require('express');
var root_router = express.Router();

var people_controller = require('../controllers/people_controller');
var articles_controller = require('../controllers/articles_controller');

/* GET home page. */
root_router.get('/', articles_controller.index);

root_router.get('/admin', people_controller.authenticate, function(req, res, next) {
  res.render('index', { layout: 'layouts/admin' });
});

// auth
root_router.get('/signup', people_controller.signup);
root_router.post('/signup', people_controller.signup);
root_router.get('/signin', people_controller.signin);
root_router.post('/signin', people_controller.signin);
root_router.get('/signout', people_controller.signout);

module.exports = root_router;
