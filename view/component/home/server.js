import React from 'react'
import { renderToString } from 'react-dom/server'
import { match, RoutingContext } from 'react-router'
import routes from './routes/RootRoute'

import Index from './index/index'

import StyleCollector from '../../../webpack-loader/style-collector'

module.exports = function (thinkHttp) {
	var html;
	var css = StyleCollector.collect(function() {	
		html = renderToString(<Index />);
	});
  
   
	return {
    html: html,
    css: css
  };
}