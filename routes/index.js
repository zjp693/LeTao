const router = require("koa-router")();

// router.get("/", async (ctx, next) => {
//   await ctx.render("index", {
//     title: "Hello Koa 2!",
//   });
// });

// router.get("/string", async (ctx, next) => {
//   ctx.body = "koa2 string";
// });

// router.get("/json", async (ctx, next) => {
//   ctx.body = {
//     title: "koa2 json",
//   };
// });

// 获取宫格列表
const { gridlist, sportList, swipeList } = require("../controller/index");

//获取宫格列表
router.get("/gridList", gridlist);
// 获取运动专区
router.get("/sports", sportList);
// 获取轮播图
router.get("/banners", swipeList);
module.exports = router;
