const router = require("koa-router")();

const { register } = require("../controller/users");

// 用户注册
router.post("/register", register);

module.exports = router;
