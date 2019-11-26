'use strict';

module.exports = () => {
  return async function getCode(ctx, next) {
    const page = global[ctx.pageNum];
    const clip = await page.evaluate(() => {
      const { x, y, width, height } = document.getElementById('SafeCodeImg').getBoundingClientRect();
      return { x, y, width, height };
    });
    await page.screenshot({
      path: `app/public/img/code${ctx.num}.png`,
      clip,
    });
    await next();
  };
};
