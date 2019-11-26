/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1572769891556_6072';

  // add your middleware config here
  config.middleware = [];

/*   config.cors = {
    origin: 'http://localhost:8080',
    credentials: true,
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH',
  }; */

  config.security = {
    csrf: {
      enable: false,
    },
  };

  config.session = {
    key: 'SESSION_ID',
    httpOnly: false,
    encrypt: true,
    renew: true, // 延长会话有效期
  };

  config.mysql = {
    client: {
      // host
      host: 'localhost',
      // 端口号
      port: '3306',
      // 用户名
      user: 'root',
      // 密码
      password: '1042792276',
      // 数据库名
      database: 'gdufe',
    },
    // 是否加载到 app 上，默认开启
    app: true,
    // 是否加载到 agent 上，默认关闭
    agent: false,
  };

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  return {
    ...config,
    ...userConfig,
  };
};
