'use strict';

const Controller = require('egg').Controller;

class CheckController extends Controller {
  async index() {
    const { ctx } = this;
    const key = ctx.session.userInfo.key;
    if (key === 'ygh') {
      ctx.body = {
        code: 200,
        message: '权限通过',
      };
    } else {
      ctx.body = {
        code: 401,
        message: '非法请求',
      };
    }
  }
}

module.exports = CheckController;