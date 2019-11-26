'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  const goPage = app.middleware.goPage;
  const getCode = app.middleware.getCode;
  const userRepeat = app.middleware.userRepeat;
  // const getHashCode = app.middleware.hashCode;
  // 验证用户权限
  router.get('/checkUser', controller.checkUser.index);
  // 获取验证码
  router.get('/', goPage(), getCode(), controller.home.index);
  // 刷新验证码
  router.get('/repeatCode', getCode(), controller.home.index);
  // 获取个人信息
  router.post('/getMessage', controller.userMessage.index);
  // 登陆
  router.post('/login', userRepeat(), controller.login.index);
  // 获取七牛云上传token
  router.get('/getToken', controller.getToken.index);
  // 用户发表动态
  router.post('/deliverPost', controller.deliverPost.index);
  // 获取所有用户的动态
  router.get('/queryAll', controller.queryAllList.index);
  // 获取单条动态的详情
  router.post('/queryPostById', controller.queryPost.index);
  // 更改用户头像
  router.post('/editIcon', controller.editData.index);
  // 发表评论
  router.post('/postComment', controller.postComment.index);
  // 获取所有评论
  router.post('/queryAllComment', controller.queryComment.index);
};
