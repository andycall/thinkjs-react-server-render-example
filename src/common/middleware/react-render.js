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
    let moduleName = this.http.module;
    let moduleRoutes = require(path.join('../../../share/' + moduleName + '.bundle.js'));
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
          resolve(renderToString(<RouterContext {...renderProps}/>));
        }
        else {
          self.http.fail('COMPONENT_NOT_FOUND');
        }
      })
    }).then((body) => {
      this.http._reactBody = body;
    }).catch((err) => {
      this.http.fail(err);
    })
  }
}