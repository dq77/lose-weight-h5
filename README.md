<!--
 * @Author: 刁琪
 * @Date: 2020-07-23 14:23:13
 * @LastEditors: わからないよう
-->
<p align="center">
  减肥网页版，前端项目基于React + AntDesign设计，图表使用Echart
</p>

<p align="center">
  <a href="https://github.com/facebook/react">
    <img src="https://img.shields.io/badge/react-16.9.0-brightgreen.svg" alt="react">
  </a>
  <a href="https://github.com/ant-design/ant-design-mobile/">
    <img src="https://img.shields.io/badge/ant--design--mobile-2.3.1-yellow.svg" alt="ant-design-mobile">
  </a>
  <a href="https://github.com/dq77/lose-weight-h5">
    <img src="https://img.shields.io/badge/lose--weight-1.5.4-success.svg" alt="loseweight">
  </a>
  <a href="https://github.com/apache/incubator-echarts">
    <img src="https://img.shields.io/badge/echarts-4.8.0-blue.svg" alt="echarts">
  </a>
  <a href="https://github.com/dq77/lose-weight-h5/blob/master/LICENSE">
    <img src="https://img.shields.io/github/license/dq77/lose-weight-h5.svg" alt="license">
  </a>
  <a href="https://github.com/PanJiaChen/vue-element-admin/releases">
    <img src="https://img.shields.io/github/release/PanJiaChen/vue-element-admin.svg" alt="GitHub release">
  </a>
  <a href="https://gitter.im/vue-element-admin/discuss">
    <img src="https://badges.gitter.im/Join%20Chat.svg" alt="gitter">
  </a>
  <a href="https://panjiachen.gitee.io/vue-element-admin-site/zh/donate">
    <img src="https://img.shields.io/badge/%24-donate-ff69b4.svg" alt="donate">
  </a>
</p>

## 前序准备

你需要在本地安装 [node](http://nodejs.org/) 和 [git](https://git-scm.com/)。本项目技术栈基于 [ES2015+](http://es6.ruanyifeng.com/)、[React](https://react.docschina.org/)、[Redux](https://www.redux.org.cn/)、[React-router](http://react-guide.github.io/react-router-cn/) 、[axios](https://github.com/axios/axios) 和 [ant-design-mobile](https://mobile.ant.design/index-cn)，所有的请求数据都使用[Mock.js](https://github.com/nuysoft/Mock)模拟，提前了解和学习这些知识会对使用本项目有很大的帮助。

## 项目目录规范
```

- 网页版所有页面的公共样式写在   @/index.scss 中
- 所有的页面都在page 文件夹下，并且已模块分类  比如用户--user 单个模块下的公共组件放在views/模块文件夹/components 下
- 路由也以模块分别定义文件， 在router 文件下 modules 下根据模块名称定义 然后导入到 router/index.js 下
- store 文件下 为 redux 文件, 用来做 数据的状态管理，同样在modules 文件夹下添加当前模块的文件
- font 文件夹下用来存在 iconfont 图标, 如需要添加自己的图标到 [IconFont减肥网页版](https://www.iconfont.cn/manage/index?spm=a313x.7781069.1998910419.db775f1f3&manage_type=myprojects&projectId=2036807) 上选择并下载fontClass 图标放到当前目录下
- 所有的接口封装按照模块定义在 @/api 下，例如 @/api/user.js 表示用户模块
- public 何时使用
  - 你需要在构建输出中指定一个文件的名字。
  - 你有上千个图片，需要动态引用它们的路径。
  - 有些库可能和 webpack 不兼容，这时你除了将其用一个独立的 <script> 标签引入没有别的选择。

```


## 开发

```bash
# 克隆项目
git clone https://github.com/dq77/lose-weight-h5

# 安装依赖
npm install

# 建议不要用 cnpm 安装 会有各种诡异的bug 可以通过如下操作解决 npm 下载速度慢的问题
npm install --registry=https://registry.npm.taobao.org

# 启动服务
npm start
```

浏览器访问 http://localhost:3000

## 发布

```bash
# 构建测试环境
npm run build

# 构建生产环境
npm run build
```

## 其他说明
```

- 打包后文件在build文件夹中
- 打包后url请求路径在正式环境配置文件中，需自行更改
- 若存在跨域，需配置Nginx反向代理
- 其他问题微信联系我
```

--------
本项目已与百度公司达成合作，更多信息请 [百度搜索](https://www.baidu.com/)

