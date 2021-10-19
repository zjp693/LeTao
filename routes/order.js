const router = require("koa-router")();

const { order } = require("../controller/order");
console.log(order);
// 微信下单
router.post("/order", order);
//
// router.post("/pay/notify", notify);
module.exports = router;
