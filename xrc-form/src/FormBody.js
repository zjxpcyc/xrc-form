import React from 'react';
import PropTypes from 'prop-types';
import FormItem from './FormItem';
import { keyGen } from './utils';

class FormBody extends React.Component {
  renderRow = (row, rowNo) => {
    const { wrapCol: Col, form, wrapItem: wrap } = this.props;
    const cols = !Array.isArray(row) ? [row] : row;

    return cols.map((col, inx) => {
      const props = { form, wrap, ...col };

      if (Col) {
        return (
          <Col key={keyGen(`col-${rowNo}-${inx}`)}>
            <FormItem {...props} />
          </Col>
        );
      }

      return (
        <FormItem key={keyGen(`col-${rowNo}-${inx}`)} {...props} />
      );
    });
  }

  render() {
    const { items, wrapRow: Row } = this.props;

    return (
      <div>
        {
          items.map((row, inx) => {
            if (Row) {
              return (
                <Row key={keyGen(`row-${inx}`)}>
                  {this.renderRow(row, inx)}
                </Row>
              );
            }

            return this.renderRow(row, inx);
          })
        }
      </div>
    );
  }
}

FormBody.propTypes = {
  wrapRow: PropTypes.oneOfType([PropTypes.element, PropTypes.func]), // eslint-disable-line
  wrapCol: PropTypes.oneOfType([PropTypes.element, PropTypes.func]), // eslint-disable-line
  wrapItem: PropTypes.oneOfType([PropTypes.element, PropTypes.func]), // eslint-disable-line
  items: PropTypes.arrayOf(PropTypes.object), // eslint-disable-line
  form: PropTypes.object.isRequired,
};

export default FormBody;
