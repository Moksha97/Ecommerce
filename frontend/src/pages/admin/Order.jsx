import React, { Component } from "react";
import { Button, Col, Form, Row, Select } from "antd";
import ax from "../../utils/httpreq";

class Order extends Component {
  formRef = React.createRef();

  constructor(props) {
    super(props);
    this.state = {
      orders: [],
    };
  }

  componentDidUpdate = async (prevProps) => {
    if (prevProps.mode !== this.props.mode) {
      await this.updateData();
    }
  };

  componentDidMount = async () => {
    await this.updateData();
  };

  updateData = async () => {
    const { notification } = this.props;
    let res = await ax.get("/admin/order/getpending");
    if (res.status !== 200) {
      notification.error({
        message: `Error: ${res.status}`,
        description: res.data.error,
        placement: "topRight",
      });
    } else {
      this.setState({ orders: res.data });
    }
  };

  onFinish = async (values) => {
    const { notification } = this.props;
    const { oid, status } = values;
    const res = await ax.post("/admin/order/updatestatus", {
      orderId: oid,
      status: status,
    });
    if (res.status !== 200) {
      const { response } = res;
      notification.error({
        message: `Error: ${response.status}`,
        description: response.data.error,
        placement: "topRight",
      });
    } else {
      notification.success({
        message: "Success",
        description: "Order updated successfully",
        placement: "topRight",
      });
    }
  };

  render = () => {
    const { orders } = this.state;
    const validStatus = [
      "PLACED",
      "PACKED",
      "INTRANSIT",
      "DELIVERED",
      "CANCELED",
    ];
    return (
      <Row>
        <Col span={24}>
          <h2>{"Update order"}</h2>
        </Col>
        <Col span={12}>
          <Form ref={this.formRef} layout="vertical" onFinish={this.onFinish}>
            <Form.Item
              name="oid"
              label="Select an order"
              rules={[{ required: true, message: "Please select an order" }]}
            >
              <Select
                showSearch
                placeholder="Select an order"
                optionFilterProp="children"
              >
                {orders.map((order) => (
                  <Select.Option key={order.oid} value={order.oid}>
                    {"[" +
                      order.oid +
                      "] " +
                      order.status +
                      " @ " +
                      new Date(order.timestamp).toUTCString().slice(0, 16) +
                      " by " +
                      order.username}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item
              name="status"
              label="Status"
              rules={[{ required: true, message: "Please select status" }]}
            >
              <Select>
                {validStatus.map((status) => (
                  <Select.Option value={status} key={status}>
                    {status}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Update Order
              </Button>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    );
  };
}

export default Order;
