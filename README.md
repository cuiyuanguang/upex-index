# otc-web

> otc webapp for pc

## Build Setup

``` bash
# node >= 9.4.0, npm >= 5.6.0
# 基于gulp构建，因此需要全局安装gulp
npm install gulp -g

# install dependencies
npm install

# serve with hot reload at localhost:3000
npm run dev

# build for production with minification
npm run build

```

## 目录结构
  ```
    |-- gulpfile.js       // 构建配置
    |-- .editorconfig     // 编辑器格式配置
    |-- src               // 开发目录
    |  |-- fonts          // 字体
    |  |-- images         // 图片
    |  |-- lib            // 引入的外部库
    |  |-- scripts        // 业务相关的js
    |  |  |-- common      // 通用的js
    |  |  |-- locale      // 多语言配置
    |  |-- styles         // 样式
    |  |  |-- common      // 通用的样式
    |  |-- templates      // 通用的html模板
    |  |-- views          // html页面
    |-- index.html        // 首页
  ```
