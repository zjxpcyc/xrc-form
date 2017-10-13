import React from 'react';
import { connect } from 'dva';
import { List, InputItem, Button, Modal } from 'antd-mobile';
import { createForm } from 'rc-form';
import FormBody from '../../../../xrc-form/lib';
import styles from './IndexPage.css';

const UserLogIn = createForm()((props) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    props.form.validateFields((err, values) => {
      if (err) {
        return false;
      }

      console.log('=============form data==============');
      console.log(JSON.stringify(values));
      console.log('====================================');

      Modal.alert(
        '登录消息',
        `登录成功, 您的登录信息: ${JSON.stringify(values)}`,
      );
    });
  };

  const items = [
    {
      name: 'user',
      element: <InputItem>用户名</InputItem>,
      options: {
        rules: [{
          required: true,
          message: '请填写用户名',
        }],
      },
    },
    {
      name: 'password',
      element: <InputItem type="password">密码</InputItem>,
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
      element: <Button type="primary" onClick={handleSubmit}>登录</Button>,
    },
  ];

  const formProps = {
    items,
    form: props.form,
  };

  return (
    <List>
      <FormBody {...formProps} />
    </List>
  );
});

function IndexPage() {
  return (
    <div className={styles.normal}>
      <h1 className={styles.title}>antd-mobile demo</h1>
      <UserLogIn />
    </div>
  );
}

IndexPage.propTypes = {
};

export default connect()(IndexPage);
