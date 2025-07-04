// 引入 Koa 模块
const Koa = require('koa');
const app = new Koa();

// 定义一个简单的中间件
app.use(async (ctx) => {
  ctx.body = 'Hello, Koa 服务!';
});

// 启动服务器
const port = 3000;
app.listen(port, () => {
  console.log(`服务器已启动，访问地址：http://localhost:${port}`);
});
