import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Layout, Button, Row, Col, Typography, Form, Input, Radio } from "antd";
import AppHeader from "../components/AppHeader";
import AppFooter from "../components/AppFooter";
import ax from "../utils/httpreq";

const { Title } = Typography;
const { Content } = Layout;

class Signup extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount = async () => {};

  onFinish = async (values) => {
    const { notification } = this.props;
    console.log("Success:", values);
    const { fname, lname, email, password, phone } = values;
    const res = await ax.post("/signup", {
      username: email,
      password: password,
      fname: fname,
      lname: lname,
      phone: phone,
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
      if (data.isadmin === 1) {
        window.location.href = "/admin";
      } else {
        window.location.href = "/";
      }
    }
  };

  onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  render() {
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
              <Title className="mb-15 text-center">Sign up</Title>
              <Title
                className="font-regular text-muted text-center"
                level={5}
                style={{ marginBottom: "1rem" }}
              >
                It's fast and free to get started
              </Title>
              <Form
                onFinish={this.onFinish}
                onFinishFailed={this.onFinishFailed}
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
                  className=""
                  label=""
                  name="fname"
                  rules={[
                    {
                      required: true,
                      message: "Please input your first name!",
                    },
                  ]}
                >
                  <Input placeholder="First name" type={"text"} />
                </Form.Item>

                <Form.Item
                  className="fullname"
                  label=""
                  name="lname"
                  rules={[
                    {
                      required: true,
                      message: "Please input your last name!",
                    },
                  ]}
                >
                  <Input placeholder="Last name" type={"text"} />
                </Form.Item>

                <Form.Item
                  className=""
                  label=""
                  name="phone"
                  rules={[
                    {
                      required: true,
                      message: "Please input your phone!",
                    },
                  ]}
                >
                  <Input placeholder="Phone" type={"number"} />
                </Form.Item>

                <Form.Item
                  className="email"
                  label=""
                  name="email"
                  rules={[
                    {
                      required: true,
                      message: "Please input your email!",
                    },
                  ]}
                >
                  <Input placeholder="Email" type={"email"} />
                </Form.Item>

                <Form.Item
                  className="password"
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
                    Create your account
                  </Button>
                  <p className="text-muted text-center">
                    Already a member?{" "}
                    <Link to="/login" className="text-dark font-bold">
                      Sign In
                    </Link>
                  </p>
                </Form.Item>
              </Form>
            </Col>
          </Row>
        </Content>
        <AppFooter />
      </Layout>
    );
  }
}

export default Signup;
