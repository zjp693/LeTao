const { sendsms, getRanddomByLength } = require("../utils");
module.exports.sendsms = async (ctx) => {

  const { mobile } = ctx.request.body;

  // 短信验证码
  const code = getRanddomByLength(6);
  const result = await sendsms(mobile, code);

  if (result.SendStatusSet[0].Code !== "OK") {
    ctx.body = {
      status: 200,
      code,
      message: "短信发送成功",
    };
  } else {
    ctx.body = {
      status: 0,
      message: "短信发送失败",
    };
  }
};
