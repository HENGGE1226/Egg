'use strict';

const Service = require('egg').Service;
class PostService extends Service {
  // 向动态表中插入数据
  async insert(data) {
    const { app } = this;
    const result = await app.mysql.insert('post', {
      userid: data.userid,
      content: data.content,
      imgList: data.imgList,
      createTime: data.createTime,
    });
    return result;
  }

  // 获取个人动态
  async queryUserPost(userid) {
    const { app } = this;
    const results = await app.mysql.select('post', {
      where: { userid: userid },
      orders: [['createTime', 'desc']]
    });
    return results;    
  }

  // 获取个人发表照片总数
  async getPhotoSum(userid) {
    const { app } = this;
    const results = await app.mysql.select('post', {
      where: { userid: userid },
      columns: ['imgList'],
    });
    return results; 
  }

  // 获取单条动态
  async queryPost(postId) {
    const { app } = this;
    const results = await app.mysql.select('post', {
      where: { postId },
    });
    return results;
  }

  // 获取所有动态
  async queryAll() {
    const { app } = this;
    const results = await app.mysql.select('post', {
      orders: [[ 'createTime', 'desc' ]],
    });
    return results;
  }

  // 发表评论
  async postComment(data) {
    const { app } = this;
    const results = await app.mysql.insert('postcomment', {
      postId: data.postId,
      content: data.content,
      postOwner: data.postOwner,
      commentOwner: data.commentOwner,
      createTime: data.createTime,
    });
    return results;
  }

  // 获取所有评论
  async queryComment(id) {
    const { app } = this;
    const results = await app.mysql.select('postcomment', {
      where: { postId: id },
      orders: [[ 'createTime', 'desc' ]],
    });
    return results;    
  }

}
module.exports = PostService;
