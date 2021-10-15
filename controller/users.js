// 表单校验
const Joi = require("joi");
//密码机
const { cryptoPwd } = require("../utils");
const { secret } = require("../config");
const { register, findUserByName, login } = require("../model/users");
const { log } = require("debug");

module.exports.register = async (ctx) => {
  const { username, password, mobile } = ctx.request.body;
  const user = await findUserByName(username);
  // 参数校验 是否合法   不合法返回提示信息  并return 退出
  const schema = Joi.object({
    username: Joi.string().min(4).max(20).required(),
    password: Joi.string().pattern(/^[a-zA-Z0-9]{6,20}$/),
    repeat_password: Joi.ref("password"),
    mobile: Joi.string().pattern(
      /^1(3\d|4[5-9]|5[0-35-9]|6[2567]|7[0-8]|8\d|9[0-35-9])\d{8}$/
    ),
  });

  const verify = schema.validate({ username, password, mobile });
  // 如果校验不通过，要return
  if (verify.error) {
    ctx.body = {
      status: 0,
      message: verify.error.details[0].message,
    };
    return;
  }
  // // 操作数据库模型model
  // await register(username, cryptoPwd(password + secret), mobile);
  const result = await await register(
    username,
    cryptoPwd(password + secret),
    mobile
  );

  if (user[0]) {
    ctx.body = {
      status: 100,
      message: "该用户已注册",
    };
  } else {
    await register(username, cryptoPwd(password + secret), mobile);
    ctx.body = {
      status: 200,
      msg: "注册成功",
    };
  }
};
// 用户登录
module.exports.login = async (ctx) => {
  const { username, password } = ctx.request.body;
  // console.log(ctx.request.body.username, "11");
  console.log(ctx.request.body.username);
  console.log(password);
  const result = await login(username, password);
  console.log(result);
  if (result[0]) {
    ctx.body = {
      code: 200,
      userInfo: {
        username: result[0].username,
        mobile: result[0].mobile,
      },
      msg: "登录成功",
    };
  } else {
    console.log(111);
  }
};
