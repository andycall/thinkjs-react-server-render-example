'use strict';

import path from 'path'
import React from 'react'
import {renderToString} from 'react-dom/server';
import {match, RouterContext} from 'react-router'

/**
 * middleware
 */
export default class extends think.middleware.base {
  async getReactBody() {
    let moduleName = this.http.module;
    var module = require(path.join('../../../share/' + moduleName + '.bundle.js'))
    let moduleRoutes = module.routes;
    let ContextComponent = module.context;

    let self = this;

    return new Promise(function (resolve, reject) {
      match({routes: moduleRoutes, location: self.http.url}, (error, redirectLocation, renderProps) => {
        if (error) {
          reject(error);
        }
        else if (redirectLocation) {
          self.http.redirect(redirectLocation);
        }
        else if (renderProps) {
          resolve(renderToString(<ContextComponent token={self.http._session.data.__CSRF__}>
            <RouterContext {...renderProps} />
          </ContextComponent>));
        }
        else {
          self.http.fail('COMPONENT_NOT_FOUND');
          // resolve('404 not found');
        }
      });
    });
  }

  /**
   * run
   * @return {} []
   */
  async run() {
    if (this.http.isAjax() || this.http.isPost()) {
      return;
    }

    var body = await this.getReactBody();

    this.http._body = body;

    return body;
  }
}