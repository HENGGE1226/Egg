'use strict';

const Controller = require('egg').Controller;

class QueryAllController extends Controller {
  async index() {
    const { ctx } = this;
    try {
      const result = await ctx.service.post.queryAll();
      const resiltList = [];
      for (const i of result) {
        const res = await ctx.service.user.queryUesrExit(i.userid);
        const comment = await ctx.service.post.queryComment(i.postId);
        i.commentCount = comment.length;
        if (i.imgList) {
          i.imgList = (i.imgList).split(',');
          i.swiperList = [];
          for (const j in i.imgList) {
            const obj = {
              id: Number(j),
              imgUrl: i.imgList[j],
            };
            i.swiperList.push(obj);
          }
        }
        i.username = res.username;
        i.icon = res.icon;
        delete i.imgList;
        resiltList.push(i);
      }
      ctx.body = {
        code: 200,
        message: '获取列表成功',
        list: resiltList,
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

module.exports = QueryAllController;