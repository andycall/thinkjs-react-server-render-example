'use strict'

import { PasswordHash } from 'phpass';
import moment from 'moment'

export default class extends think.model.base {
  getEncryptPassword(password) {
    let passwordHash = new PasswordHash();
    let hash = passwordHash.hashPassword(password);

    return hash;
  }


  checkPassword(userInfo, password) {
    let passwordHash = new PasswordHash();

    return passwordHash.checkPassword(password, userInfo.password);
  }


  /**
   * 用户登陆验证
   *
   * @param string usertext 用户名或者邮箱或者电话号码
   * @param string password 密码
   * @param int    type
   * @param int    type    登陆所需的最小权限
   */
  async signin(usertext, password, ip, type = 0) {
    let user = await this.where({
      name: usertext,
      email: usertext,
      phone: usertext,
      _logic: 'OR'
    }).find();

    if (think.isEmpty(user)) {
      return 'NO_USER';
    }

    if (user.status > 0) {
      return 'USER_DENY';
    }

    if (user.type < type) {
      return 'USER_NO_PERMISSION';
    }

    if (!this.checkPassword(user.password, password)) {
      return 'PASSWORD_ERROR';
    }

    return user;
  }


  addUser(data, ip) {
    let createTime = moment().format('YYYY-MM-DD HH:mm:ss');
    let encryptPassword = this.getEncryptPassword(data.password);

    return this.where({
      name: data.username, email: data.email, _logic: 'OR'
    }).thenAdd({
      name: data.username,
      email: data.email,
      password: encryptPassword,
      create_time: createTime,
      create_ip: ip
    });
  }

  async updateUser(data, ip) {
    let info = await this.where({
      id: data.id
    }).find();
    
    if (think.isEmpty(info)) {
      return Promise.reject(new Error('USER_NOT_EXIST'));
    }
    
    let password = data.password;
    if (password) {
      password = this.getEncryptPassword(password)
    }
    
    let updateData = {};
    
    ['avatar', 'phone', 'level', 'type'].forEach((val, name) => {
      if (data[name]) {
        updateData[name] = val;
      }
    });
    
    if (think.isEmpty(updateData)) {
      return Promise.reject('DATA_EMPTY');
    }
    
    updateData.last_login_time = Date.now();
    updateData.last_login_ip = ip;
   
    return this.where({
      id: data.id
    }).update(updateData);
  }
}