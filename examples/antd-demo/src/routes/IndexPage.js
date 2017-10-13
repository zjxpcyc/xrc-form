import React from 'react';
import { connect } from 'dva';
import { Form, Input, Button, Modal } from 'antd';
import FormBody from '../../../../xrc-form/lib';
import styles from './IndexPage.css';

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

const UserLogIn = Form.create()((props) => {
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

  const items = [
    {
      label: '用户名',
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
      element: null,
      options: {
        initialValue: Math.random().toString(36).substr(2),
      },
    },
    {
      element: <Button type="primary" htmlType="submit">登录</Button>,
    },
  ];

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

function IndexPage() {
  return (
    <div className={styles.normal}>
      <h1 className={styles.title}>antd demo</h1>
      <UserLogIn />
    </div>
  );
}

IndexPage.propTypes = {
};

export default connect()(IndexPage);
