import React, { Component } from "react";
import { Button, Col, Form, Input, Row } from "antd";
import ax from "../../utils/httpreq";

class ChangePassword extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  onFinish = async (values) => {
    const { notification } = this.props;
    const { username, password } = values;
    const res = await ax.post("/admin/central/resetpassword", {
      username: username,
      password: password,
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
        description: "Password updated successfully",
        placement: "topRight",
      });
    }
  };

  render = () => {
    return (
      <Row>
        <Col span={24}>
          <h2>{"Update password"}</h2>
        </Col>
        <Col span={12}>
          <Form layout="vertical" onFinish={this.onFinish}>
            <Form.Item
              name="username"
              label="Enter a username"
              rules={[{ required: true, message: "Please enter a username" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="password"
              label="Password"
              rules={[{ required: true, message: "Please enter password" }]}
            >
              <Input type={"password"} />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Update password
              </Button>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    );
  };
}

export default ChangePassword;
