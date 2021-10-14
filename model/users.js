const { query } = require("../db/query");

// 注册
module.exports.register = async (username, password, mobile) => {
  return await query(
    `insert into user (username, password, mobile) values( "${username}", "${password}", "${mobile}")`
  );
};
