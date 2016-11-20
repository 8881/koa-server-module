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

// API延迟时间配置
let delay_time = 0; // 0ms

const delay = async(ctx, next) => {
  await new Promise((resolve, reject) => {
    setTimeout(resolve, delay_time);
  });
  await next();
};

// 延迟响应中间件
app.use(delay);
app.use(convert(cors));
app.use(router.routes());

class server {
  static delay(ms) {
    const m = parseInt(ms, 10);
    delay_time = isNaN(m) ? 0 : m;
  }

  static get(addr, res) {
    router.get(addr, async(ctx, next) => {
      ctx.body = JSON.stringify(res);
    });
  }

  static post(addr, res) {
    router.post(addr, async(ctx, next) => {
      ctx.body = JSON.stringify(res);
    });
  }

  static listen(port) {
    let p = parseInt(port, 10);
    p = isNaN(p) || (!isNaN(p) && (p < 0 || p > 65536)) ? 9000 : p;
    app.listen(p, () => {
      console.log(`[server] http://localhost:${p}`);
    });
  }
}

router.get(`*`, async(ctx, next) => {
  ctx.set(`content-type`, `text/html; charset-utf8`);
  ctx.body = `<h1>${ctx.status}.</h1>`;
});

export {app, server, router};
