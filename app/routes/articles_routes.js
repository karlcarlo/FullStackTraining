var express = require('express');
var router = express.Router();

var people_controller = require('../controllers/people_controller');
var articles_controller = require('../controllers/articles_controller');


/* 文章列表 */
router.get('/', articles_controller.index);
// 新建(一定要放到详情路由之前, 否则无法匹配)
router.get('/new', people_controller.authenticate, articles_controller.new);
// 详情
router.get('/:id', articles_controller.show);

// 验证用户登录状态, 之后的路由都会进行校验
router.use(people_controller.authenticate);

// 编辑
router.get('/:id/edit', articles_controller.edit);

// 创建和更新
router.post('/', articles_controller.create);
router.put('/:id', articles_controller.update);

// 删除
router.delete('/:id', articles_controller.destroy);

module.exports = router;
