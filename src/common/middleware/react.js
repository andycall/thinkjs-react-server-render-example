'use strict';

import React, {DOM, body, div, script} from 'react';
import ReactDOMServer from 'react-dom/server';
import path from 'path';

export default class extends think.middleware.base {

    /**
     * 初始化
     * @param {HTTP} http http object
     * @return {undefined}
     */
    init(http) {
        super.init(http);
        let defaultOption = {
          outputPrefix: 'bundle'
        };

        this.option = think.extend(defaultOption, this.config('react'));
    }

    /**
     * middleware 入口
     * @param  {String} content 渲染后的页面字符串
     * @return {Promise} React 服务端渲染后的字符串
     */
    run(content) {
        this.tVar = this.http._view.tVar;
        var page = this.tVar.page;
        var bundleFile = require(path.join('../../../view/output', page + '.' + this.option.outputPrefix));
        var html;
        
        var pageObj = bundleFile(this.http);

        this.controller.assign('html', html);
        this.controller.assign('css', css);
          
        return content;
    }
}
