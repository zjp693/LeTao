const Koa = require("koa");
const app = new Koa();
const views = require("koa-views");
const json = require("koa-json");
const onerror = require("koa-onerror");
const bodyparser = require("koa-bodyparser");
const logger = require("koa-logger");

const index = require("./routes/index");
const users = require("./routes/users");
var mysql = require("mysql");
// error handler  错误处理
onerror(app);
// 创建连接池
var pool = mysql.createPool({
  connectionLimit: 10, // 连接池最大连接数
  host: "localhost",
  user: "root",
  password: "123456",
  database: "letao",
});

pool.query("SELECT 1 + 1 AS solution", function (error, results, fields) {
  if (error) throw error;
  console.log("The solution is: ", results[0].solution);
});
// middlewares  挂载中间件
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
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
});

// routes 路由
app.use(index.routes(), index.allowedMethods());
app.use(users.routes(), users.allowedMethods());

// error-handling 错误处理
app.on("error", (err, ctx) => {
  console.error("server error", err, ctx);
});

module.exports = app;
