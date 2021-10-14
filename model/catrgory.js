const { query } = require("../db/query");

module.exports.oneCategory = async (id) => {
  return await query("select * from category");
};
// 获取二级分类
module.exports.twoCategory = async (id) => {
  return await query("select * from brand where id = ?", [id]);
};
