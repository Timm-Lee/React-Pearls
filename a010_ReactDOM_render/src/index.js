// // 方法1：document.createElement
// const title = document.createElement('h1');
// title.innerText='Hello';
// title.className='main';
// document.getElementById('root').appendChild(title);



// // 方法2：React.createElement
// import React from 'react';
// import ReactDOM from 'react-dom';

// const title = React.createElement("h1", {className: "main"}, "Hello React (method 2)");
// ReactDOM.render(title, document.getElementById('root'));



// // 方法3：JSX
// import React from 'react';
// import ReactDOM from 'react-dom';

// const title = (
//   <h1>Hello React (method 3 .jsx)</h1>
// );

// ReactDOM.render(title, document.getElementById('root'));



// // 没有 div 包裹会报错
// import React from 'react';
// import ReactDOM from 'react-dom';

// const title = (
//   <h1>Parallel elements demo</h1>
//   <p>Content</p>
// );

// ReactDOM.render(title, document.getElementById('root'));



// // 正确写法：用 div 包裹并列标签
// import React from 'react';
// import ReactDOM from 'react-dom';

// const title = (
//   <div>
//     <h1>Parallel elements demo</h1>
//     <p>Content</p>
//   </div>
// );

// ReactDOM.render(title, document.getElementById('root'));



// // 突破JSX标签包裹限制：方法1 返回数组
// import React from 'react';
// import ReactDOM from 'react-dom';

// const arr = ['Adams', 'Bill', 'Charlie'];

// const Arr = () => {
//   return arr.map((item, index) => {
//     return <p key={index}>{item}</p>
//   })
// }

// console.log(Arr());

// ReactDOM.render(<Arr />, document.getElementById('root'));



// // 简写1
// import React from 'react';
// import ReactDOM from 'react-dom';

// const arr = ['Adams', 'Bill', 'Charlie'];

// const Arr = () => {
//   return arr.map((item, index) => <p key={index}>{item}</p>);
// };

// ReactDOM.render(<Arr />, document.getElementById('root'));



// // 简写2
// import React from 'react';
// import ReactDOM from 'react-dom';

// const arr = ['Adams', 'Bill', 'Charlie'];

// const Arr = () => (arr.map((item, index) => <p key={index}>{item}</p>));

// ReactDOM.render(<Arr />, document.getElementById('root'));



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

