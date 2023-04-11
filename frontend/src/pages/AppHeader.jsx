import { Layout, Menu } from "antd";
import { Link } from "react-router-dom";
import React, { Component } from "react";

const { Header } = Layout;
export default class AppHeader extends Component {
  render() {
    return (
      <Header>
        <div className="header-col header-brand">
          <h5 style={{ fontSize: "2rem" }}>
            <span style={{ color: "#0076be" }}>My</span>
            <span style={{ color: "#48bf91" }}>Shop</span>
          </h5>
        </div>
        <div className="header-col header-nav">
          <Menu
            mode="horizontal"
            defaultSelectedKeys={["1"]}
            style={{ justifyContent: "right" }}
          >
            <Menu.Item key="1">
              <Link to="/">
                <span>Home</span>
              </Link>
            </Menu.Item>
            {/*<Menu.Item key="2">*/}
            {/*  <Link to="/profile">*/}
            {/*    <span>Profile</span>*/}
            {/*  </Link>*/}
            {/*</Menu.Item>*/}
            <Menu.Item key="2">
              <Link to="/login">
                <span>Login</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="3">
              <Link to="/signup">
                <span>Sign up</span>
              </Link>
            </Menu.Item>
          </Menu>
        </div>
      </Header>
    );
  }
}
