'use strict';

import path from 'path'
import React from 'react'
import {renderToString} from 'react-dom/server';
import {match, RouterContext} from 'react-router'

/**
 * middleware
 */
export default class extends think.middleware.base {
  /**
   * run
   * @return {} []
   */
  async run() {
    if (this.http.isAjax() || this.http.isPost()) {
      return;
    }


    let moduleName = this.http.module;
    var module = require(path.join('../../../share/' + moduleName + '.bundle.js'))
    let moduleRoutes = module.routes;
    let ContextComponent = module.context;

    let self = this;

    return new Promise((resolve, reject) => {
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
        }
      })
    }).then((body) => {
      self.http._view.tVar.html = body;
    }).catch((err) => {
      console.error(err);
      this.http.fail(500, err);
    })
  }
}