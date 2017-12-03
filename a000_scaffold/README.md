# React 拾遗：React 项目脚手架

> 系统参数：
MacOS 10.12.6
Node.js: v8.2.1
yarn: 1.3.2

## 摘要
本文介绍：
* 如何安装 React 项目启动的前置依赖：Node.js 与 yarn
* React 项目脚手架的结构
* 三大主要文件的讲解：package.json, webpack.config.js, .babelrc

**项目代码地址：[React拾遗：项目脚手架](https://gitee.com/TimmLee/React-Perls/tree/master/a000_scaffold)**

## 如何使用脚手架

### 1 安装 Node.js

两种方法安装：
* 官网下载对应平台的 Node.js 安装包，然后直接安装。
* 使用 Node 版本控制器（即，[NVM](https://github.com/creationix/nvm)，全称 Node Version Manager）安装 Node.js

NVM 的好处是可以同时安装多个任意版本的 Node.js，而且每个版本之间的全局安装包相互不会影响。

下面介绍在 MacOS 平台下，NVM 的安装和简单使用方法。NVM 的详细使用方法可以参考 [node版本控制工具nvm](http://www.jianshu.com/p/0cfeed299f2a)。

**安装 NVM**
在命令行输入。（MacOS 如果没有自带 curl 命令，则可能需要先安装 Xcode Command Line Tools）
```
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.6/install.sh | bash
```

继续在命令行中，安装指定版本的 Node.js。比如这里安装 Node.js 8.2.1 版本。
```
NVM_NODEJS_ORG_MIRROR=https://npm.taobao.org/mirrors/node nvm install 8.2.1
```

确认安装成功：

用 NVM 查看当前 Node.js 版本。
```
> nvm ls
->       v8.2.1
default -> 8.2.1 (-> v8.2.1)
```

用 node 命令查看版本号
```
> node -v
v8.2.1
```

查看 Node.js 安装位置。（这个位置在配置 Sublime JsPrettier 时有用）
```
> which node
/Users/mac/.nvm/versions/node/v8.2.1/bin/node
```


**更换国内淘宝源**
因为众所周知的原因，把 npm 的源更换成国内的源，各种 npm 包的安装速度更快。更换国内源的方法参考文章：[解决 npm install electron 卡在 node install.js 的问题](http://www.jianshu.com/p/933fb3edd6c8)。

具体操作是：

进入并编辑 npm 的配置文件： `.npmrc`：
```
vim ~/.npmrc
```

编辑内容，修改为以下内容，就能保证 npm 是从国内淘宝源进行安装。
```
registry=https://registry.npm.taobao.org
sass_binary_site=https://npm.taobao.org/mirrors/node-sass/
phantomjs_cdnurl=http://npm.taobao.org/mirrors/phantomjs
electron_mirror="https://npm.taobao.org/mirrors/electron/"
```


### 2 全局安装 yarn

在命令行输入，建议指定版本 1.3.2。(本项目内的包安装，尽量指定版本，确保结果一致)。
```
npm install -g yarn@1.3.2
```

yarn 的使用参考：[JavaScript 包管理工具 yarn 的使用](http://www.jianshu.com/p/602b68ae0703)

### 3 安装项目 npm 包

进入项目所在的目录，
```
cd React-Perls
```

然后用 yarn 安装
```
yarn install
```

### 4 启动项目

#### 1 测试服务器 webpack-dev-server 方式

在项目目录下，用命令行输入（该命令实际是运行 package.json 里面的脚本命令，可以自己编写）
```
yarn run dev-server
```

命令行提示：项目运行在 `http://localhost:8080/` （或者其他端口）。
```
...
Project is running at http://localhost:8080/
```

在浏览器中访问该地址，即可显示本项目的欢迎页面:
```
React Project Scaffold

Welcome to React world!
``` 


#### 2 webpack 打包后访问

```
yarn build
```

打开项目中的 public 目录中的 index.html 即可。



## 项目脚手架目录
目录结构如下
```
.
├── .babelrc
├── .gitignore
├── node_modules
├── package.json
├── public
├── src
│   ├── App.js
│   ├── index.js
│   └── template.html
├── webpack.config.js
└── yarn.lock
```
第一层有3个目录
* `node_modules`: npm 包文件目录，所有通过 npm install 或者 yarn add 安装的包，都在这个目录下。
* `public`: webpack 打包输出目录
* `src`: source 文件夹，存放代码的位置。其中 index.js 是入口 js 文件，template.html 是 html 模板文件，用于 webpack 打包输出 index.html。

另外项目中最主要的三个文件：
* `package.json`: npm 包管理文件，控制包的版本，另外里面有 scripts 命令行脚本命令，可以设置打包、启动测试服务器、删除 webpack 输出文件夹等命令。
* `.babelrc`：配置 babel 的编译规则。
* `webpack.config.js`：webpack 配置文件，设置输入、输出、loader 预处理，plugins 额外处理等内容。

## package.json
主要用于控制 npm 包版本，以及编写 scripts 脚本命令。

**完整的依赖管理文件 package.json 如下**
```
{
  "name": "myProject",
  "version": "1.0.0",
  "main": "index.js",
  "license": "MIT",
  "scripts": {
    "clean": "rimraf public",
    "build": "yarn run clean && webpack",
    "dev-server": "webpack-dev-server"
  },
  "devDependencies": {
    "autoprefixer": "7.1.5",
    "babel-core": "6.26.0",
    "babel-loader": "7.1.2",
    "babel-plugin-transform-class-properties": "6.24.1",
    "babel-plugin-transform-object-rest-spread": "6.26.0",
    "babel-preset-env": "1.6.0",
    "babel-preset-react": "6.24.1",
    "css-loader": "0.28.7",
    "file-loader": "1.1.5",
    "html-webpack-plugin": "2.30.1",
    "postcss-loader": "2.0.7",
    "rimraf": "2.6.2",
    "style-loader": "0.19.0",
    "url-loader": "0.6.2",
    "webpack": "3.6.0",
    "webpack-dev-server": "2.9.1"
  },
  "dependencies": {
    "react": "16.0.0",
    "react-dom": "16.0.0"
  }
}
```

用 npm 完全没有问题，只是这里采用了 yarn 而不是 npm，所以这里 scripts 中使用 `yarn run ` 命令。

有了这个 package.json 以后，可以直接 `yarn install` 就能把对应版本的包安装到 node_modules 目录下。（前提是已经通过 `sudo npm install -g yarn` 全局安装了 yarn）

### 1 React 依赖包
```
    "react": "16.0.0",
    "react-dom": "16.0.0"
```
生产和开发环境都需要使用的 react 以及 react-dom，这里采用了最新的 React 16 版本。后面还会安装 react-redux, react-router-dom, redux-thunk 等。

### 2 Webpack 依赖包
```
    "webpack": "3.6.0",
    "webpack-dev-server": "2.9.1"
```
其中 webpack 是前端工程化经常使用的工具，而 webpack-dev-server 是开发测试服务器，兼具自动重新打包功能。

### 3 Babel 系列依赖包
全部放在开发依赖 devDependencies 部分
```
    "babel-core": "6.26.0",
    "babel-loader": "7.1.2",
    "babel-plugin-transform-class-properties": "6.24.1",
    "babel-plugin-transform-object-rest-spread": "6.26.0",
    "babel-preset-env": "1.6.0",
    "babel-preset-react": "6.24.1",
```
* "babel-loader": "7.1.2"
Babel 针对 Webpack 做的 loader，可以结合 webpack 对 js 或者 jsx 文件进行预处理。

* "babel-core": "6.26.0"
Babel 的核心编译包，但是不包含编译规则（编译集 preset）。

* "babel-preset-env": "1.6.0"
包括 es2015, es2016, es2017 等所有内容，不需要单独安装es2015 的包，在 npm 或者 yarn 安装时会有提示。

* "babel-preset-react": "6.24.1"
React JSX 语法的编译规则。

* "babel-plugin-transform-class-properties": "6.24.1"
babel 插件，增加 ES 7 中类的新属性。由于该新语法正在起草，所以暂时放在 babel 插件中。据悉也可以使用 stage2，也有同样效果。关于类的新属性，后面有举例讲解。

* "babel-plugin-transform-object-rest-spread": "6.26.0"
spread 语法的 babel 插件。

### 4 Webpack 的 css 处理 loader
两个包可以实现 css 的模块化，把 css 打包进 js 文件中。如果需要把 css 单独打包出来，需要使用 **[extract-text-webpack-plugin](https://github.com/webpack-contrib/extract-text-webpack-plugin)**
```
    "css-loader": "0.28.7",
    "style-loader": "0.19.0",
```

### 5 Webpack 的 postcss 处理 loader
主要使用 autoprefixer，这样可以正常写 css，而 postcss 的 autoprefiexer 功能可以自动加上各种浏览器的前缀，特别是动画效果部分的 css。
```
    "autoprefixer": "7.1.5",
    "postcss-loader": "2.0.7",
```

### 6 Webpack 的图片处理 loader
主要是 url-loader，而 file-loader 是前者的依赖。
```
    "file-loader": "1.1.5",
    "url-loader": "0.6.2",
```


## .babelrc

**完整的 babel 配置文件 `.babelrc` 如下**
```
{
  "presets": ["env", "react"],
  "plugins": ["transform-class-properties", "transform-object-rest-spread"]
}
```
`.babelrc` 是 babel 的配置文件。有些项目的配置喜欢把 babel 的配置放在 webpack 里面 babel-loader 下面的 query 中。建议单独放在 `.babelrc` 文件进行配置。

* env: 包含了目前截至 es2017 的 babel 包。不用单独去安装 es2015，如果单独安装，npm 或者 yarn 都会提示可以直接安装 babel-preset-env。
* react: 编译jsx用
* transform-class-properties: es7语法，解决类中函数没有绑定 this 的问题。使用了这个插件以后，可以使用ES 7中的新类的方法。

```
// 旧类函数要绑定this，而且类属性放在构造方法constructor
class OldClass {
  constructor() {
    this.name = 'Jim';
    this.printName = this.printName.bind(this);
  }
  printName () {
    console.log(this.name);
  }
}

const oldClass = new OldClass();
const oldPrintName = oldClass.printName;
oldPrintName();

// 新类属性可以直接放在构造方法外，新类函数用箭头函数就可以不用绑定this
class NewClass {
  name = 'Jim';
  printName = () => {
    console.log(this.name);
  }
}
const newClass = new NewClass();
const newPrintName = newClass.printName;
newPrintName();
```
* transform-object-rest-spread: 是需要使用解析方法 `{...variable}` 以及 `[...variable]`。

## webpack.config.js

* 不常更改的公用js部分提取出放在 vendor 里面，而自己的 js 部分打包在 bundle.js，便于浏览器缓存，不用每次都发送一个很大的 js 文件。
* loader 处理 js, css, 以及图片。
* css-loader 的options写法，主要是把 css 进行模块化，做成 scoped css，防止 css 在全局的命名冲突。
```
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              modules: true,
              localIdentName: '[name]__[local]__[hash:base64:5]'
            }
```
* postcss-loader 主要是用 autoprefixer 插件，可以给 css 自动加上 --webkit- 等浏览器前缀，对应浏览器是最近的两个浏览器版本。
```
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              plugins: () => [
                autoprefixer({
                  browsers: ['> 1%', 'last 2 versions']
                })
              ]
            }
```
* plugins 是把 js 和 css 注入到 template.html 最后变成 index.html 输出。另外也把 vendor 的变化都放在 manifest 中。

**完整的 webpack 配置文件 webpack.config.js 如下**
```
const path = require('path');
const autoprefixer = require('autoprefixer');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require("webpack");

const VENDOR_LIBS = ["react", "lodash", "react-dom"];

module.exports = {
  devtool: 'cheap-module-eval-source-map',
  entry: {
    bundle: './src/index.js',
    vendor: VENDOR_LIBS
  },
  output: {
    path: path.join(__dirname, 'public'),
    filename: '[name].[chunkhash].js',
    chunkFilename: '[id].js',
    publicPath: ''
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: [
          { loader: 'style-loader' },
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              modules: true,
              localIdentName: '[name]__[local]__[hash:base64:5]'
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              plugins: () => [
                autoprefixer({
                  browsers: ['> 1%', 'last 2 versions']
                })
              ]
            }
          }
        ]
      },
      {
        test: /\.(png|jpe?g|gif)$/,
        loader: 'url-loader?limit=8000&name=images/[name].[ext]'
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: __dirname + '/src/template.html',
      filename: 'index.html',
      inject: 'body'
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: ['vendor', 'manifest']
    })
  ],
  devServer: {
    contentBase: path.join(__dirname, 'public'),
    historyApiFallback: true
  }
};
```
