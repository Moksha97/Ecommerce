import React, { Component } from "react";
import { Layout } from "antd";
import { Row, Col } from "antd";
import AppHeader from "../components/AppHeader";
import { Content } from "antd/es/layout/layout";
import ax from "../utils/httpreq";
import withRouter from "../components/withRouter";

class Invoice extends Component {
  constructor(props) {
    super(props);
    this.state = {
      order: {},
      orderitems: [],
    };
  }

  componentDidMount = async () => {
    const { oid } = this.props.params;
    const { notification } = this.props;
    const res = await ax.get(`/order/getorderdetails/${oid}`);
    if (res.status !== 200) {
      const { response } = res;
      notification.error({
        message: `Error: ${response.status}`,
        description: response.data.error,
        placement: "topRight",
      });
    } else {
      console.log(res.data);
      const { data } = res;
      let order = data.order;
      let orderitems = data.orderitems;
      order.orderTotal = data.orderitems
        .map((item) => parseFloat(item.price))
        .reduce((prev, next) => {
          return prev + next;
        });
      this.setState({ order: order, orderitems: orderitems });
    }
  };

  render() {
    const { order, orderitems } = this.state;
    return (
      <Layout
        className="layout-default layout-signin"
        style={{ height: "100%" }}
      >
        <AppHeader />
        {/*<Categories />*/}
        <Content
          style={{
            paddingBottom: "100px",
            paddingTop: "100px",
            paddingLeft: "10%",
            paddingRight: "10%",
          }}
        >
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
                  width: "800px",
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
                      <div>{order.oid}</div>
                      <hr style={{ marginRight: "10px" }}></hr>
                    </Col>
                  </Row>
                  <Row>
                    <Col style={{ marginLeft: "10px" }} span={24}>
                      <h2>Order Date</h2>
                      <div>
                        {new Date(order.timestamp).toUTCString().slice(0, 16)}
                      </div>
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
                      <div> {order.status} </div>
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
                      <h2> Address</h2>
                      <div> {order.line1} </div>
                      <divp> {order.line2} </divp>
                      <div>
                        {" "}
                        {order.city + ", " + order.state + " " + order.zip}{" "}
                      </div>
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
                      <h2> Account</h2>
                      <div>Account: {order.accountnumber} </div>
                      <divp>Routing: {order.routingnumber} </divp>
                      <div>{order.bank + " " + order.branchcode}</div>
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

                  {orderitems.map((item) => (
                    <>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <div>Product Charges</div>
                        <div
                          style={{
                            textAlign: "right",
                            marginLeft: "50px",
                            marginBottom: "10px",
                          }}
                        >
                          US $ {item.price}
                        </div>
                      </div>
                    </>
                  ))}

                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    <div style={{ textAlign: "left" }}>Shipping</div>
                    <div
                      style={{
                        textAlign: "right",
                        marginLeft: "50px",
                        marginBottom: "10px",
                      }}
                    >
                      FREE
                    </div>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    <div style={{ textAlign: "left", marginLeft: "60px" }}>
                      {" "}
                      Subtotal
                    </div>
                    <div style={{ textAlign: "right", marginLeft: "50px" }}>
                      US $ {order.orderTotal}
                    </div>
                  </div>
                </pre>
              </div>
            </div>
          </Row>
        </Content>
      </Layout>
    );
  }
}

export default withRouter(Invoice);
