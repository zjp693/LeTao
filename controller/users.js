const Joi = require("joi");
const { register } = require("../model/users");

module.exports.register = async (ctx) => {
  // console.log(ctx.request.body);
  const { username, password, mobile } = ctx.request.body;
  // 参数校验 是否合法   不合法返回提示信息  并return 退出
  const schema = Joi.object({
    username: Joi.string().min(4).max(20).required(),
    password: Joi.string().pattern(/^[a-zA-Z0-9]{6,20}$/),
    repeat_password: Joi.ref("password"),
    mobile: Joi.string().pattern(
      /^1(3\d|4[5-9]|5[0-35-9]|6[2567]|7[0-8]|8\d|9[0-35-9])\d{8}$/
    ),
  });
  // 操作数据库模型model
  await register(username, password, mobile);

  ctx.body = {
    status: 200,
    msg: "注册成功",
  };
};
