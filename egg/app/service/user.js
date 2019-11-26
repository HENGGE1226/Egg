'use strict';

const Service = require('egg').Service;
class UserService extends Service {
  // 查询该学号是否存在
  async queryUesrExit(id) {
    const { app } = this;
    const user = await app.mysql.get('user', { userid: id });
    if (user) {
      return user;
    }
    return false;
  }

  // 向用户表中插入用户数据
  async insert(id, name, pwd) {
    const { app } = this;
    const result = await app.mysql.insert('user', {
      username: name,
      userid: id,
      pwd,
    });
    return result;
  }
  // 查询该学号对应的密码是否正确
  async queryPwd(id, pwd) {
    const { app } = this;
    const user = await app.mysql.get('user', { userid: id });
    if (user.pwd === pwd) {
      return true;
    }
    return false;
  }

  // 更新用户的密码
  async updatePwd(id, newPwd) {
    const { app } = this;
    const row = {
      pwd: newPwd,
    };
    const option = {
      where: {
        userid: id,
      },
    };
    const result = await app.mysql.update('user', row, option);
    return result;
  }

  // 获取用户的个人信息
  async queryUser(userid) {
    const { app } = this;
    const result = await app.mysql.get('user', { userid });
    return result;
  }

  // 更新用户的资料
  async updateData(userid, option, newData) {
    const { app } = this;
    const options = {
      where: {
        userid,
      },
    };
    const row = {
      [option]: newData,
    };
    const result = await app.mysql.update('user', row, options);
    return result;
  }

}
module.exports = UserService;
