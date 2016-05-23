'use strict';

import path from 'path'
import React from 'react'
import {renderToString} from 'react-dom/server';
import {match, RouterContext} from 'react-router'

/**
 * middleware
 */
export default class extends think.middleware.base {
  isLogin () {
    let userInfo = this.http._session.data.userInfo;

    return !think.isEmpty(userInfo);
  }


  async getReactBody() {
    let moduleName = this.http.module;
    var module = require(path.join('../../../share/' + moduleName + '.bundle.js'));
    let moduleRoutes = module.routes;
    let ContextComponent = module.context;

    let self = this;

    return new Promise(function (resolve, reject) {
      match({routes: moduleRoutes, location: self.http.url}, (error, redirectLocation, renderProps) => {
        if (error) {
          reject(error);
        }
        else if (redirectLocation) {
          resolve(self.http.redirect(redirectLocation));
        }
        else if (renderProps) {
          resolve(renderToString(<ContextComponent {...JSON.parse(decodeURIComponent(self.http._view.tVar.__CLIENT_DATA__))}>
            <RouterContext {...renderProps} />
          </ContextComponent>));
        }
        else {
          resolve('component not found');
        }
      });
    });
  }

  /**
   * run
   * @return {} []
   */
  async run(content) {

    let data = await this.getReactBody();

    return content.replace(/\{html\}/, data);
  }
}