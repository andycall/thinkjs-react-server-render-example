'use strict';

import React, {DOM, body, div, script} from 'react';
import {renderToString} from 'react-dom/server';
import ServerBundle from '../../../share/output/home.bundle'

export default class extends think.middleware.base {

    /**
     * 初始化
     * @param {HTTP} http http object
     * @return {undefined}
     */
    init(http) {
        super.init(http);
    }

    /**
     * middleware 入口
     * @param  {String} content 渲染后的页面字符串
     * @return {Promise} React 服务端渲染后的字符串
     */
    run() {
        return ServerBundle(this.http);
    }
}
