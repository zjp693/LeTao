const { oneCategory, twoCategory } = require("../model/catrgory");

// 获取一级分类
module.exports.oneCategory = async (ctx) => {
  // let oneCategory = await query("select * from category");
  console.log(200);
  const result = await oneCategory();
  ctx.body = {
    status: 200,
    oneCategoryList: result,
  };
};
// 获取第二级分类
module.exports.twoCategory = async (ctx) => {
  const { id } = ctx.request.query;
  let result = await twoCategory(id);
  console.log(id);
  // console.log(ctx.request.query);
  ctx.body = {
    status: 200,
    twoCategoryList: result,
  };
};
