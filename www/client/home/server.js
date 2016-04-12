import React from 'react'
import {renderToString} from 'react-dom/server';
import {match, RouterContext} from 'react-router'
import routes from './route/IndexRoute'

module.exports = function (http) {
  return new Promise((resolve, reject) => {
    match({routes, location: http.url}, (error, redirectLocation, renderProps) => {
      if (error) {
        reject(error);
      }
      else if (redirectLocation) {
        resolve(http.redirect(redirectLocation));
      }
      else if (renderProps) {
        http._body = renderToString(<RouterContext {...renderProps}/>)
        resolve(http._body);
      }
    })
  });
}