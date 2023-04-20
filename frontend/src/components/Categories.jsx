import React, { Component } from "react";
import { Menu } from "antd";
import { Link } from "react-router-dom";

import ax from "../utils/httpreq";

class Categories extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
    };
  }

  componentDidMount = async () => {
    const { notification } = this.props;

    const res = await ax.get("/product/category");
    if (res.status !== 200) {
      const { response } = res;
      notification.error({
        message: `Error: ${response.status}`,
        description: response.data.error,
        placement: "topRight",
      });
    } else {
      this.setState({ categories: res.data });
    }
  };

  render = () => {
    const { categories } = this.state;

    return (
      <Menu
        mode="horizontal"
        style={{ justifyContent: "center", marginTop: "64px" }}
      >
        {categories.map((category) => (
          <Menu.Item key={category.code}>
            <Link to={`#`}>
              <span>{category.name}</span>
            </Link>
          </Menu.Item>
        ))}
      </Menu>
    );
  };
}

export default Categories;
