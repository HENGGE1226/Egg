'use strict';
const Controller = require('egg').Controller;

class queryPostController extends Controller {
  async index() {
    const { ctx } = this;
    const postId = ctx.request.body.postId;
    try {
      const result = await ctx.service.post.queryPost(postId);
      const comment = await ctx.service.post.queryComment(postId);
      const user = await ctx.service.user.queryUesrExit(result[0].userid);
      result[0].username = user.username;
      result[0].icon = user.icon;
      result[0].commentCount = comment.length;
      if (result) {
        ctx.body = {
          code: 200,
          message: '获取成功',
          postItem: result,
        };
      } else {
        ctx.body = {
          code: 401,
          message: '错误',
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

module.exports = queryPostController;
