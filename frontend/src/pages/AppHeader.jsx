import { Input, Layout, Menu } from "antd";
import { Link } from "react-router-dom";
import React from "react";

const { Header } = Layout;
// const { Search } = Input;
const AppHeader = () => {
  const links = [
    {
      key: "home",
      label: "Home",
      link: "/",
    },
    {
      key: "cart",
      label: "Cart",
      link: "/cart",
    },
    {
      key: "profile",
      label: "Profile",
      link: "/profile",
    },
    {
      key: "login",
      label: "Login",
      link: "/login",
    },
    {
      key: "invoice",
      label: "Invoice",
      link: "/invoice",
    },
    {
      key: "orders",
      label: "Orders",
      link: "/orders",
    },
  ];
  return (
    <Header
      style={{
        position: "fixed",
        zIndex: 2,
        width: "100%",
      }}
    >
      <div className="header-col header-brand">
        <Link to={"/"}>
          <h5 style={{ fontSize: "2rem" }}>
            <span style={{ color: "#0076be" }}>My</span>
            <span style={{ color: "#48bf91" }}>Shop</span>
          </h5>
        </Link>
      </div>
      <Input
        bordered={false}
        placeholder="Search..."
        allowClear
        /*onSearch={onSearch}*/
        style={{
          alignSelf: "center",
          marginLeft: "50px",
          backgroundColor: "#f0f2f5",
        }}
      />
      <div className="header-col header-nav">
        <Menu
          mode="horizontal"
          defaultSelectedKeys={["1"]}
          style={{ justifyContent: "right" }}
        >
          {links.map((link) => (
            <Menu.Item key={link.key}>
              <Link to={link.link}>{link.label}</Link>
            </Menu.Item>
          ))}
        </Menu>
      </div>
    </Header>
  );
};

export default AppHeader;
