import React, { Component } from "react";
import AppHeader from "../components/AppHeader";
import { Content } from "antd/es/layout/layout";
import { Col, Layout, Menu, Row } from "antd";
import { AppstoreOutlined } from "@ant-design/icons";
import Inventory from "./admin/Inventory";
import Seller from "./admin/Seller";
import Product from "./admin/Product";

class AdminLanding extends Component {
  constructor(props) {
    super(props);
    this.state = {
      current: "metrics",
      items: [],
    };
  }

  componentDidMount = async () => {
    const items = [
      {
        label: "Metrics",
        key: "metrics",
        icon: <AppstoreOutlined />,
      },
      {
        label: "Seller",
        key: "seller",
        icon: <AppstoreOutlined />,
        children: [
          {
            label: "Add new seller",
            key: "addSeller",
          },
          {
            label: "Update seller",
            key: "updateSeller",
          },
        ],
      },
      {
        label: "Products",
        key: "products",
        icon: <AppstoreOutlined />,
        children: [
          {
            label: "Add new product",
            key: "addProducts",
          },
          {
            label: "Update product",
            key: "updateProducts",
          },
        ],
      },
      {
        label: "Inventory",
        key: "inventory",
        icon: <AppstoreOutlined />,
      },
      {
        label: "Orders",
        key: "orders",
        icon: <AppstoreOutlined />,
      },
      {
        label: "Users",
        key: "users",
        icon: <AppstoreOutlined />,
      },
    ];
    this.setState({ items: items });
  };

  getContent = (current) => {
    const { notification } = this.props;
    switch (current) {
      case "metrics":
        return "Metrics";
      case "inventory":
        return <Inventory />;
      case "orders":
        return <div>Orders</div>;
      case "addProducts":
        return <Product mode={"add"} notification={notification} />;
      case "updateProducts":
        return <Product mode={"update"} notification={notification} />;
      case "addSeller":
        return <Seller mode={"add"} notification={notification} />;
      case "updateSeller":
        return <Seller mode={"update"} notification={notification} />;
      case "users":
        return <div>Users</div>;
      default:
        return <div>Metrics</div>;
    }
  };

  render() {
    const { current, items } = this.state;

    return (
      <Layout
        className="layout-default layout-signin"
        style={{ height: "100%" }}
      >
        <AppHeader />
        <Content
          style={{
            paddingBottom: "100px",
            paddingTop: "100px",
            paddingLeft: "5%",
            paddingRight: "5%",
          }}
        >
          <Row
            gutter={[24, 0]}
            justify="left"
            style={{ marginLeft: "50px", marginRight: "50px" }}
          >
            <Col span={4}>
              <Menu
                onClick={(e) => {
                  this.setState({ current: e.key });
                }}
                mode="inline"
                selectedKeys={[current]}
                items={items}
              />
            </Col>
            <Col span={20}>{this.getContent(current)}</Col>
          </Row>
        </Content>
      </Layout>
    );
  }
}

export default AdminLanding;
