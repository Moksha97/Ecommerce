import React from "react";
import { Link } from "react-router-dom";
import { Button, Layout, Menu, Input } from "antd";
import { ShoppingCartOutlined, UserOutlined } from "@ant-design/icons";
import { Row, Col } from "antd";
import AppHeader from "./AppHeader";
import Categories from "../components/Categories";
import { Content } from "antd/es/layout/layout";

const { Header } = Layout;
const { Search } = Input;

const Invoice = () => {
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
            <div>
              <h1
                style={{
                  fontSize: "30px",
                  //fontWeight: 'bold',
                  color: "black",
                  marginLeft: "27px",
                  marginBottom: "16px",
                }}
              >
                {" "}
                Invoice{" "}
              </h1>
              <div
                style={{
                  width: "700px",
                  height: "450px",
                  border: "1px solid grey",
                  borderRadius: "5px",
                  display: "flex",

                  marginLeft: "20px",
                }}
              >
                <div>
                  <Row>
                    <Col
                      style={{ marginLeft: "10px", marginRight: "10px" }}
                      span={24}
                    >
                      <h2>Order Number</h2>
                      <p>12346556</p>
                      <hr style={{ marginRight: "10px" }}></hr>
                    </Col>
                  </Row>
                  <Row>
                    <Col style={{ marginLeft: "10px" }} span={24}>
                      <h2>Order Date</h2>
                      <p>mm-dd-yyyy</p>
                      <hr style={{ marginRight: "10px" }}></hr>
                    </Col>
                  </Row>
                  <Row>
                    <Col
                      style={{
                        marginLeft: "10px",
                      }}
                      span={24}
                    >
                      <h2> Status</h2>
                      <p> Shipped </p>
                      <hr style={{ marginRight: "10px" }}></hr>
                    </Col>
                  </Row>
                </div>

                <div
                  style={{
                    width: "1px",
                    height: "440px",
                    backgroundColor: "lightGrey",
                    margin: "0px 10px",
                    marginTop: "5px",
                    marginBottom: "5px",
                  }}
                ></div>

                <pre>
                  <h2>Balance Details</h2>

                  <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <div>Product Charges</div>
                    <div
                      style={{
                        textAlign: "right",
                        marginLeft: "50px",
                        marginBottom: "10px",
                      }}
                    >
                      US $Price
                    </div>
                  </div>
                  <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <div style={{ textAlign: "left" }}>Shipping</div>
                    <div
                      style={{
                        textAlign: "right",
                        marginLeft: "50px",
                        marginBottom: "10px",
                      }}
                    >
                      US $Price
                    </div>
                  </div>
                  <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <div style={{ textAlign: "left" }}>Transaction Fees</div>
                    <div
                      style={{
                        textAlign: "right",
                        marginLeft: "50px",
                        marginBottom: "10px",
                      }}
                    >
                      US $Price
                    </div>
                  </div>
                  <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <div style={{ textAlign: "left", marginLeft: "60px" }}>
                      {" "}
                      Subtotal
                    </div>
                    <div style={{ textAlign: "right", marginLeft: "50px" }}>
                      US $Price
                    </div>
                  </div>
                </pre>
              </div>
            </div>
          </Row>
        </Content>
      </Layout>
    </>
  );
};
export default Invoice;
