const Koa = require("koa"); //koa 包
const app = new Koa(); //创建 koa 实例
const views = require("koa-views"); // 视图渲染
const json = require("koa-json"); //格式化 json
const onerror = require("koa-onerror"); // 错误处理
const bodyparser = require("koa-bodyparser"); //针对post请求，解析请求体body
const logger = require("koa-logger"); //开发阶段日志记录
const dotenv = require("dotenv"); // 环境变量配置
var jwt = require("koa-jwt"); //解密tokenn
const xmlParser = require("koa-xml-body");
const cors = require("koa-cors");

const { getRanddomStr, getTrade_no } = require("./utils");
// console.log(getTrade_no().length);
// 启动Node env环境 先运行
dotenv.config();

app.use(xmlParser());
// 加载路由
const category = require("./routes/category");
const index = require("./routes/index");
const users = require("./routes/users");
const sms = require("./routes/sms");
const order = require("./routes/order");
//
// const { jwts } = require("./config");
// console.log(jwts);
// error handler  错误处理
onerror(app);

// app.use((ctx) => {
//   ctx.body = ctx.request.body;
// });

// middlewares  挂载中间件
app.use(cors());
app.use(
  bodyparser({
    enableTypes: ["json", "form", "text"],
  })
);
app.use(json());
app.use(logger());
// 静态服务器 主要存放静态资源
app.use(require("koa-static")(__dirname + "/public"));
// pug 模板引擎的配置
app.use(
  views(__dirname + "/views", {
    extension: "pug",
  })
);

// logger  日志中间件
app.use(async (ctx, next) => {
  const start = new Date();
  await next();
  const ms = new Date() - start;
  // console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
});
// 只有在JWT令牌有效的情况下才能到达该行以下的中间件
// unless 排除不需要再请求带token
// app.use(
//   jwt({ secret: jwts }).unless({
//     path: [/^\/public/, /^\/users\/register/, /^\/users\/login/],
//   })
// );

// routes 路由
app.use(category.routes(), category.allowedMethods());
app.use(index.routes(), index.allowedMethods());
app.use(users.routes(), users.allowedMethods());
app.use(sms.routes(), sms.allowedMethods());
app.use(order.routes(), order.allowedMethods());
// error-handling 错误处理
app.on("error", (err, ctx) => {
  console.error("server error", err, ctx);
});

module.exports = app;
