'use strict';

const Controller = require('egg').Controller;

class UserMessageController extends Controller {
  async index() {
    const { ctx } = this;
    const userid = ctx.request.body.userid;
    try {
      const result = await ctx.service.user.queryUser(userid);
      const imgList = await ctx.service.post.queryUserPost(userid);
      let imgSum = 0;
      if(imgList) {
        const final = [...imgList];
        result.imgList = final;
        for(const i of final) {
          const item = i.imgList.split(',');
          imgSum += item.length;
        }
      }
      ctx.body = {
        code: 200,
        message: '获取成功',
        userData: result,
        imgSum,
      };
    } catch (e) {
      ctx.body = {
        code: 401,
        message: '获取失败',
        error: e,
      };
    }
  }
}

module.exports = UserMessageController;
