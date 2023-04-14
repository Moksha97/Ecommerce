import React, { useState } from "react";
import { Menu, notification } from "antd";
import { Link } from "react-router-dom";
import ax from "../utils/httpreq";

function Categories() {
  const [api, contextHolder] = notification.useNotification();
  const [categories, setCategories] = useState([]);

  const getCategories = async () => {
    const res = await ax.get("/product/category");
    if (res.status !== 200) {
      const { response } = res;
      api.error({
        message: `Error: ${response.status}`,
        description: response.data.error,
        placement: "topRight",
      });
    }
    setCategories(res.data);
    return res.data;
  };

  getCategories().then();

  return (
    <Menu mode="horizontal" style={{ justifyContent: "center" }}>
      {contextHolder}
      {categories.map((category) => {
        return (
          <Menu.Item key={category.code}>
            <Link to={`#`}>
              <span>{category.code}</span>
            </Link>
          </Menu.Item>
        );
      })}
    </Menu>
  );
}

export default Categories;
