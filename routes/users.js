const router = require("koa-router")();

const { register, login } = require("../controller/users");
// // 自动给当前接口加/users
router.prefix("/users");
// 用户注册
router.post("/register", register);
// 用户登录
router.post("/login", login);

module.exports = router;
