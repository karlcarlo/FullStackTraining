var express = require('express');
var root_router = express.Router();

var people_controller = require('../controllers/people_controller');

/* GET home page. */
root_router.get('/', function(req, res, next) {
  // 验证登录状态
  if(!req.session.person){
    res.redirect('/signin');
    return;
  }

  res.render('index');
});

// auth
root_router.get('/signup', people_controller.signup);
root_router.post('/signup', people_controller.signup);
root_router.get('/signin', people_controller.signin);
root_router.post('/signin', people_controller.signin);
root_router.get('/signout', people_controller.signout);

module.exports = root_router;
