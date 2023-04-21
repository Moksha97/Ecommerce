import React, { Component } from "react";
import { Col, Row, Divider, Card, Input, Form } from "antd";
import { Button, Space, Layout } from "antd";
import AppFooter from "../components/AppFooter";
import AppHeader from "../components/AppHeader";
import Categories from "../components/Categories";
import { Content } from "antd/es/layout/layout";
import ax from "../utils/httpreq";

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      accounts: [],
      addresses: [],
      user: {},
    };
  }

  componentDidMount = async () => {
    await this.getAddressAndAccount();
  };

  getAddressAndAccount = async () => {
    const { notification } = this.props;
    let res = await ax.get("/users/getUser");
    if (res.status !== 200) {
      const { response } = res;
      notification.error({
        message: `Error: ${response.status}`,
        description: response.data.error,
        placement: "topRight",
      });
    } else {
      const { data } = res;
      if (data.length !== 0) {
        let user = data[0];
        console.log(user);
        this.setState({
          user: user,
        });
      }
    }

    res = await ax.get("/accounts");
    if (res.status !== 200) {
      const { response } = res;
      notification.error({
        message: `Error: ${response.status}`,
        description: response.data.error,
        placement: "topRight",
      });
    } else {
      const { data } = res;
      this.setState({
        accounts: data,
      });
    }

    res = await ax.get("/address");
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
      this.setState({
        addresses: data,
      });
    }
  };

  onNewAccountFinish = async (values) => {
    const { accountNumber, routingNumber, bank, branch } = values;
    const { notification } = this.props;
    const res = await ax.post("/accounts", {
      accountnumber: accountNumber,
      routingnumber: routingNumber,
      bank: bank,
      branchcode: branch,
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
        message: `Success`,
        description: "Account added successfully",
        placement: "topRight",
      });
    }
    await this.getAddressAndAccount();
  };

  onNewAddressFinish = async (values) => {
    const { line1, line2, city, state, zip } = values;
    const { notification } = this.props;
    const res = await ax.post("/address", {
      line1: line1,
      line2: line2,
      city: city,
      state: state,
      zip: zip,
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
        message: `Success`,
        description: "Address added successfully",
        placement: "topRight",
      });
    }
    await this.getAddressAndAccount();
  };

  deleteAddress = async (id) => {
    const { notification } = this.props;
    const res = await ax.delete(`/address/${id}`);
    if (res.status !== 200) {
      const { response } = res;
      notification.error({
        message: `Error: ${response.status}`,
        description: response.data.error,
        placement: "topRight",
      });
    } else {
      notification.success({
        message: `Success`,
        description: "Address deleted successfully",
        placement: "topRight",
      });
    }
    await this.getAddressAndAccount();
  };

  deleteAccount = async (id) => {
    const { notification } = this.props;
    const res = await ax.delete(`/accounts/${id}`);
    if (res.status !== 200) {
      const { response } = res;
      notification.error({
        message: `Error: ${response.status}`,
        description: response.data.error,
        placement: "topRight",
      });
    } else {
      notification.success({
        message: `Success`,
        description: "Account deleted successfully",
        placement: "topRight",
      });
    }
    await this.getAddressAndAccount();
  };

  setPreferredAddress = async (id) => {
    const { notification } = this.props;
    const res = await ax.put(`/users/updateUser`, {
      fieldName: "preferredaddress",
      fieldValue: id,
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
        message: `Success`,
        description: "Address set as preferred successfully",
        placement: "topRight",
      });
    }
    await this.getAddressAndAccount();
  };

  setPreferredAccount = async (id) => {
    const { notification } = this.props;
    const res = await ax.put(`/users/updateUser`, {
      fieldName: "preferredaccount",
      fieldValue: id,
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
        message: `Success`,
        description: "Account set as preferred successfully",
        placement: "topRight",
      });
    }
    await this.getAddressAndAccount();
  };

  render() {
    const { accounts, addresses, user } = this.state;
    return (
      <Layout
        className="layout-default layout-signin"
        style={{ height: "100%" }}
      >
        <AppHeader />
        <Categories />
        <Content style={{ marginBottom: "100px" }}>
          <Row
            gutter={[24, 0]}
            justify="left"
            style={{ marginLeft: "50px", marginRight: "50px" }}
          >
            <Col
              span={12}
              style={{
                fontSize: "28px",
                marginTop: "12px",
                marginBottom: "2px",
              }}
            >
              Profile
              <Row>
                <Divider orientation="left" plain>
                  Email
                </Divider>
                <Col
                  span={20}
                  style={{ paddingLeft: "30px", paddingRight: "30px" }}
                >
                  <Input disabled={true} value={user.username} type={"email"} />
                </Col>
                <Col span={4}>
                  <Space wrap>
                    <Button type="primary">Edit</Button>
                  </Space>
                </Col>
                <Divider orientation="left" plain>
                  First name
                </Divider>
                <Col
                  span={20}
                  style={{ paddingLeft: "30px", paddingRight: "30px" }}
                >
                  <Input disabled={true} value={user.fname} />
                </Col>
                <Col span={4}>
                  <Space wrap>
                    <Button type="primary">Edit</Button>
                  </Space>
                </Col>
                <Divider orientation="left" plain>
                  Last name
                </Divider>
                <Col
                  span={20}
                  style={{ paddingLeft: "30px", paddingRight: "30px" }}
                >
                  <Input disabled={true} value={user.lname} />
                </Col>
                <Col span={4}>
                  <Space wrap>
                    <Button type="primary">Edit</Button>
                  </Space>
                </Col>
                <Divider orientation="left" plain>
                  Phone
                </Divider>
                <Col
                  span={20}
                  style={{ paddingLeft: "30px", paddingRight: "30px" }}
                >
                  <Input
                    disabled={true}
                    value={user.phone ? user.phone.replaceAll("-", "") : ""}
                    type={"number"}
                  />
                </Col>
                <Col span={4}>
                  <Space wrap>
                    <Button type="primary">Edit</Button>
                  </Space>
                </Col>
              </Row>
            </Col>

            <Col
              span={12}
              style={{
                fontSize: "28px",
                marginTop: "12px",
                marginBottom: "2px",
              }}
            >
              Addresses
              <Row>
                {addresses.map((address) => (
                  <>
                    <Divider orientation="left" plain>
                      {user.preferredaddress === address.aid ? "Preferred" : ""}
                    </Divider>
                    <Col span={18}>
                      <code>{address.line1}</code>
                      <br />
                      <code>{address.line2}</code>
                      <br />
                      <code>
                        {address.city +
                          " " +
                          address.state +
                          ", " +
                          address.zip}
                      </code>
                    </Col>
                    <Col span={6} style={{ alignSelf: "center" }}>
                      <Space direction="vertical">
                        <Button
                          style={{ marginBottom: "5px" }}
                          type="primary"
                          onClick={() => {
                            this.setPreferredAddress(address.aid);
                          }}
                        >
                          Make it preferred
                        </Button>
                        <Button
                          style={{ marginBottom: "5px" }}
                          type="primary"
                          danger
                          onClick={() => {
                            this.deleteAddress(address.aid);
                          }}
                        >
                          Delete
                        </Button>
                      </Space>
                    </Col>
                  </>
                ))}
                <Divider />
                <Form
                  onFinish={this.onNewAddressFinish}
                  layout="vertical"
                  className="row-col"
                >
                  <Space direction={"horizontal"}>
                    <Form.Item
                      label="Address line 1"
                      name="line1"
                      rules={[
                        {
                          required: true,
                          message: "Please input your Address line 1!",
                        },
                      ]}
                    >
                      <Input />
                    </Form.Item>
                    <Form.Item label="Address line 2" name="line2">
                      <Input />
                    </Form.Item>
                  </Space>
                  <Space direction={"horizontal"}>
                    <Form.Item
                      label="City"
                      name="city"
                      rules={[
                        {
                          required: true,
                          message: "Please input your City!",
                        },
                      ]}
                    >
                      <Input />
                    </Form.Item>
                    <Form.Item
                      label="State"
                      name="state"
                      rules={[
                        {
                          required: true,
                          message: "Please input your State!",
                        },
                      ]}
                    >
                      <Input />
                    </Form.Item>
                    <Form.Item
                      label="Zip"
                      name="zip"
                      rules={[
                        {
                          required: true,
                          message: "Please input your Zip!",
                        },
                      ]}
                    >
                      <Input type={"number"} max={99999} />
                    </Form.Item>
                  </Space>
                  <Form.Item label="">
                    <Button
                      style={{ marginTop: "5px" }}
                      htmlType="submit"
                      type="primary"
                    >
                      Add new address
                    </Button>
                  </Form.Item>
                </Form>
              </Row>
            </Col>

            <Divider />
            <Col
              span={24}
              style={{
                fontSize: "28px",
                marginTop: "12px",
                marginBottom: "2px",
              }}
            >
              Payment Methods
            </Col>
            {accounts.map((account) => (
              <Col
                span={8}
                id={account.accountid}
                style={{ paddingBottom: "20px" }}
              >
                <Card
                  bordered={false}
                  className="card-credit header-solid h-ful"
                >
                  <code>
                    Account number{" "}
                    {user.preferredaccount === account.accountid
                      ? "(Preferred)"
                      : ""}
                  </code>
                  <h5 className="card-number" style={{ margin: 0 }}>
                    {account.accountnumber}
                  </h5>
                  <code>Routing number</code>
                  <h6 style={{ margin: 0 }}>{account.routingnumber}</h6>
                  <div className="card-footer">
                    <div className="mr-30">
                      <p>{account.bank}</p>
                    </div>
                    <div className="mr-30">
                      <p>Branch: {account.branchcode}</p>
                    </div>
                  </div>
                  <Space direction="horizontal">
                    <Button
                      style={{ marginTop: "5px" }}
                      type="primary"
                      onClick={() => {
                        this.setPreferredAccount(account.accountid);
                      }}
                    >
                      Make it preferred
                    </Button>
                    <Button
                      style={{ marginTop: "5px" }}
                      type="primary"
                      danger
                      onClick={() => {
                        this.deleteAccount(account.accountid);
                      }}
                    >
                      Delete
                    </Button>
                  </Space>
                </Card>
              </Col>
            ))}
            <Col span={8}>
              <Card
                bordered={false}
                className="header-solid h-ful"
                style={{ backgroundColor: "lightgray" }}
              >
                <Form
                  onFinish={this.onNewAccountFinish}
                  layout="vertical"
                  className="row-col"
                >
                  <Space direction={"horizontal"}>
                    <Form.Item
                      label="Account number"
                      name="accountNumber"
                      rules={[
                        {
                          required: true,
                          message: "Please input your Account number!",
                        },
                      ]}
                    >
                      <Input type={"number"} max={9999999999} />
                    </Form.Item>
                    <Form.Item
                      label="Routing number"
                      name="routingNumber"
                      rules={[
                        {
                          required: true,
                          message: "Please input your Routing number!",
                        },
                      ]}
                    >
                      <Input type={"number"} max={999999999999} />
                    </Form.Item>
                  </Space>
                  <Space direction={"horizontal"}>
                    <Form.Item
                      label="Bank"
                      name="bank"
                      rules={[
                        {
                          required: true,
                          message: "Please input your Bank!",
                        },
                      ]}
                    >
                      <Input />
                    </Form.Item>
                    <Form.Item
                      label="Branch"
                      name="branch"
                      rules={[
                        {
                          required: true,
                          message: "Please input your Branch!",
                        },
                      ]}
                    >
                      <Input type={"number"} max={9999999999} />
                    </Form.Item>
                  </Space>
                  <Form.Item label="">
                    <Button
                      style={{ marginTop: "5px" }}
                      htmlType="submit"
                      type="primary"
                    >
                      Add new account
                    </Button>
                  </Form.Item>
                </Form>
              </Card>
            </Col>
            <Col span={24} style={{ height: 100 }}></Col>
          </Row>
        </Content>
        <AppFooter />
      </Layout>
    );
  }
}

export default Profile;
