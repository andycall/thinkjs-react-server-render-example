'use strict';
/**
 * model
 */
export default class extends think.model.base {
  init (...args) {
    super.init(...args);
    this.tableName = "user"
  }
}