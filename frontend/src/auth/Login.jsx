import React from "react";
import { Link } from "react-router-dom";
import {
  Layout,
  Button,
  Row,
  Col,
  Typography,
  Form,
  Input,
  Radio,
  notification,
} from "antd";
import AppHeader from "../pages/AppHeader";
import AppFooter from "../pages/AppFooter";
import ax from "../utils/httpreq";

const { Title } = Typography;
const { Content } = Layout;

const Login = () => {
  const [api, contextHolder] = notification.useNotification();

  const onFinish = async (values) => {
    console.log("Success:", values);
    const res = await ax.post("/login", {
      username: values.email,
      password: values.password,
    });
    console.log(res);
    if (res.status !== 200) {
      const { response } = res;
      api.error({
        message: `Error: ${response.status}`,
        description: response.data.error,
        placement: "topRight",
      });
    } else {
      const { data } = res;
      console.log(data);
      if (data.isadmin === 1) {
        window.location.href = "/admin";
      } else {
        window.location.href = "/users";
      }
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <>
      {contextHolder}
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
};

export default Login;
