'use strict';

module.exports = () => {
  return function setCookie(ctx, username, userid) {
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
  };
};
