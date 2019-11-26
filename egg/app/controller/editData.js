'use strict';

const Controller = require('egg').Controller;

class EditDataController extends Controller {
  async index() {
    const { ctx } = this;
    const userid = ctx.request.body.userid;
    const option = ctx.request.body.option;
    const newData = ctx.request.body.newData;
    try {
      const result = await ctx.service.user.updateData(userid, option, newData);
      if (result.affectedRows === 1) {
        ctx.body = {
          code: 200,
          message: '修改成功',
        };
      }
    } catch (e) {
      ctx.body = {
        code: 401,
        message: '修改失败',
      };
      console.log(e);
    }
  }
}

module.exports = EditDataController;
