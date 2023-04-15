import React from "react";
import { Col, Row, Divider, Card } from "antd";
import { Button, Space, Layout } from "antd";
import AppFooter from "../pages/AppFooter";
import AppHeader from "./AppHeader";
import Categories from "../components/Categories";
import { Content } from "antd/es/layout/layout";

const Profile = () => {
  return (
    <>
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
                <Divider />
                <Col span={20}>
                  <p>User ID:</p>
                  <b>Username</b>
                </Col>
                <Col span={4} style={{ alignSelf: "center" }}>
                  <Space wrap>
                    <Button type="primary">Edit</Button>
                  </Space>
                </Col>
                <Divider />
                <Col span={20}>
                  <p>Email address</p>
                  <b>sai@gmail.com</b>
                </Col>
                <Col span={4} style={{ alignSelf: "center" }}>
                  <Space wrap>
                    <Button type="primary">Edit</Button>
                  </Space>
                </Col>
                <Divider />
                <Col span={20}>
                  <p>Password:</p>
                  <b>**********</b>
                </Col>
                <Col span={4} style={{ alignSelf: "center" }}>
                  <Space wrap>
                    <Button type="primary">Edit</Button>
                  </Space>
                </Col>
                <Divider />
                <Col span={20}>
                  <p>Mobile phone:</p>
                  <b>9988766543</b>
                </Col>
                <Col span={4} style={{ alignSelf: "center" }}>
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
                <Divider />
                <Col span={20}>
                  <b>Primary Shipping Address:</b>
                  <p>Name Family</p>
                  <p>110 W CityLine Dr</p>
                  <p>Apt 1232</p>
                  <p>Richardson TX, 75082</p>
                </Col>
                <Col span={4} style={{ alignSelf: "center" }}>
                  <Button style={{ marginBottom: "5px" }} type="primary">
                    Make it primary
                  </Button>
                  <Button style={{ marginBottom: "5px" }} type="primary">
                    Edit
                  </Button>
                  <Button style={{ marginBottom: "5px" }} type="button">
                    Delete
                  </Button>
                </Col>
                <Divider />
                <Col span={20}>
                  <b>Primary Shipping Address:</b>
                  <p>Name Family</p>
                  <p>110 W CityLine Dr</p>
                  <p>Apt 1232</p>
                  <p>Richardson TX, 75082</p>
                </Col>
                <Col span={4} style={{ alignSelf: "center" }}>
                  <Button style={{ marginBottom: "5px" }} type="primary">
                    Make it primary
                  </Button>
                  <Button style={{ marginBottom: "5px" }} type="primary">
                    Edit
                  </Button>
                  <Button style={{ marginBottom: "5px" }} type="button">
                    Delete
                  </Button>
                </Col>
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
            <Col span={8}>
              <Card bordered={false} className="card-credit header-solid h-ful">
                <h5 className="card-number">4562 1122 4594 7852</h5>

                <div className="card-footer">
                  <div className="mr-30">
                    <p>Card Holder</p>
                    <h6>Jack Peterson</h6>
                  </div>
                  <div className="mr-30">
                    <p>Expires</p>
                    <h6>11/22</h6>
                  </div>
                  <div className="card-footer-col col-logo ml-auto">
                    <img src={`img/mastercard-logo.png`} alt="mastercard" />
                  </div>
                </div>
              </Card>
            </Col>
            <Col span={8}>
              <Card
                bordered={false}
                className="card-credit header-solid h-ful"
                style={{ backgroundColor: "lightslategray" }}
              >
                <h5 className="card-number">4562 1122 4594 7852</h5>

                <div className="card-footer">
                  <div className="mr-30">
                    <p>Card Holder</p>
                    <h6>Jack Peterson</h6>
                  </div>
                  <div className="mr-30">
                    <p>Expires</p>
                    <h6>11/22</h6>
                  </div>
                  <div className="card-footer-col col-logo ml-auto">
                    <img src={`img/mastercard-logo.png`} alt="mastercard" />
                  </div>
                </div>
              </Card>
            </Col>
            <Col span={8}>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 2fr",
                  gap: "50px",
                  backgroundColor: "#eeeeee",
                  marginTop: "10px",
                  padding: "16px",
                  borderRadius: "8px",
                  width: "400px",
                }}
              >
                <div>
                  <img
                    src="https://th.bing.com/th/id/OIP.wGCp5EhalbmWheQdMqJwpwHaHa?pid=ImgDet&rs=1" // Replace with the URL of your image
                    style={{
                      width: "100%",
                      height: "auto",
                      borderRadius: "4px",
                    }}
                  />
                </div>
                <div style={{ alignContent: "center" }}>
                  <h4>Add a new card</h4>
                </div>
              </div>
            </Col>
          </Row>
        </Content>

        <AppFooter />
      </Layout>
    </>
  );
};
export default Profile;
