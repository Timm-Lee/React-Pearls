# React 拾遗：有状态组件与无状态组件

## 如何使用代码
安装项目前置依赖，以及启动项目的方法，参看：[React 拾遗：项目脚手架](https://gitee.com/TimmLee/React-Perls/tree/master/a000_scaffold)。

请根据文章内容，把相应部分的代码注释取消，即可运行。

## 摘要

本文介绍
* 区分有状态组件（statefull component）与无状态组件（stateless component）
* 合理的组件目录结构


**项目代码地址：[React 拾遗：类组件与函数组件](https://gitee.com/TimmLee/React-Perls/tree/master/a020_class_function_component)**


## 组件的类型

判断一个组件的类型，就是看：该组件是**有状态（stateful）**，还是**无状态（stateless）**。
同样，如果使用一个组件，需要维护一个内部的状态，那么就选择有状态的组件类型；相反，如果不需要维护状态，就是无状态类型组件。

### 1 什么叫状态（state）?

状态是一个组件中的数据集合，当『有状态的组件』（stateful component）被加载到内存中时，这些数据也同时被保存在内存中。当渲染带状态的组件时，状态中数据可能会对该组件及其子组件产生影响。相对而言，如果是一个『无状态组件』，自己是没有数据，结果就是要么这个无状态组件就是纯粹的渲染 html 内容，不需要对数据进行判断和处理；要么这个组件所需要的数据，都是来自于上层结构（父组件传递下来的数据，或者 Redux 的 store 中的数据）。

因为这种数据从上下向下的流动，所以通常『有状态组件』会包含若干『无状态组件』。『有状态组件』就像一个容器，内部盛放着『无状态组件』：当『无状态组件』需要数据，都是从上层的『有状态组件』提供。

因此『有状态组件』（stateful component）通常被称为『容器』（container）或者『容器组件』，又因为『有状态组件』控制着『无状态组件』如何去渲染，逻辑如何变换，所以也被称为『聪明组件』（smart component）。相反，『无状态组件』（stateless component）因为不能控制自己的数据，数据都是外部获取，就像一个木偶被上层操控来作为一个表现层，所以被曾为『变现性组件』（presentational component），也被称为『木偶组件』，英文是"Dumb component"。

### 2 如何为组件增加状态？
通常，函数（function）与类（class）最大的区别是：是否能够维护自己的数据（即状态）。函数基本上仅关注动作（action），而不关心数据的维护，不用维持一个状态，不用把自己的数据保存在内存中。函数使用的数据是从外部获取（或者不获取数据），函数运行时，会完成一系列的动作，最后将结果返回（也可能不返回，仅仅是完成指定的动作）。相对而言，类有能力维护状态（保存数据），也可以定义自己的一系列动作。

一般来说，函数的速度较快，适合用于做表现层，而类能够处理复杂逻辑和状态，适合做逻辑层和数据层。所以，对于 React 来说，一般选择函数来『无状态组件』，得到所谓的『无状态函数』（stateless function），好处是渲染的速度快，所以多使用无状态组件，尽量不要让数据散落在各个组件中。数据集中管理可以更好的保持数据的一致性和可维护性。

『有状态组件』就是使用类来生成。类可以有自己的状态，维护自己的数据，也是完全符合『有状态组件』的要求。但是类相对来说速度比函数慢，影响渲染的性能，同时数据过于分散会给后期的维护带来比较大的困难（这也是为什么状态过多时要使用 Redux 的原因），因此要尽量控制有状态组件的数量。当然，类也可以生成无状态组件，但是既然不需要维护状态的工作，用函数能完成得更好，其实也就没有必要使用类来做无状态组件。


## 合理的组件目录结构

### 0 单js文件项目
组件完全可以用单个js文件来实现，比如下面的例子：

```javascript
// 类与函数都能生成 React 的组件
import React, { Component } from 'react';
import ReactDOM from 'react-dom';

class Title extends Component {
  render() {
    return (<h1>Main Title</h1>);
  }
}

const Subtitle = () => (<h2>subtitle</h2>);

const jsx = (
  <div>
    <Title />
    <Subtitle />
    <p>Here is content</p>
  </div>
);

ReactDOM.render(jsx, document.getElementById('root'));
```

实际上，上面这部分代码有一些问题：
* 组件尽量拆分到 src（source code，源代码）文件下的其他文件夹中，而不是全部写在 index.js 中，甚至组件都应该全部归拢到 App.js 这个组件中，再一次性的给 index.js 去渲染。
* 函数的命令规范是小写字母开头的驼峰法（比如：printName），而 React 中组件命名，用大写字母命名，比如 PrintName，写成标签形式就是 `<PrintName />`，或者 `<PrintName></PrintName>`。大写的标签是 React 组件区别于 html 原生标签的做法。

因此需要对目录结构进行调整。

### 2 组件归类到 components 目录
具体的做法：
* 首先把所有的组件单独做成一个文件，比如 Title 部分做成 Title.js 文件。
* 这些组件都归类放在 /src/components/ 目录下，Title.js 与 Subtitle.js 都放在 /src/components/ 目录下
* 新建 App.js，所有的组件都在这里引入。
* index.js 只引入 App.js，保持入口文件 index.js 的整洁。

调整后的 src 目录结构如下:
```
.
├── src
│   ├── App.js
│   ├── components
│   │   ├── Subtitle.js
│   │   └── Title.js
│   ├── index.js
│   └── template.html
```

代码如下：
```javascript
/* /src/indx.js */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import App from './App';

ReactDOM.render(<App />, document.getElementById('root'));


/* /src/App.js */
import React, { Component } from 'react';
import Title from './components/Title'
import Subtitle from './components/Subtitle'

class App extends Component {
  render() {
    return (
      <div>
        <Title />
        <Subtitle />
      </div>
    );
  }
}
export default App;

/* /src/components/Title.js  */
import React from 'react';

class Title extends React.Component {
  render() {
    return (
      <h1>Here is title</h1>
    );
  }
}
export default Title;

/* /src/components/Subitle.js  */
import React from 'react';

const subtitle = () => (
  <h2>Subtitle</h2>
);
export default subtitle;

```


### 3 组件归类到 components 目录

本次调整的目的：
* 将『有状态的组件』放在containers（容器）目录下，把『无状态的组件』放在 components 目录下。管理状态时，直接倒 containers 目录下去处理。
* assets 放图片、logo等资源文件
* layout 放 UI 相关组件

对于 /src/ 目录结构调整如下
```
.
├── App.js
├── assets
├── components
│   └── Subtitle.js
├── containers
│   └── Title.js
├── index.js
├── layout
└── template.html
```

对于前次的代码只需要更改 Title.js 的引入目录即可。
```javascript
/* /src/App.js */
import React, { Component } from 'react';
import Title from './containers/Title'
import Subtitle from './components/Subtitle'

class App extends Component {
  render() {
    return (
      <div>
        <Title />
        <Subtitle />
      </div>
    );
  }
}
export default App;
```

## 类与函数作为组件
两者作为组件有一些详细内容需要说明，放在后面的章节处理。
