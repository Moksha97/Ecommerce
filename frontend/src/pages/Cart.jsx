import React from "react";
import { Button, Card, Layout } from "antd";
import { Col, Row, Divider } from "antd";
import AppHeader from "../components/AppHeader";
import Categories from "../components/Categories";
import { Content } from "antd/es/layout/layout";
import AppFooter from "../components/AppFooter";

const Cart = () => {
  return (
    <>
      <div>
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
              <Col
                span={24}
                style={{
                  fontSize: "28px",
                  marginTop: "12px",
                  marginBottom: "2px",
                }}
              >
                Shipping Address
              </Col>
              <Col span={8}>
                <p
                  style={{
                    fontSize: "20px",
                    margin: 0,
                  }}
                >
                  Primary Ship from address:
                </p>
              </Col>
              <Col span={8}>
                <pre>
                  <p>Name</p>
                  <p>Street road</p>
                  <p>Apt no</p>
                  <p>Pincode</p>
                </pre>
              </Col>
              <Col span={8} style={{ alignSelf: "center" }}>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "8px",
                    Padding: "10px",
                  }}
                >
                  <Button
                    style={{
                      width: "100%",
                      height: "40px",
                      fontSize: "16px",
                    }}
                    type="primary"
                  >
                    Select
                  </Button>
                  <Button
                    style={{
                      width: "100%",
                      height: "40px",
                      fontSize: "16px",
                    }}
                    type="primary"
                  >
                    Add a new address
                  </Button>
                </div>
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
                Shopping Cart
              </Col>
              <Col span={18}>
                <Row
                  gutter={[24, 0]}
                  justify="left"
                  style={{ marginRight: "50px" }}
                >
                  <Col span={8}>
                    <div>
                      <img
                        src="https://usa.fulfilnutrition.com/wp-content/uploads/2022/01/FULFIL-Website-CutBar-CSC-768x768-1.jpg"
                        alt="Product"
                        style={{
                          width: "200px",
                          height: "200px",
                          objectFit: "cover",
                          borderRadius: "4px",
                          marginLeft: "10px",
                        }}
                      />
                    </div>
                  </Col>

                  <Col span={16}>
                    <h4 style={{ margin: "0", fontWeight: "bold" }}>Product</h4>
                    <h4 style={{ margin: "0", textAlign: "right" }}>Price</h4>
                    <p style={{ margin: "0", color: "gray" }}>Quantity</p>
                  </Col>
                  <Divider />
                  <Col span={8}>
                    <div>
                      <img
                        src="https://usa.fulfilnutrition.com/wp-content/uploads/2022/01/FULFIL-Website-CutBar-CSC-768x768-1.jpg"
                        alt="Product"
                        style={{
                          width: "200px",
                          height: "200px",
                          objectFit: "cover",
                          borderRadius: "4px",
                          marginLeft: "10px",
                        }}
                      />
                    </div>
                  </Col>

                  <Col span={16}>
                    <h4 style={{ margin: "0", fontWeight: "bold" }}>Product</h4>
                    <h4 style={{ margin: "0", textAlign: "right" }}>Price</h4>
                    <p style={{ margin: "0", color: "gray" }}>Quantity</p>
                  </Col>
                  <Divider />
                  <Col span={8}>
                    <div>
                      <img
                        src="https://usa.fulfilnutrition.com/wp-content/uploads/2022/01/FULFIL-Website-CutBar-CSC-768x768-1.jpg"
                        alt="Product"
                        style={{
                          width: "200px",
                          height: "200px",
                          objectFit: "cover",
                          borderRadius: "4px",
                          marginLeft: "10px",
                        }}
                      />
                    </div>
                  </Col>

                  <Col span={16}>
                    <h4 style={{ margin: "0", fontWeight: "bold" }}>Product</h4>
                    <h4 style={{ margin: "0", textAlign: "right" }}>Price</h4>
                    <p style={{ margin: "0", color: "gray" }}>Quantity</p>
                  </Col>
                  <Divider />
                  <Col span={8}>
                    <div>
                      <img
                        src="https://usa.fulfilnutrition.com/wp-content/uploads/2022/01/FULFIL-Website-CutBar-CSC-768x768-1.jpg"
                        alt="Product"
                        style={{
                          width: "200px",
                          height: "200px",
                          objectFit: "cover",
                          borderRadius: "4px",
                          marginLeft: "10px",
                        }}
                      />
                    </div>
                  </Col>

                  <Col span={16}>
                    <h4 style={{ margin: "0", fontWeight: "bold" }}>Product</h4>
                    <h4 style={{ margin: "0", textAlign: "right" }}>Price</h4>
                    <p style={{ margin: "0", color: "gray" }}>Quantity</p>
                  </Col>
                </Row>
              </Col>

              <Col span={6}>
                <div
                  className="rectangle-box"
                  style={{
                    border: "1px #c7bca1",
                    height: "350PX",
                    width: "300PX",
                  }}
                >
                  <h2 style={{ alignContent: "Center" }}>Cart Summary</h2>
                  <Divider Style={{ marginTop: "0px" }} />
                  <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <div>Subtotal</div>
                    <div>US $Price</div>
                  </div>
                  <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <div>Shipping</div>
                    <div>US $Fee</div>
                  </div>
                  <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <div>Discount</div>
                    <div>US $Discount</div>
                  </div>
                  <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <div>Estimated Tax</div>
                    <div>US $Tax</div>
                  </div>
                  <Divider Style={{ marginTop: "0px" }} />
                  <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <div>
                      <b>Total</b>
                    </div>
                    <div>US $Total</div>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
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
                      }}
                      type="primary"
                    >
                      Select
                    </Button>
                  </div>
                </div>
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
                <Card
                  bordered={false}
                  className="card-credit header-solid h-ful"
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
      </div>
    </>
  );
};

export default Cart;
