import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Layout, Button, Row, Col, Typography, Form, Input, Radio } from "antd";
import AppHeader from "../pages/AppHeader";
import AppFooter from "../pages/AppFooter";

const { Title } = Typography;
const { Content } = Layout;

export default class Login extends Component {
  render() {
    const onFinish = (values) => {
      console.log("Success:", values);
    };

    const onFinishFailed = (errorInfo) => {
      console.log("Failed:", errorInfo);
    };
    return (
      <>
        <Layout
          className="layout-default layout-signin"
          style={{ height: "100%" }}
        >
          <AppHeader />
          <Content className="signin">
            <Row gutter={[24, 0]} justify="center">
              <Col
                xs={{ span: 24, offset: 0 }}
                lg={{ span: 6, offset: 0 }}
                md={{ span: 12 }}
              >
                <Title className="mb-15 text-center">Sign in</Title>
                <Title
                  className="font-regular text-muted text-center"
                  level={5}
                >
                  Please sign into your account
                </Title>
                <Form
                  onFinish={onFinish}
                  onFinishFailed={onFinishFailed}
                  layout="vertical"
                  className="row-col"
                >
                  <Form.Item label="" name="account">
                    <Radio.Group
                      defaultValue="customer"
                      buttonStyle="solid"
                      style={{ width: "100%" }}
                    >
                      <Radio.Button
                        className={"text-center"}
                        value="customer"
                        style={{ width: "50%" }}
                      >
                        Customer
                      </Radio.Button>
                      <Radio.Button
                        className={"text-center"}
                        value="admin"
                        style={{ width: "50%" }}
                      >
                        Admin
                      </Radio.Button>
                    </Radio.Group>
                  </Form.Item>

                  <Form.Item
                    className="username"
                    label=""
                    name="email"
                    rules={[
                      {
                        required: true,
                        message: "Please input your email!",
                      },
                    ]}
                  >
                    <Input placeholder="Email or username" type={"email"} />
                  </Form.Item>

                  <Form.Item
                    className="username"
                    label=""
                    name="password"
                    rules={[
                      {
                        required: true,
                        message: "Please input your password!",
                      },
                    ]}
                  >
                    <Input placeholder="Password" type={"password"} />
                  </Form.Item>

                  <Form.Item>
                    <Button
                      type="primary"
                      htmlType="submit"
                      style={{ width: "100%" }}
                    >
                      SIGN IN
                    </Button>
                  </Form.Item>
                  <p className="text-muted text-center">
                    Don't have an account?{" "}
                    <Link to="/signup" className="text-dark font-bold">
                      Sign Up
                    </Link>
                  </p>
                </Form>
              </Col>
            </Row>
          </Content>
          <AppFooter />
        </Layout>
      </>
    );
  }
}
