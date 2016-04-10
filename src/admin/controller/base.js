'use strict';

export default class extends think.controller.base {
  /**
   * some base method in here
   */
  
  async __before () {
    let http = this.http;
    var errorMount = await this.session('errorMount');
    
    if (errorMount > 10) {
      this.fail('MAX_MOUNT_ERROR');
    }
    
    if (http.controller === 'admin' && http.action === 'login') {
      return;
    }
    
    let userInfo = await this.session('userInfo') || {};
    
    if (think.isEmpty(userInfo)) {
      if (this.isAjax()) {
        return this.fail('NOT_LOGIN');
      }
      else {
        return this.redirect('../home/index#login');
      }
    }
    
    this.userInfo = userInfo;
    
    if (!this.isAjax()) {
      this.assign('userInfo', {
        id: userInfo.id,
        name: userInfo.username,
        email: userInfo.email
      });
    }
  }
  

}