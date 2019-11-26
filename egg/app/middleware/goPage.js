'use strict';

const puppeteer = require('puppeteer');

module.exports = () => {
  return async function goPage(ctx, next) {
    console.log('logo');
    try {
      const browser = await puppeteer.launch({
        headless: true,
      });
      const page = await browser.newPage();
      await page.setViewport({
        width: 1920,
        height: 1080,
      });
      await page.goto('http://jwxt.gdufe.edu.cn/jsxsd/');
      const num = Math.ceil(Math.random() * 10 * Math.random() * 35);
      const pageString = 'page' + num;
      ctx.num = num;
      ctx.pageNum = pageString;
      global[pageString] = page;
    } catch (e) {
      ctx.body = {
        code: 500,
        message: '服务器错误',
      };
    }
    await next();
  };
};
