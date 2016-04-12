'use strict';

import Base from './base.js';
import React from 'react'

export default class extends Base {
  /**
   * index action
   * @return {Promise} []
   */
  indexAction() {
    let body = this.http._body;

    this.assign('html', body);

    return this.display(this.templateFile);
  }
}