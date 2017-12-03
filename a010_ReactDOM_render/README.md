# React 拾遗：React.createElement 与 JSX

## 如何使用代码
安装项目前置依赖，以及启动项目的方法，参看：[React 拾遗：项目脚手架](https://gitee.com/TimmLee/React-Perls/tree/master/a000_scaffold)。

请根据文章内容，把相应部分的代码注释取消，即可运行。

## 摘要

本文介绍
* document.createElement, React.createElement 与 JSX 三种方法创建 DOM 的比较
* JSX 的 div 标签包裹并列元素的限制
* 突破 JSX 的 div 包裹限制的两种方法

**项目代码地址：[React 拾遗：React.createElement 与 JSX](https://gitee.com/TimmLee/React-Perls/tree/master/a010_ReactDOM_render)**

## DOM 向JSX的演进

网页由 DOM 元素构成。React DOM 并不是浏览器的 DOM，而是 React DOM 只是用来告诉浏览器如何创建 DOM 的方法。通常情况下，我们并不需要 React 就能创建出一个 DOM 元素，但是 React 创建与管理 DOM 的方式有组件化、虚拟 DOM 等更高层次的抽象，由此带来的优势是更快的渲染速度，以及更好的维护性，因此值得去尝试。

下面分别用 JavaScript 原生方法，React.createElement 方法，以及 JSX 方法来创建一个h1元素，class设置为main，最后挂载在 id 为 root 的 div 元素下面。

html结构应该如下：
```html
<div id="root">
  <h1 id="main">Hello React</h1>
</div>
```

### 1 document.createElement
JavaScript原生方法，没有过多需要解释的部分。
```JavaScript
// 方法1：document.createElement
const title = document.createElement('h1');
title.innerText='Hello React (method 1)';
title.className='main';
document.getElementById('root').appendChild(title);
```

### 2 React.creaetElement

第二种方法是用 React 的 createElement 来创建 React DOM。
```JavaScript
// 方法2：React.createElement
import React from 'react';
import ReactDOM from 'react-dom';

const title = React.createElement("h1", {className: "main"}, "Hello React (method 2)");
ReactDOM.render(title, document.getElementById('root'));
```

其中 `createElement(a, b, c)`
* 第一个参数 a：表示元素的类型，比如：h1, div 等。
* 第二个参数 b：表示该元素上的属性，使用 JavaScript 对象方式表示。
* 第三个参数 c：表示该元素内部的内容，可以是文字，可以继续嵌套另外一个 `React.createElement(a, b, c)`。

这种方法其实在实际 React 开发中几乎不会使用，因为可以直接 JSX 方法。

### 3 JSX
JSX 是一种 JavaScript 的语法糖。Facebook 开发JSX出来，主要用于 React 中。虽然 JSX 的内容会长得像 html，但还是 JavaScript。

用 JSX 方法来创建 React DOM 的代码如下：
```JavaScript
// 方法3：JSX
import React from 'react';
import ReactDOM from 'react-dom';

const title = (
  <h1>Hello React (method 3)</h1>
);

ReactDOM.render(title, document.getElementById('root'));
```

#### 3.1 代码逐行解读：

**第1行：** `import React from 'react';`

有 JSX 的地方，在文件开头就需要引入 React，因为实际上 JSX 是使用了 `React.createElement`，JSX 只是一个JS 的语法糖，所以需要引入 React 包，否则会报错。

**第2行：** `import ReactDOM from 'react-dom';`
react-dom 是一个把React 代码渲染到网页端的包。如果在移动端渲染，就需要使用 React Native 的相关包。
目前（截至2017年12月3日），React 与 ReactDOM 都更新到了 16.0.0，所以在 package.json 中可以看到这两个版本都是最新的版本。

**第4-6行：**
```jsx
const title = (
  <h1>Hello React (method 3)</h1>
);
```

这就是一段 jsx 代码，实际是 `React.createElement` 创建一个 React DOM 对象，完全等同于下面这行代码。
```JavaScript
const title = React.createElement("h1", {className: "main"}, "Hello React (method 3)");
```

JSX 更加直观，符合我们对 html 结构的认知，如果都用 React.createElement 去创建 React DOM，会非常的繁琐，且容易出错。

**第8行：**
```jsx
ReactDOM.render(title, document.getElementById('root'));
```
把上面创造出来的 React DOM 对象，渲染到网页 id 为 root 的元素中。


#### 3.2 JSX的限制：标签的包裹
但是 JSX 有一个限制，就是在 JSX 中 html 代码第一层只能写一个元素。如果有多个标签（元素）并列，形成所谓的相邻JSX元素（adjacement jsx elements），就会报语法错误。通常这种多元素并列的情况，就用在它们外面包裹一层 div。

##### (1) 错误的代码
举例来看，如果 index.js 写成如下代码：
```JavaScript
// 没有 div 包裹会报错
import React from 'react';
import ReactDOM from 'react-dom';

const title = (
  <h1>Parallel elements demo</h1>
  <p>Content</p>
);

ReactDOM.render(title, document.getElementById('root'));
```

命令行中会报语法错误：相邻 JSX 元素必须用封闭的标签包裹。
```
Module build failed: SyntaxError: Adjacent JSX elements must be wrapped in an enclosing tag (35:2)
```

##### (2) 正确的代码

相邻元素 Adjacent JSX elements，在这里其实就是并列的 h1 与 p 标签。所以这里的解决方法就是用一个 div 标签来包裹 h1 与 p 标签。

```javascript
// 正确写法：用 div 包裹并列标签
import React from 'react';
import ReactDOM from 'react-dom';

const title = (
  <div>
    <h1>Parallel elements demo</h1>
    <p>Content</p>
  </div>
);

ReactDOM.render(title, document.getElementById('root'));
```

#### 3.3 突破JSX标签包裹限制
*注意：如果刚接触 React，这部分内容可以跳过后面再来看。*

对于 jsx 外层需要包裹一层 div，如果要突破这个限制，目前有两种方法：
* 返回数组
* 使用高阶组件做辅助

##### (1) 返回数组

如果的是数组，就没有问题。

```javascript
// 突破JSX标签包裹限制1：返回数组
import React from 'react';
import ReactDOM from 'react-dom';

const arr = ['Adams', 'Bill', 'Charlie'];

const Arr = () => {
  return arr.map((item, index) => {
    return <p key={index}>{item}</p>
  })
}

ReactDOM.render(<Arr />, document.getElementById('root'));
```

这里是一个数组 arr，包含三个名字，然后用 map 方法得到一个包含三段 JSX 代码的数组。注意这里需要写成匿名函数，然后以 `<Arr />` 自封闭标签的格式放入 ReactDOM 的第一个参数位置去渲染。

当然，这段代码还可以进行简写:

第一种简写 map 中的剪头函数少了 return
```javascript
// 简写1
import React from 'react';
import ReactDOM from 'react-dom';

const arr = ['Adams', 'Bill', 'Charlie'];

const Arr = () => {
  return arr.map((item, index) => <p key={index}>{item}</p>);
};

ReactDOM.render(<Arr />, document.getElementById('root'));
```

第二种简写是 Arr 这个匿名函数少了 return。
```jsx
// 简写2
import React from 'react';
import ReactDOM from 'react-dom';

const arr = ['Adams', 'Bill', 'Charlie'];

const Arr = () => (arr.map((item, index) => <p key={index}>{item}</p>));

ReactDOM.render(<Arr />, document.getElementById('root'));
```


##### (2) 高阶组件（High Order Component, hoc）

div 去包裹并列元素的痛点是，我们可能并不需要这个多余的 div 标签，可能会破坏 html 结构，也许上层做了 flex，并不能有效的传递到这些并列标签上。

所以这里引入了用于辅助的高阶组件 hoc。虽然高阶组件的名字听起来很吓人，然而做的事情很简单，就是传递的作用。



```jsx
// 突破JSX标签包裹限制：方法2 高阶组件
import React from 'react';
import ReactDOM from 'react-dom';

const Aux = props => props.children;

const title = (
  <Aux>
    <h1>Parallel elements demo</h1>
    <p>Content</p>
  </Aux>
);

ReactDOM.render(title, document.getElementById('root'));
```

在上面这段代码中，`const Aux = props => props.children;` 就是高阶组件。Aux 这个高阶组件的作用是把标签包括的内容进行传递和显示（Aux 是英文中的 auxiliary）。查看最终 html 结构会发现 div 已经消失了，而且代码没有 div 也能正常。

高阶组件不仅仅是这里的传递作用，在 Redux 中会大量使用，后面会讲到。

另外，据称 React 16.2 开始有一个所谓的 fragment 的做法，就是 React 自带了 `<Aux></Aux>`，但是写成 `<></>`。在 React 16.2，代码可以写成如下格式：
```jsx
import React from 'react';
import ReactDOM from 'react-dom';

const title = (
  <>
    <h1>Parallel elements demo</h1>
    <p>Content</p>
  </>
);

ReactDOM.render(title, document.getElementById('root'));
```
