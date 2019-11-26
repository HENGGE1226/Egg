'use strict';

const Controller = require('egg').Controller;

class PostCommentController extends Controller {
  async index() {
    const { ctx } = this;
    const data = {
      postId: ctx.request.body.postId,
      content: ctx.request.body.content,
      postOwner: ctx.request.body.postOwner,
      commentOwner: ctx.request.body.commentOwner,
      createTime: ctx.request.body.createTime,
    };
    const result = await ctx.service.post.postComment(data);
    if (result.affectedRows === 1) {
      ctx.body = {
        code: 200,
        message: '评论成功',
      };
    } else {
      ctx.body = {
        code: 500,
        message: '服务器错误',
      };
    }
  }
}

module.exports = PostCommentController;
