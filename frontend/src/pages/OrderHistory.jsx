import React, { Component } from "react";
import { Button, Empty, Layout, Rate, Space } from "antd";
import { Col, Row, Divider } from "antd";
import { Steps } from "antd";
import AppHeader from "../components/AppHeader";
import { Content } from "antd/es/layout/layout";
import UnsplashImage from "../components/AsyncImage";
import ax from "../utils/httpreq";

class OrderHistory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      orders: [],
    };
  }

  componentDidMount = async () => {
    await this.getOrders();
  };

  getOrders = async () => {
    const { notification } = this.props;
    const res = await ax.get("/order/getorders");
    if (res.status !== 200) {
      const { response } = res;
      notification.error({
        message: `Error: ${response.status}`,
        description: response.data.error,
        placement: "topRight",
      });
    } else {
      const { data } = res;
      const orders = await Promise.all(
        data.map(async (order) => {
          let orderDetails = await ax.get(
            `/order/getorderdetails/${order.oid}`
          );
          if (orderDetails.status === 200) {
            const { data } = orderDetails;
            order.orderitems = data.orderitems;
          } else {
            order.orderitems = [];
          }

          let orderTotal = order.orderitems
            .map((item) => parseFloat(item.price))
            .reduce((prev, next) => {
              return prev + next;
            });

          let statuses = [
            "PLACED",
            "PACKED",
            "INTRANSIT",
            "DELIVERED",
            "CANCELED",
          ];
          order.statusNumber = statuses.indexOf(order.status);
          order.total = orderTotal;
          return order;
        })
      );
      this.setState({ orders: orders });
    }
  };

  viewInvoice = (oid) => {
    window.location.href = `/invoice/${oid}`;
  };

  rateProduct = (pid, rating) => {
    const { notification } = this.props;
    let res = ax.post("/product/rate", {
      pid: pid,
      rating: rating,
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
      notification.success({
        message: `Success`,
        description: data.message,
        placement: "topRight",
      });
    }
  };

  render() {
    const { orders } = this.state;
    return (
      <div style={{ backgroundColor: "white" }}>
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
              <Col span={24}>
                <h1>Order History</h1>
              </Col>
              <Col span={24}>
                {orders.length === 0 ? (
                  <Col span={24}>
                    <Empty />
                  </Col>
                ) : (
                  ""
                )}
                {orders.map((order) => (
                  <Row key={order.oid}>
                    <Col
                      span={24}
                      style={{ paddingBottom: "40px", paddingTop: "40px" }}
                    >
                      <Steps
                        status={order.statusNumber === 4 ? "error" : "finish"}
                        current={
                          order.statusNumber >= 4 ? 0 : order.statusNumber
                        }
                        items={[
                          {
                            title:
                              order.statusNumber === 4
                                ? "Cancelled"
                                : "Accepted",
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
                    </Col>
                    <Col span={6}>
                      <pre style={{ margin: 0 }}>
                        <h4 style={{ marginBottom: "0px" }}>Order Placed</h4>
                        <h4 style={{ marginTop: "0px" }}>
                          {new Date(order.timestamp).toUTCString().slice(0, 16)}
                        </h4>
                        {/*<h4 style={{ marginTop: "0px" }}>US $ </h4>*/}
                        <h4 style={{ marginBottom: "0px" }}>
                          Order #{order.oid}
                        </h4>
                        <h4 style={{ marginBottom: "0px" }}>
                          Total US $ {order.total}
                        </h4>
                      </pre>
                    </Col>
                    <Col span={12}>
                      {order.orderitems.map((product) => (
                        <Row style={{ paddingBottom: "10px" }} id={product.pid}>
                          <Col span={12}>
                            <UnsplashImage
                              height={100}
                              keyword={product.pname}
                            />
                          </Col>
                          <Col span={12}>
                            <div style={{ margin: "0 0 0 10px" }}>
                              Product: {product.pname}
                            </div>
                            <div style={{ margin: "0 0 0 10px" }}>
                              Quantity: {product.quantity}
                            </div>
                            <div style={{ margin: "0 0 0 10px" }}>
                              Item price: US $ {product.price}
                            </div>
                            {order.statusNumber === 3 ? (
                              <div style={{ margin: "0 0 0 10px" }}>
                                <Rate
                                  allowHalf
                                  onChange={(rating) => {
                                    this.rateProduct(product.pid, rating);
                                  }}
                                />
                              </div>
                            ) : (
                              ""
                            )}
                          </Col>
                        </Row>
                      ))}
                    </Col>

                    <Col
                      span={6}
                      style={{ justifyContent: "right", display: "flex" }}
                    >
                      <Space direction={"vertical"}>
                        <Button
                          type="primary"
                          onClick={() => {
                            this.viewInvoice(order.oid);
                          }}
                        >
                          View invoice
                        </Button>
                        {order.statusNumber === 3 || order.statusNumber === 4
                          ? ""
                          : ""}
                      </Space>
                    </Col>
                    <Divider />
                  </Row>
                ))}
              </Col>
            </Row>
          </Content>
        </Layout>
      </div>
    );
  }
}

export default OrderHistory;
