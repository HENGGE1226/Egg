'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    const { ctx } = this;
    ctx.body = {
      code: 200,
      message: '获取成功',
      num: ctx.num,
      pageNum: ctx.pageNum,
    };
  }
}

module.exports = HomeController;
