const { default: axios } = require("axios");
const {
  createOrder,
  createsing,
  getTrade_no,
  getRanddomStr,
  createSign,
} = require("../utils");

const { appid, mch_id, notify_url, orderUrl } = require("../config/wx");
const QRCode = require("qrCode");
// 微信下单
module.exports.order = async (ctx) => {
  // 前端调用下单需要的参数
  const { body, total_fee, spbill_create_ip, trade_type } = ctx.request.body;
  console.log(ctx.request);
  const params = {
    appid, //公众号id
    mch_id, //商户号
    nonce_str: getRanddomStr(), //32位数以内的随机数字符
    // sing, //签名
    body, // 商品描述
    out_trade_no: getTrade_no(), // 商户订单号
    total_fee, // 金额
    spbill_create_ip, //终端ip
    notify_url, // 微信服务器回调的地址
    trade_type, // 支付类型
  };

  // 生成签名
  const sing = createSign(params);
  // console.log(sing);
  // console.log(11111);
  // 请求参数新增sing属性
  params.sing = sing;
  let sendData = `
  <xml>
  <appid>${appid}</appid>
  <body>${body}</body>
  <mch_id>${mch_id}</mch_id>
  <nonce_str>${params.nonce_str}</nonce_str>
  <notify_url>${notify_url}</notify_url>
  <out_trade_no>${params.out_trade_no}</out_trade_no>
  <spbill_create_ip>${spbill_create_ip}</spbill_create_ip>
  <total_fee>${total_fee}</total_fee>
  <trade_type>${trade_type}</trade_type>
  <sign>${sing}</sign>
</xml>
`;

  const data = await createOrder(orderUrl, sendData);
  // 下单成功

  const { return_code, return_msg, result_code, code_url } = data;
  if (
    return_code == "SUCCESS" &&
    return_msg == "OK" &&
    result_code == "SUCCESS"
  ) {
    data.payURL = await QRCode.toDataURL(code_url);
  }
  ctx.body = {
    status: 200,
    data,
  };
};
