// 检测登陆用户是否已在数据库

'use strict';

module.exports = () => {
  return async function userRepeat(ctx, next) {
    console.log('检验用户');
    const userid = Number(ctx.request.body.username);
    const password = ctx.request.body.password;
    const user = await ctx.service.user.queryUesrExit(userid);
    const username = user.username;
    if (username) {
      const ifPwdCorrect = await ctx.service.user.queryPwd(userid, password);
      console.log('correct', ifPwdCorrect);
      if (ifPwdCorrect) {
        // 用户存在且密码正确直接setCookie
        const usernameBuff = new Buffer(username).toString('base64');
        ctx.cookies.set('username', usernameBuff, {
          maxAge: 86400000,
          httpOnly: false,
        });
        ctx.cookies.set('userid', userid, {
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
        console.log('检验成功');
        return;
      }
    }
    await next();
  };
};
