import React from "react";
import { Link } from "react-router-dom";
import { Button, Layout, Menu, Input } from "antd";
import { ShoppingCartOutlined, UserOutlined } from "@ant-design/icons";
import { Col, Row, Divider } from "antd";
import { Popover, Steps } from "antd";

const { Header } = Layout;
const { Search } = Input;
const customDot = (dot, { status, index }) => (
  <Popover
    content={
      <span>
        step {index} status: {status}
      </span>
    }
  >
    {dot}
  </Popover>
);

const OrderHistory = () => {
  return (
    <>
      <div style={{ backGroundColor: "white" }}>
        <Layout
          className="layout-default layout-signin"
          style={{ height: "100%" }}
        >
          <Header style={{ backGroundColor: "white" }}>
            <div className="header-col header-brand">
              <h5 style={{ fontSize: "2rem" }}>
                <span style={{ color: "#0076be" }}>My</span>
                <span style={{ color: "#48bf91" }}>Shop</span>
              </h5>
            </div>
            <div className="header-col header-nav" style={{ marginLeft: 250 }}>
              <Search
                placeholder="Search.."
                allowClear
                /*onSearch={onSearch}*/
                style={{ width: 304 }}
              />
            </div>
            <Menu
              mode="horizontal"
              defaultSelectedKeys={["1"]}
              style={{ justifyContent: "right" }}
            >
              <Menu.Item key="1">
                <Link to="/users/Cart">
                  <span>
                    <ShoppingCartOutlined />
                  </span>
                </Link>
              </Menu.Item>

              <Menu.Item key="2">
                <Link to="/users/Profile">
                  <span>
                    <UserOutlined />
                  </span>
                </Link>
              </Menu.Item>
            </Menu>
          </Header>
          <Header style={{ backgroundColor: "#e8f3d6" }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                width: "100%",
                height: "40px",
                backgroundColor: "#e8f3d6",
              }}
            >
              <div style={{ flex: "1", textAlign: "center" }}>
                <span>
                  {" "}
                  <b>
                    <Button type="text" style={{ elevation: 0 }} block>
                      Home
                    </Button>
                  </b>{" "}
                </span>
              </div>
              <div style={{ flex: "1", textAlign: "center" }}>
                <span>
                  <b>
                    <Button type="text" block>
                      Electronics
                    </Button>
                  </b>
                </span>
              </div>
              <div style={{ flex: "1", textAlign: "center" }}>
                <span>
                  <b>
                    <Button type="text" block>
                      Fashion
                    </Button>
                  </b>
                </span>
              </div>
              <div style={{ flex: "1", textAlign: "center" }}>
                <span>
                  <b>
                    <Button type="text" block>
                      Health
                    </Button>
                  </b>
                </span>
              </div>
            </div>
          </Header>
          <div>
            <h1
              style={{
                fontSize: "30px",
                fontWeight: "bold",
                color: "black",
                marginLeft: "27px",
                marginBottom: "16px",
              }}
            >
              {" "}
              Order History{" "}
            </h1>
            <div
              style={{
                width: "1500px",
                height: "100px",
                backgroundColor: "#d3d3d3",
                borderRadius: "5px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginLeft: "45px",
              }}
            >
              <Steps
                current={1}
                progressDot={customDot}
                items={[
                  {
                    title: "Accepted",
                  },
                  {
                    title: "In Progress",
                  },
                  {
                    title: "Out for Delivery",
                  },
                  {
                    title: "Delivered",
                  },
                ]}
              />
            </div>
            <Row style={{ marginLeft: "40px" }}>
              <Col span={4}>
                <pre>
                  <h4 style={{ marginBottom: "0px" }}>Order Placed:</h4>
                  <h4 style={{ marginTop: "0px" }}>Date</h4>
                  <h4 style={{ marginBottom: "0px" }}>Total:</h4>
                  <h4 style={{ marginTop: "0px" }}>US $Price</h4>
                  <h4 style={{ marginBottom: "0px" }}>#Order Number</h4>
                  <Button style={{ paddingLeft: "0px" }} type="link">
                    Download Invoice
                  </Button>
                </pre>
              </Col>

              <div
                style={{
                  marginTop: "10px",
                  width: "2px",
                  height: "200px",
                  backgroundColor: "#d3d3d3",
                  margin: "0 10px",
                }}
              ></div>

              <Col span={18}>
                <Row>
                  <Col span={5}>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "16px",
                        marginBottom: "16px",
                      }}
                    >
                      <img
                        src="https://usa.fulfilnutrition.com/wp-content/uploads/2022/01/FULFIL-Website-CutBar-CSC-768x768-1.jpg" // Use product image URL as src
                        alt="Product"
                        style={{
                          width: "200px",
                          height: "200px",
                          objectFit: "cover",
                          borderRadius: "4px",
                          marginLeft: "10px",
                          marginRight: "0px",
                          marginTop: "10px",
                        }}
                      />
                    </div>
                  </Col>

                  <Col span={18}>
                    <Row>
                      <Col span={9}>
                        <h4
                          style={{
                            marginLeft: "10px",
                            fontWeight: "bold",
                            fontSize: "15px",
                          }}
                        >
                          Product{" "}
                        </h4>
                        <h4 style={{ marginLeft: "10px" }}>Quantity:</h4>
                        <h4 style={{ marginLeft: "10px" }}>Item price: </h4>
                        <h4 style={{ marginLeft: "10px" }}>Shipping: </h4>
                      </Col>
                      <Col span={6}>
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "column",

                            gap: "8px",
                            Padding: "10px",
                          }}
                        >
                          <Button
                            style={{
                              width: "100%",
                              height: "40px",
                              fontSize: "16px",
                              marginTop: "20px",
                              alignSelf: "flex-end",
                              backgroundColor: "#e74646",
                            }}
                            type="primary"
                          >
                            Cancel
                          </Button>
                        </div>
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </Col>
            </Row>
            <Divider />
          </div>

          <div>
            <div
              style={{
                width: "1500px",
                height: "100px",
                backgroundColor: "#d3d3d3",
                borderRadius: "5px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginLeft: "45px",
              }}
            >
              <Steps
                current={3}
                progressDot={customDot}
                items={[
                  {
                    title: "Accepted",
                  },
                  {
                    title: "In Progress",
                  },
                  {
                    title: "Out for Delivery",
                  },
                  {
                    title: "Delivered",
                  },
                ]}
              />
            </div>
            <Row style={{ marginLeft: "40px" }}>
              <Col span={4}>
                <pre>
                  <h4 style={{ marginBottom: "0px" }}>Order Placed:</h4>
                  <h4 style={{ marginTop: "0px" }}>Date</h4>
                  <h4 style={{ marginBottom: "0px" }}>Total:</h4>
                  <h4 style={{ marginTop: "0px" }}>US $Price</h4>
                  <h4 style={{ marginBottom: "0px" }}>#Order Number</h4>
                  <Button style={{ paddingLeft: "0px" }} type="link">
                    Download Invoice
                  </Button>
                </pre>
              </Col>

              <div
                style={{
                  marginTop: "10px",
                  width: "2px",
                  height: "200px",
                  backgroundColor: "#d3d3d3",
                  margin: "0 10px",
                }}
              ></div>

              <Col span={18}>
                <Row>
                  <Col span={5}>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "16px",
                        marginBottom: "16px",
                      }}
                    >
                      <img
                        src="https://usa.fulfilnutrition.com/wp-content/uploads/2022/01/FULFIL-Website-CutBar-CSC-768x768-1.jpg" // Use product image URL as src
                        alt="Product"
                        style={{
                          width: "200px",
                          height: "200px",
                          objectFit: "cover",
                          borderRadius: "4px",
                          marginLeft: "10px",
                          marginRight: "0px",
                          marginTop: "10px",
                        }}
                      />
                    </div>
                  </Col>

                  <Col span={18}>
                    <Row>
                      <Col span={9}>
                        <h4
                          style={{
                            marginLeft: "10px",
                            fontWeight: "bold",
                            fontSize: "15px",
                          }}
                        >
                          Product{" "}
                        </h4>
                        <h4 style={{ marginLeft: "10px" }}>Quantity:</h4>
                        <h4 style={{ marginLeft: "10px" }}>Item price: </h4>
                        <h4 style={{ marginLeft: "10px" }}>Shipping: </h4>
                      </Col>
                      <Col span={6}>
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "column",

                            gap: "8px",
                            Padding: "10px",
                          }}
                        >
                          <Button
                            style={{
                              width: "100%",
                              height: "40px",
                              fontSize: "16px",
                              marginTop: "20px",
                              alignSelf: "flex-end",
                              backgroundColor: "#bfdB38",
                            }}
                            type="primary"
                          >
                            Rate this Product
                          </Button>
                        </div>
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </Col>
            </Row>
            <Divider />
          </div>
        </Layout>
      </div>
    </>
  );
};

export default OrderHistory;
