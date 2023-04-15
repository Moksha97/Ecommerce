import React, { useRef } from "react";
import { Menu } from "antd";
import { Link } from "react-router-dom";

// import ax from "../utils/httpreq";

function Categories() {
  // const [api, contextHolder] = notification.useNotification();
  const categories = useRef([
    {
      code: "ELECTRONICS",
      name: "Electronics",
    },
    {
      code: "HEALTH",
      name: "Health & Beauty",
    },
    {
      code: "FASHION",
      name: "Fashion",
    },
    {
      code: "TOYS",
      name: "Toys & Hobbies",
    },
    {
      code: "HOME",
      name: "Home & Garden",
    },
  ]);

  // const getCategories = async () => {
  //   const res = await ax.get("/product/category");
  //   if (res.status !== 200) {
  //     const { response } = res;
  //     api.error({
  //       message: `Error: ${response.status}`,
  //       description: response.data.error,
  //       placement: "topRight",
  //     });
  //   }
  //   categories.current = res.data;
  //   return res.data;
  // };
  //
  // getCategories().then();

  return (
    <Menu
      mode="horizontal"
      style={{ justifyContent: "center", marginTop: "64px" }}
    >
      {/*{contextHolder}*/}
      {categories.current.map((category) => (
        <Menu.Item key={category.code}>
          <Link to={`#`}>
            <span>{category.code}</span>
          </Link>
        </Menu.Item>
      ))}
    </Menu>
  );
}

export default Categories;
