import React, { Component } from 'react'
import { Card, Form, Input, Select } from 'antd';
import { withPropsAPI } from 'gg-editor'

const { Item } = Form;
const { Option } = Select;

const inlineFormItemLayout = {
  labelCol: {
    sm: { span: 6 },
  },
  wrapperCol: {
    sm: { span: 18 },
  },
};

class EdgeDetail extends Component {
  handleSubmit = () => {
    const { form, propsAPI } = this.props;
    const { getSelected, executeCommand, update } = propsAPI

    setTimeout(() => {
      form.validateFieldsAndScroll((err, values) => {
        if (err) {
          return
        }

        const item = getSelected()[0]

        if (!item) {
          return;
        }

        executeCommand(() => {
          update(item, {
            ...values,
          });
        });
      });
    }, 0);
  }

  renderShapeSelect() {
    return (
      <Select onChange={this.handleSubmit}>
        <Option value="flow-smooth">图曲线</Option>
        <Option value="flow-polyline">图折线</Option>
        <Option value="flow-polyline-round">圆角折线</Option>
      </Select>
    );
  }

  render() {
    const { form, propsAPI } = this.props;
    const { getFieldDecorator } = form;
    const { getSelected } = propsAPI;

    const item = getSelected()[0]

    console.log(item.getModel())

    if (!item) {
      return null;
    }

    const { label = '', shape = 'flow-polyline' } = item.getModel();

    return (
      <div>
          <div className="item-panel-head">
              <span className="item-panel-head-name">命令字参数</span>
          </div>
          {
            //<Card type="inner" title="命令字参数" bordered={false}>
                // <Form onSubmit={this.handleSubmit}>
                //   <Item
                //     label="标签"
                //     {...inlineFormItemLayout}
                //   >
                //     {
                //       getFieldDecorator('label', {
                //         initialValue: label,
                //       })(<Input onBlur={this.handleSubmit} />)
                //     }
                //   </Item>
                //   <Item
                //     label="图形"
                //     {...inlineFormItemLayout}
                //   >
                //     {
                //       getFieldDecorator('shape', {
                //         initialValue: shape,
                //       })(this.renderShapeSelect())
                //     }
                //   </Item>
                // </Form>
            //</Card>
          }
      </div>
    )
  }
}

export default Form.create()(withPropsAPI(EdgeDetail));
