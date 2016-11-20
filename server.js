`use strict`;

import Koa from "koa";
import Cors from "kcors";
import Router from "koa-router";
import convert from "koa-convert";

const app = new Koa();
const cors = new Cors();
const router = new Router({
  prefix: ``
});

// 指定服务端口号
const PORT = 3008;

// API延迟时间配置
const DELAY = 0; // 0ms

const delay = async(ctx, next) => {
  await new Promise((resolve, reject) => {
    setTimeout(resolve, DELAY);
  });
  await next();
};

// 延迟响应中间件
app.use(delay);
app.use(convert(cors));
app.use(router.routes());

const wrap = (obj) => {
  return JSON.stringify(obj);
};

class server {
  static get(addr, res) {
    router.get(addr, async(ctx, next) => {
      ctx.body = wrap(res);
    });
  }

  static post(addr, res) {
    router.post(addr, async(ctx, next) => {
      ctx.body = wrap(res);
    });
  }
}

export {app, server, router};

// router.get(`*`, async(ctx, next) => {
//   ctx.set(`content-type`, `text/html; charset-utf8`);
//   ctx.body = `<h1>${ctx.status}.</h1>`;
// });
//
// app.listen(PORT, () => {
//   console.log(`[server] http://localhost:${PORT}`);
// });

/** app.listen 其实就是 http.createServer 的语法糖 **/
// const server = http.createServer(app.callback());
// server.listen(PORT, function () {
//   const port = server.address().port;
//   console.log(`[server] http://localhost:${PORT}`);
// });
