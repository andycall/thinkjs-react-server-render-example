'use strict';
/**
 * model
 */
export default class extends think.model.base {
  init (...args) {
    super.init(...args);
    this.tableName = "user"
  }

  async getUserById (userId) {
    return await this.where({
      id: userId
    }).find()
  }
}