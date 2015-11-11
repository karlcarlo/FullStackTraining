var express = require('express');
var router = express.Router();

var people_controller = require('../controllers/people_controller');
var articles_controller = require('../controllers/articles_controller');


/* GET articles listing. */
router.get('/', articles_controller.index);
// 详情
router.get('/:id', articles_controller.show);

// 验证用户登录状态
router.use(people_controller.authenticate);

// 新建和编辑
router.get('/new', articles_controller.new);
router.get('/:id/edit', articles_controller.edit);

// 创建和更新
router.post('/', articles_controller.create);
router.put('/:id', articles_controller.update);

// 删除
router.delete('/:id', articles_controller.destroy);

module.exports = router;
