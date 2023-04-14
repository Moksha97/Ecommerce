import { Layout, Menu } from "antd";
import { Link } from "react-router-dom";
import React from "react";
// import ax from "../utils/httpreq";

const { Header } = Layout;

// async function checkIfUserIsLoggedIn() {
//   await ax.get("/");
// }

const AppHeader = () => {
  // checkIfUserIsLoggedIn().then();
  return (
    <Header>
      <div className="header-col header-brand">
        <Link to={"/"}>
          <h5 style={{ fontSize: "2rem" }}>
            <span style={{ color: "#0076be" }}>My</span>
            <span style={{ color: "#48bf91" }}>Shop</span>
          </h5>
        </Link>
      </div>
      <div className="header-col header-nav">
        <Menu
          mode="horizontal"
          defaultSelectedKeys={["1"]}
          style={{ justifyContent: "right" }}
        >
          <Menu.Item key="1">
            <Link to="/">
              <span style={{ color: "white" }}>Home</span>
            </Link>
          </Menu.Item>
          <Menu.Item key="2">
            <Link to="/login">
              <span style={{ color: "white" }}>Login</span>
            </Link>
          </Menu.Item>
          <Menu.Item key="3">
            <Link to="/signup">
              <span style={{ color: "white" }}>Sign up</span>
            </Link>
          </Menu.Item>
        </Menu>
      </div>
    </Header>
  );
};

export default AppHeader;
