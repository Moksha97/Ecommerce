import { Button, Dropdown, Input, Layout, Menu, Space } from "antd";
import { Link } from "react-router-dom";
import React, { Component } from "react";
import ax from "../utils/httpreq";
import { DownOutlined } from "@ant-design/icons";

const { Header } = Layout;

class AppHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      defaultLinks: [],
      links: [],
      fullName: "",
      loggedIn: false,
    };
  }

  componentDidMount = async () => {
    let defaultLinks = [
      {
        key: "home",
        label: "Home",
        link: "/",
      },
    ];
    let linksIfLoggedIn = [
      {
        key: "profile",
        label: <a href="/profile">Profile</a>,
        link: "/profile",
      },
      {
        key: "cart",
        label: <a href={"/cart"}>Cart</a>,
        link: "/cart",
      },
      {
        key: "orders",
        label: <a href={"/orders"}>Orders</a>,
        link: "/orders",
      },
      {
        key: "invoice",
        label: <a href={"/invoice"}>Invoice</a>,
        link: "/invoice",
      },
      {
        key: "logout",
        label: <a href={"/logout"}>Logout</a>,
        link: "/logout",
        danger: true,
      },
    ];

    let linksIfNotLoggedIn = [
      {
        key: "login",
        label: "Login",
        link: "/login",
      },
      {
        key: "signup",
        label: "Sign Up",
        link: "/signup",
      },
    ];

    let res = await ax.get("/users/getUser");
    console.log(res);
    if (res.status !== 200) {
      this.setState({
        defaultLinks: defaultLinks,
        links: linksIfNotLoggedIn,
        loggedIn: false,
      });
    } else {
      const { data } = res;
      if (data.length !== 0) {
        let user = data[0];
        this.setState({
          defaultLinks: defaultLinks,
          links: linksIfLoggedIn,
          fullName: user.fname + " " + user.lname,
          loggedIn: true,
        });
      }
    }
  };

  render() {
    const { defaultLinks, links, fullName, loggedIn } = this.state;

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
            {!loggedIn &&
              [...defaultLinks, ...links].map((link) => (
                <Menu.Item key={link.key}>
                  <Link to={link.link}>{link.label}</Link>
                </Menu.Item>
              ))}
            {loggedIn &&
              defaultLinks.map((link) => (
                <Menu.Item key={link.key}>
                  <Link to={link.link}>{link.label}</Link>
                </Menu.Item>
              ))}
            {loggedIn && (
              <Menu.Item key={"dropdown"}>
                <Dropdown
                  menu={{
                    items: links,
                    onClick: (key) => {
                      console.log("clicked on ", key);
                      return <Link to={key} />;
                    },
                  }}
                >
                  <Button type={"text"}>
                    <Space>{fullName}</Space>
                    <DownOutlined />
                  </Button>
                </Dropdown>
              </Menu.Item>
            )}
          </Menu>
        </div>
      </Header>
    );
  }
}

export default AppHeader;
