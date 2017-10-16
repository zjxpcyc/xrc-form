# xrc-form

[![Travis](https://img.shields.io/travis/zjxpcyc/xrc-form.svg)](https://travis-ci.org/zjxpcyc/xrc-form)
[![codecov](https://codecov.io/gh/zjxpcyc/xrc-form/branch/master/graph/badge.svg)](https://codecov.io/gh/zjxpcyc/xrc-form)

这是一个 react 项目, 结合 [antd](https://ant.design/) 和 [antd-mobile](https://mobile.ant.design/) 可以用于快速表单开发。

项目依赖 [rc-form](https://github.com/react-component/form) , 如果不是用于 antd 或 antd-mobile 项目, 那么需要安装这个依赖 `npm install rc-form --save` 。

## 概要 (Summary)
xrc-form 只是一个简单的 form 字段组合操作, 没有过多的内置行为。它包含两个组件:

- FormBody 主要是表单字段的集合体, 没有什么实质性的作用。
- FormBody.Item 表单字段的封装, 这个里面使用了 rc-form 的 [getFieldDecorator](https://github.com/react-component/form#getfielddecoratornamestring-option-object-reactnode-reactnode) 函数。

## 使用 (Useage)

安装(Install):

 `npm install xrc-form --save`

使用教程就是结合 antd 进行说明的, antd-mobile 当然也是适用的。

form 的创建，只需要简单的进行 json 对象编写即可。json 对象需要当作 props 传入组件中。

- FormBody 参数 (带 * 为必选)

<table>
<tr>
<th>参数</th>
<th>类型</th>
<th>说明</th>
</tr>
<tr>
<td>wrapRow</td>
<td>React 组件 或者 stateless 组件 (pure function)</td>
<td>用来包裹 form 每行内容, 比如, 如果需要自定义 <a href="https://ant.design/components/grid-cn/#Row">form grid</a> 显示的时候, 可能需要用到</td>
</tr>
<tr>
<td>wrapCol</td>
<td>React 组件 或者 stateless 组件 (pure function)</td>
<td>用来包裹 form 每列内容, 可以使用 <a href="https://ant.design/components/grid-cn/#Col">form grid</a> </td>
</tr>
<tr>
<td>wrapItem</td>
<td>React 组件 或者 stateless 组件 (pure function)</td>
<td>包裹 form 每个字段内容, 这个组件用来布局 字段 label 与 控件 之间的关系, 可以使用 <a href="https://ant.design/components/form-cn/#Form.Item">antd Form.Item</a>。如果是 antd 项目, 那么这个参数基本上是必填的。 </td>
</tr>
<tr>
<td>items</td>
<td>数组, 每个元素是 FormBody.Item 组件的参数集合</td>
<td>这个里面就是表单各字段的集合。如果是一维数组, 表单布局就是 '行' 模式, 就是几个字段，就是几行。如果是二维数组, 那么表单布局会变成行列组合, 数组最外层会被当作行, 内层数组会被当作列, 因此，可以组合出来 m 行 n 列的布局模式。所以, 如果是多行多列的布局，那么 wrapRow, wrapCol 参数基本是必选了。</td>
</tr>
<tr>
<td>* form</td>
<td><a href="https://github.com/react-component/form#rc-form">rc-form</a></td>
<td>因为字段需要 getFieldDecorator 包裹, 这个是必须的</td>
</tr>
</table>


- FormBody.Item 参数 (带 * 为必选)

如果传入 Item 的参数不止下面的这些, 那么多余的会被送到 wrap 参数中, 因此可以认为, Item 的参数是 wrap 参数和 Item 内置参数的集合

<table>
<tr>
<th>参数</th>
<th>类型</th>
<th>说明</th>
</tr>
<tr>
<td>name</td>
<td>字符串</td>
<td>会传入到 form 控件的 name 属性, 但不是必选的, 如果为空, 那么该组件可能仅仅是一个按钮或者一个说明</td>
</tr>
<tr>
<td>element</td>
<td>React 组件 或者 stateless 组件 (pure function)</td>
<td>表单字段, 如果不传, 意味着这个是隐藏字段。比如 jwt-token 之类的可以使用这种方式 </td>
</tr>
<tr>
<td>options</td>
<td><a href="https://github.com/react-component/form#option-object">rc-form option</a></td>
<td>该参数会被传入 getFieldDecorator 中, 具体有哪些参数, 请查阅 <a href="https://github.com/react-component/form#option-object">rc-form option</a> </td>
</tr>
<tr>
<td>wrap</td>
<td>React 组件 或者 stateless 组件 (pure function)</td>
<td>用来包裹表单控件, 同 FormBody 的 wrapItem 参数是一致的</td>
</tr>
<tr>
<td>form</td>
<td><a href="https://github.com/react-component/form#rc-form">rc-form</a></td>
<td>如果是普通表单字段, 则必选, 否则可以不传。换句话说, 如果 name 属性不为空, 则 form 为必须, 否则, 可以为空</td>
</tr>
</table>

## 示例 (Demo)

这里使用一个简单的登录页面演示

```javascript
import React from 'react';
import { Form, Input, Button, Modal } from 'antd';
import FormBody from 'xrc-form';

// 用来封装各个表单字段
const WrapItem = (props) => {
  return (
    <Form.Item
      labelCol={{
        xs: { span: 24 },
        sm: { span: 6 },
      }}
      wrapperCol={{
        xs: { span: 24 },
        sm: { span: 14 },
      }}
      label={props.label}
    >
      {props.children}
    </Form.Item>
  );
};

// 主控件
const UserLogIn = Form.create()((props) => {
  // 表单提交事件
  const handleSubmit = (e) => {
    e.preventDefault();
    props.form.validateFields((err, values) => {
      if (err) {
        return false;
      }

      console.log('=============form data==============');
      console.log(JSON.stringify(values));
      console.log('====================================');

      Modal.success({
        title: '登录消息',
        content: `登录成功, 您的登录信息: ${JSON.stringify(values)}`,
      });
    });
  };

  // 定义字段集合
  const items = [
    {
      label: '用户名', // 非内置参数, 因此会被送到 WrapItem 中
      name: 'user',
      element: <Input />,
      options: {
        rules: [{
          required: true,
          message: '请填写用户名',
        }],
      },
    },
    {
      label: '密码',
      name: 'password',
      element: <Input type="password" />,
      options: {
        rules: [{
          required: true,
          message: '请填写密码',
        }],
      },
    },
    {
      name: 'token',
      element: null, // 为 null, undefined, 或者 没有这个属性，含义都是一样的
      options: {
        // 使用一个简单的随机数来模拟服务器 token
        initialValue: Math.random().toString(36).substr(2),
      },
    },
    {
      element: <Button type="primary" htmlType="submit">登录</Button>,
    },
  ];

  // FormBody props
  const formProps = {
    items,
    wrapItem: WrapItem,
    form: props.form,
  };

  return (
    <Form onSubmit={handleSubmit}>
      <FormBody {...formProps} />
    </Form>
  );
});

// 页面
function IndexPage() {
  return (
    <div>
      <h1>antd demo</h1>
      <UserLogIn />
    </div>
  );
}
```
## 其他 (Others)
目前，只对表单的一维布局方式进行了测试，二维行列式布局没有测试。因此，可能 FormBody 的参数设计并不是那么好。
