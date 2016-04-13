# thinkjs-react-server-render-example

基于thinkjs的react后端渲染方案，采用webpack编译, 同时集成了react-router

## 如何安装

```
npm install
```

## 如何使用

1. 添加一个叫做admin的模块
```
thinkjs module admin
```
2. 在`www/client` 新建一个`admin`文件夹, 粘贴`www/client/home`文件夹的所有文件

3. 在`pages.js`添加如下的配置

```
var pages = {
    admin: {
        client: './www/client/admin/client.js',
        server: './www/server/admin/server.js'
    }
}
```
4. 到`src/admin/controller/base.js`文件下, 现在顶部添加代码

```
import AdminBundle from '../../../share/home.bundle'
```

5. 再给当前文件的`init`方法下面添加如下的代码

```
this.templateFile = path.join(__dirname, '../../../view/admin/index_index.html');
this.reactBody = HomeBundle(http);
this.assign('html', this.reactBody);
```

6. 运行`npm start`

## 细节阐释

#### 目录划分

前端的所有资源依然按照模块进行划分, 根目录是 `www/client` , 目录划分结构和thinkjs划分module一致
如果有一个module为`home`, 那么 `www/client` 目录下就应该 具有 `home` 文件夹.

所有的组件和路由建议都放在同一个文件夹下面,

路由模块建议放在`route`文件夹
共享的组件放在`components`文件夹

对于每一个分页里的资源都用一个文件夹表示, 例如

+ '/'    : 文件夹名是index,
+ '/test': 文件夹名是test

每一个页面的文件夹存放改页面的所有资源,包含js,css,image等. 文件夹内的目录划分可以自由发挥


#### 模块的入口

在`www/client`下面的每一个模块文件夹内, 都必须有一个浏览器端和服务区端的入口文件
建议分别命名为 `client.js` 和 `server.js`

在根目录的 `pages.js` 里面添加`client.js`和 `server.js`的路径, 这样就可以让webpack对客户端和服务器端分别进行编译

`pages.js` 编辑 `module.exports` 里面暴露的对象, 按照以下的格式进行编辑

```
module.exports = {
    模块名: {
        client: 'client.js文件的路径',
        server: 'server.js文件的路径'
    }
}
```

#### 编译产出

执行客户端编译的`webpack` 会依照依赖将产出放在`www/static`目录下, 同时所有的css文件会合并成一个整体的css
执行服务端编译的`webpack` 会剔除所有的依赖, 同时兼容node引入的方式, 并过滤掉代码中引入的css样式, 将产出放在`share`文件夹下面

##### 执行服务端webpack产出的文件将作为`thinkjs`进行后端渲染的入口

