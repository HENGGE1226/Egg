'use strict';
// 发帖
const Controller = require('egg').Controller;

class deliverController extends Controller {
  async index() {
    const { ctx } = this;
    const data = {
      userid: ctx.request.body.userid,
      content: ctx.request.body.postValue || '',
      imgList: ctx.request.body.imgList || '',
      createTime: ctx.request.body.createTime,
    };
    try {
      const result = await ctx.service.post.insert(data);
      if (result.affectedRows === 1) {
        ctx.body = {
          code: 200,
          message: '发表成功',
        };
      } else {
        ctx.body = {
          code: 500,
          message: '服务器错误',
        };
      }
    } catch (e) {
      console.log(e);
      ctx.body = {
        code: 401,
        message: e,
      };
    }
  }
}

module.exports = deliverController;
