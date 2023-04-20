import { Button, Dropdown, Form, Input, Layout, Menu, Space } from "antd";
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
    let defaultLinksIfLoggedIn = [
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
        key: "orders",
        label: "Orders",
        link: "/orders",
      },
    ];
    let linksIfLoggedIn = [
      {
        key: "profile",
        label: <a href="/profile">Profile</a>,
        link: "/profile",
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
    let defaultLinksIfNotLoggedIn = [
      {
        key: "home",
        label: "Home",
        link: "/",
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
        defaultLinks: defaultLinksIfNotLoggedIn,
        links: linksIfNotLoggedIn,
        loggedIn: false,
      });
    } else {
      const { data } = res;
      if (data.length !== 0) {
        let user = data[0];
        this.setState({
          defaultLinks: defaultLinksIfLoggedIn,
          links: linksIfLoggedIn,
          fullName: user.fname + " " + user.lname,
          loggedIn: true,
        });
      }
    }
  };

  render() {
    const { defaultLinks, links, fullName, loggedIn } = this.state;
    const { onSearch } = this.props;
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
        <div className="header-col header-nav">
          <Form
            onFinish={onSearch ? onSearch : () => {}}
            style={{ paddingTop: "8px" }}
          >
            <Form.Item name="search">
              <Input
                bordered={false}
                placeholder="Search..."
                allowClear
                style={{
                  alignSelf: "center",
                  marginLeft: "50px",
                  backgroundColor: "#f0f2f5",
                }}
              />
            </Form.Item>
          </Form>
        </div>
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
