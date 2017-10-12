import React from 'react';
import PropTypes from 'prop-types';
import { twoPart } from './utils';

const FormItemAttrs = [
  'pure', // bool, means just an element, not an form field
  'name', // string, form field's name
  'element', // react element, form field, if pure is true, this is just an reat element
  'options', // object, will be used for getFieldDecorator
  'wrap', // react element, used for wrapping element
  'form', // object(rc-form), just for getting some inner functions
];

class FormItem extends React.Component {
  render() {
    const { pure, name, options, element, wrap: Wrapper, form } = this.props;

    if (!pure && !name) {
      throw new Error('Form item must has name field');
    }

    // if element null, means this is a hidden field
    if (!element) {
      form.getFieldDecorator(name, options);
      return null;
    }

    const [, itemProps] = twoPart(this.props, FormItemAttrs);

    const FormField = pure ?
      element :
      form.getFieldDecorator(name, options)(
        typeof element === 'function' ? element() : element,
      );

    if (Wrapper) {
      return <Wrapper {...itemProps}>{FormField}</Wrapper>;
    }

    return FormField;
  }
}

FormItem.defaultProps = {
  options: {},
};

FormItem.propTypes = {
  pure: PropTypes.bool, // eslint-disable-line
  name: PropTypes.string, // eslint-disable-line
  element: PropTypes.oneOfType([PropTypes.element, PropTypes.func]), // eslint-disable-line
  options: PropTypes.object, // eslint-disable-line
  wrap: PropTypes.oneOfType([PropTypes.element, PropTypes.func]), // eslint-disable-line
  form: PropTypes.object, // eslint-disable-line
};

export default FormItem;
