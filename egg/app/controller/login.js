'use strict';

const Controller = require('egg').Controller;

class loginController extends Controller {
  async index() {
    const { ctx } = this;
    console.log('检验不成功，调用爬虫登陆');
    const pageString = ctx.request.body.pageString;
    const page = global[pageString];
    const username = ctx.request.body.username;
    const password = ctx.request.body.password;
    const code = ctx.request.body.code;
    try {
      await page.click('#Form1 > div > div > div.middle > div.dl > div.dlmi > input[type=text]:nth-child(2)');
      await page.keyboard.sendCharacter(`${username}`);
      await page.type('#pwd', password);
      await page.type('#RANDOMCODE', code);
      await page.click('#btnSubmit');
      await page.waitFor(500);
      if (page.url() !== 'http://jwxt.gdufe.edu.cn/jsxsd/framework/xsMain.jsp') {
        await page.waitFor('#Form1 > div > div > div.middle > div.dl > div.dlmi > font');
        const message = await page.evaluate(() => {
          const mes = document.querySelector('#Form1 > div > div > div.middle > div.dl > div.dlmi > font').innerHTML;
          return mes;
        });
        ctx.body = {
          code: 201,
          message,
        };
      } else {
        await page.waitFor('#Top1_divLoginName');
        const name = await page.evaluate(() => {
          const mes = document.querySelector('#Top1_divLoginName').innerHTML;
          return mes;
        });
        const regNum = /\d+/g;
        const regName = /[\u4E00-\u9FA5]+/g;
        // 获取姓名
        const username = regName.exec(name)[0];
        // 获取学号
        const userid = regNum.exec(name)[0];
        // 如果该学号已经存在就更新他的密码，如果不存在就创建这个账号
        const ifExit = await ctx.service.user.queryUesrExit(userid);
        if (ifExit) {
          const result = await ctx.service.user.updatePwd(userid, password);
          if (result.affectedRows === 1) {
            console.log('密码更新成功');
          }
        } else {
          await ctx.service.user.insert(userid, username, password);
        }
        const usernameBuff = new Buffer(username).toString('base64');
        ctx.cookies.set('username', usernameBuff, {
          maxAge: 86400000,
          httpOnly: false,
        });
        ctx.cookies.set('userid', Number(userid), {
          maxAge: 86400000,
          httpOnly: false,
        });
        ctx.session.userInfo = {
          key: 'ygh',
          username,
          userid,
        };
        ctx.body = {
          code: 200,
          message: '登陆成功',
          username,
          userid,
        };
      }
    } catch (e) {
      console.log('error', e);
    }
  }
}

module.exports = loginController;
