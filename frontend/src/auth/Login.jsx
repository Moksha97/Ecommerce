import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Layout, Button, Row, Col, Typography, Form, Input, Radio } from "antd";
import AppHeader from "../components/AppHeader";
import AppFooter from "../components/AppFooter";
import ax from "../utils/httpreq";

const { Title } = Typography;
const { Content } = Layout;

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      account: "customer",
    };
  }

  componentDidMount = async () => {};

  onFinish = async (values) => {
    const { notification } = this.props;
    const { account } = this.state;
    const res = await ax.post("/login", {
      username: values.email,
      password: values.password,
    });
    if (res.status !== 200) {
      const { response } = res;
      notification.error({
        message: `Error: ${response.status}`,
        description: response.data.error,
        placement: "topRight",
      });
    } else {
      const { data } = res;
      console.log(data);
      if (data.isadmin === 1 && account === "admin") {
        window.location.href = "/admin";
      } else if (data.isadmin === 0 && account === "customer") {
        window.location.href = "/";
      } else if (data.isadmin === 1 && account === "customer") {
        notification.error({
          message: `Error`,
          description: "Please login as admin",
          placement: "topRight",
        });
      } else if (data.isadmin === 0 && account === "admin") {
        notification.error({
          message: `Error`,
          description: "Please login as customer",
          placement: "topRight",
        });
      }
    }
  };

  onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  render() {
    const { account } = this.state;
    return (
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
                style={{ marginBottom: "3rem" }}
              >
                Please sign into your account
              </Title>
              <Form
                onFinish={this.onFinish}
                onFinishFailed={this.onFinishFailed}
                layout="vertical"
                className="row-col"
              >
                <Form.Item label="" name="account">
                  <Radio.Group
                    defaultValue={account}
                    buttonStyle="solid"
                    onChange={(e) => {
                      this.setState({ account: e.target.value });
                    }}
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
                  Do not have an account?{" "}
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
    );
  }
}

export default Login;
