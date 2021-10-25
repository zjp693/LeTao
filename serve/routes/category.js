const router = require("koa-router")();
const { oneCategory, twoCategory } = require("../controller/category");
// 获取一级分类
router.get("/oneCategory", oneCategory);

router.get("/twoCategory", twoCategory);
module.exports = router;
