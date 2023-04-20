import React from "react";
import { Button, Layout } from "antd";
import { Col, Row, Divider } from "antd";
import { Popover, Steps } from "antd";
import AppHeader from "../components/AppHeader";
import Categories from "../components/Categories";
import { Content } from "antd/es/layout/layout";

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
      <div style={{ backgroundColor: "white" }}>
        <Layout
          className="layout-default layout-signin"
          style={{ height: "100%" }}
        >
          <AppHeader />
          <Categories />
          <Content style={{ paddingBottom: "100px" }}>
            <Row
              gutter={[24, 0]}
              justify="left"
              style={{ marginLeft: "50px", marginRight: "50px" }}
            >
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
            </Row>
          </Content>
        </Layout>
      </div>
    </>
  );
};

export default OrderHistory;
