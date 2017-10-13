/* eslint-disable */

import React from 'react';
import { expect } from 'chai';
import { configure, mount, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import { createForm } from 'rc-form';
import './setup';
import FormBody from '../src';

configure({ adapter: new Adapter() });

const Item = (props) => (<label>{props.label}{props.children}</label>);
const Name = (props) => (<input type="text" {...props} />);
const Passwd = (props) => (<input type="password" {...props} />);

describe('1 <FormBody />', () => {
  it('1.1 FormBody can shallow successfully', () => {
    const Form = createForm()(FormBody);
    const wrapper = shallow(<Form />);
    expect(wrapper.exists()).to.be.true;
  });

  it('1.2 FormBody can render with items successfully', () => {
    const Form = createForm()(FormBody);

    const items = [
      {
        label: '用户名',
        name: 'user',
        element: Name,
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
        element: <Passwd />,
        options: {
          rules: [{
            required: true,
            message: '请填写密码',
          }],
        },
      },
      {
        element: <button>登录</button>,
      },
    ];

    const formProps = {
      wrapItem: Item,
      items,
    };

    const wrapper = mount(<Form {...formProps} />);

    expect(wrapper.find({ name: 'user' })).to.have.length(1);
    expect(wrapper.find({ name: 'password' })).to.have.length(1);    
    expect(wrapper.find('button')).to.have.length(1);
  });
});

describe('2 <FormBody.Item />', () => {
  it('2.1 FormBody.Item can render successfully', () => {
    const form = {
      getFieldDecorator: x => y => y,
    };
    const WrapperItem = p => <div className="fzz">{p.children}</div>;
    const wrapper = mount(
      <FormBody.Item
        name="foobar"
        form={form}
        wrap={WrapperItem}
        element={<input type="text" />}
      />
    );

    expect(wrapper.exists()).to.be.true;
  });
});
