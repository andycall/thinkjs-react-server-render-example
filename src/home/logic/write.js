'use strict';
/**
 * logic
 * @param  {} []
 * @return {}     []
 */
export default class extends think.logic.base {
  /**
   * index action logic
   * @return {} []
   */
  indexAction() {

  }

  submitAction () {
    this.allowMethods = 'post'

    let rules = {
      title: "string",
      content: "string",
      obj: "string"
    }
    
    let flag = this.validate(rules);
    if(!flag){
      return this.fail("validate error", this.errors());
    }
  }
}