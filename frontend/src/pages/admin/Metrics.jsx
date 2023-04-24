import React, { Component } from "react";
import ax from "../../utils/httpreq";
import { Card, Col, Row } from "antd";

class Metrics extends Component {
  constructor(props) {
    super(props);
    this.state = {
      metrics: {},
      productMetrics: [],
      ordersByDate: [],
    };
  }

  componentDidMount = async () => {
    const { notification } = this.props;
    let res = await ax.get("/admin/metrics");
    if (res.status !== 200) {
      notification.error({
        message: `Error: ${res.status}`,
        description: res.data.error,
        placement: "topRight",
      });
    } else {
      this.setState({ metrics: res.data });
    }

    res = await ax.get("/admin/metrics/product");
    if (res.status !== 200) {
      notification.error({
        message: `Error: ${res.status}`,
        description: res.data.error,
        placement: "topRight",
      });
    } else {
      this.setState({ productMetrics: res.data.slice(0, 7) });
    }

    res = await ax.get("/admin/metrics/orders_by_date");
    if (res.status !== 200) {
      notification.error({
        message: `Error: ${res.status}`,
        description: res.data.error,
        placement: "topRight",
      });
    } else {
      console.log(res.data);
      this.setState({ ordersByDate: res.data.slice(0, 7) });
    }
  };

  render() {
    const { metrics, productMetrics, ordersByDate } = this.state;
    return (
      <Row>
        <Col span={24}>
          <h2>Metrics</h2>
        </Col>
        <Col span={6} style={{ padding: "10px" }}>
          <Card title="Orders">
            <Row>
              <Col span={24}>
                <b>Revenue </b>
                <span style={{ float: "right" }}>US $ {metrics.revenue}</span>
                <br />
                <b>Not shipped</b>{" "}
                <span style={{ float: "right" }}>{metrics.not_shipped}</span>{" "}
                <br />
                <b>Shipped</b>{" "}
                <span style={{ float: "right" }}>{metrics.shipped}</span> <br />
                <b>Delivered</b>{" "}
                <span style={{ float: "right" }}>{metrics.delivered}</span>{" "}
                <br />
                <b>Cancelled</b>{" "}
                <span style={{ float: "right" }}>{metrics.cancelled}</span>{" "}
              </Col>
            </Row>
          </Card>
        </Col>
        <Col span={12} style={{ padding: "10px" }}>
          <Card title="Top 7 products revenue">
            <Row>
              <Col span={24}>
                {productMetrics.map((product) => (
                  <div key={product.pid}>
                    <b>{product.pname}</b>{" "}
                    <span>{" | " + product.pcategory}</span>
                    <span style={{ float: "right" }}>
                      US ${" "}
                      {product.revenue + " @ " + product.totalquantity + " qty"}
                    </span>
                    <br />
                  </div>
                ))}
              </Col>
            </Row>
          </Card>
        </Col>
        <Col span={6} style={{ padding: "10px" }}>
          <Card title="# of orders by date">
            <Row>
              <Col span={24}>
                {ordersByDate.map((order, index) => (
                  <div key={index}>
                    <b>{new Date(order.date).toUTCString().slice(0, 16)}</b>{" "}
                    <span style={{ float: "right" }}>{order.totalorders}</span>
                    <br />
                  </div>
                ))}
              </Col>
            </Row>
          </Card>
        </Col>
        <Col span={6} style={{ padding: "10px" }}>
          <Card title="Inventory">
            <Row>
              <Col span={24}>
                <b>Active listing</b>
                <span style={{ float: "right" }}>
                  {metrics.active_listings}
                </span>{" "}
                <br />
                <b>Out of stock</b>{" "}
                <span style={{ float: "right" }}>{metrics.out_of_stock}</span>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
    );
  }
}

export default Metrics;
