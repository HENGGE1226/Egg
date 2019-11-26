'use strict';

const Controller = require('egg').Controller;

class QueryCommentController extends Controller {
  async index() {
    const { ctx } = this;
    try {
      const postId = ctx.request.body.postId;
      const result = await ctx.service.post.queryComment(postId);
      for (const i of result) {
        const res = await ctx.service.user.queryUesrExit(i.commentOwner);
        i.username = res.username;
        i.icon = res.icon;
      }
      ctx.body = {
        code: 200,
        message: '获取列表成功',
        list: result,
      };
    } catch (e) {
      console.log(e);
      ctx.body = {
        code: 401,
        message: e,
      };
    }
  }
}

module.exports = QueryCommentController;
