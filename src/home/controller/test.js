'use strict';

import Base from './base.js';
import React from 'react'

export default class extends Base {
  /**
   * index action
   * @return {Promise} []
   */
  indexAction() {
    
    return this.display(this.templateFile);
  }
}