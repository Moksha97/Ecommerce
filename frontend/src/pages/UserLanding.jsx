import React, { useState } from "react";
import AppHeader from "./AppHeader";
import { Button, Card, Col, Layout, Menu, Rate, Row } from "antd";
import AppFooter from "./AppFooter";
import { Link } from "react-router-dom";
// import ax from "../utils/httpreq";

const { Content } = Layout;

function UserLanding() {
  let productResponse = {
    total: 2,
    products: [
      {
        pid: 1,
        pname: "T-shirt",
        pcategory: "FASHION",
        rating: "4.2",
        options: [
          {
            sid: 26,
            sname: "John Doe",
            price: "99.99",
            discount: "0.05",
            quantity: 10,
          },
        ],
      },
      {
        pid: 11,
        pname: "Cotton Dress",
        pcategory: "FASHION",
        rating: null,
        options: [
          {
            sid: 36,
            sname: "Lucy Wang",
            price: "119.99",
            discount: "0.05",
            quantity: 7,
          },
        ],
      },
      {
        pid: 1,
        pname: "T-shirt",
        pcategory: "FASHION",
        rating: "4.2",
        options: [
          {
            sid: 26,
            sname: "John Doe",
            price: "99.99",
            discount: "0.05",
            quantity: 10,
          },
        ],
      },
      {
        pid: 11,
        pname: "Cotton Dress",
        pcategory: "FASHION",
        rating: null,
        options: [
          {
            sid: 36,
            sname: "Lucy Wang",
            price: "119.99",
            discount: "0.05",
            quantity: 7,
          },
        ],
      },
      {
        pid: 1,
        pname: "T-shirt",
        pcategory: "FASHION",
        rating: "4.2",
        options: [
          {
            sid: 26,
            sname: "John Doe",
            price: "99.99",
            discount: "0.05",
            quantity: 10,
          },
        ],
      },
      {
        pid: 11,
        pname: "Cotton Dress",
        pcategory: "FASHION",
        rating: null,
        options: [
          {
            sid: 36,
            sname: "Lucy Wang",
            price: "119.99",
            discount: "0.05",
            quantity: 7,
          },
        ],
      },
      {
        pid: 1,
        pname: "T-shirt",
        pcategory: "FASHION",
        rating: "4.2",
        options: [
          {
            sid: 26,
            sname: "John Doe",
            price: "99.99",
            discount: "0.05",
            quantity: 10,
          },
        ],
      },
      {
        pid: 11,
        pname: "Cotton Dress",
        pcategory: "FASHION",
        rating: null,
        options: [
          {
            sid: 36,
            sname: "Lucy Wang",
            price: "119.99",
            discount: "0.05",
            quantity: 7,
          },
        ],
      },
      {
        pid: 1,
        pname: "T-shirt",
        pcategory: "FASHION",
        rating: "4.2",
        options: [
          {
            sid: 26,
            sname: "John Doe",
            price: "99.99",
            discount: "0.05",
            quantity: 10,
          },
        ],
      },
      {
        pid: 11,
        pname: "Cotton Dress",
        pcategory: "FASHION",
        rating: null,
        options: [
          {
            sid: 36,
            sname: "Lucy Wang",
            price: "119.99",
            discount: "0.05",
            quantity: 7,
          },
        ],
      },
      {
        pid: 1,
        pname: "T-shirt",
        pcategory: "FASHION",
        rating: "4.2",
        options: [
          {
            sid: 26,
            sname: "John Doe",
            price: "99.99",
            discount: "0.05",
            quantity: 10,
          },
        ],
      },
      {
        pid: 11,
        pname: "Cotton Dress",
        pcategory: "FASHION",
        rating: null,
        options: [
          {
            sid: 36,
            sname: "Lucy Wang",
            price: "119.99",
            discount: "0.05",
            quantity: 7,
          },
        ],
      },
      {
        pid: 1,
        pname: "T-shirt",
        pcategory: "FASHION",
        rating: "4.2",
        options: [
          {
            sid: 26,
            sname: "John Doe",
            price: "99.99",
            discount: "0.05",
            quantity: 10,
          },
        ],
      },
      {
        pid: 11,
        pname: "Cotton Dress",
        pcategory: "FASHION",
        rating: null,
        options: [
          {
            sid: 36,
            sname: "Lucy Wang",
            price: "119.99",
            discount: "0.05",
            quantity: 7,
          },
        ],
      },
      {
        pid: 1,
        pname: "T-shirt",
        pcategory: "FASHION",
        rating: "4.2",
        options: [
          {
            sid: 26,
            sname: "John Doe",
            price: "99.99",
            discount: "0.05",
            quantity: 10,
          },
        ],
      },
      {
        pid: 11,
        pname: "Cotton Dress",
        pcategory: "FASHION",
        rating: null,
        options: [
          {
            sid: 36,
            sname: "Lucy Wang",
            price: "119.99",
            discount: "0.05",
            quantity: 7,
          },
        ],
      },
      {
        pid: 1,
        pname: "T-shirt",
        pcategory: "FASHION",
        rating: "4.2",
        options: [
          {
            sid: 26,
            sname: "John Doe",
            price: "99.99",
            discount: "0.05",
            quantity: 10,
          },
        ],
      },
      {
        pid: 11,
        pname: "Cotton Dress",
        pcategory: "FASHION",
        rating: null,
        options: [
          {
            sid: 36,
            sname: "Lucy Wang",
            price: "119.99",
            discount: "0.05",
            quantity: 7,
          },
        ],
      },
      {
        pid: 1,
        pname: "T-shirt",
        pcategory: "FASHION",
        rating: "4.2",
        options: [
          {
            sid: 26,
            sname: "John Doe",
            price: "99.99",
            discount: "0.05",
            quantity: 10,
          },
        ],
      },
      {
        pid: 11,
        pname: "Cotton Dress",
        pcategory: "FASHION",
        rating: null,
        options: [
          {
            sid: 36,
            sname: "Lucy Wang",
            price: "119.99",
            discount: "0.05",
            quantity: 7,
          },
        ],
      },
      {
        pid: 1,
        pname: "T-shirt",
        pcategory: "FASHION",
        rating: "4.2",
        options: [
          {
            sid: 26,
            sname: "John Doe",
            price: "99.99",
            discount: "0.05",
            quantity: 10,
          },
        ],
      },
      {
        pid: 11,
        pname: "Cotton Dress",
        pcategory: "FASHION",
        rating: null,
        options: [
          {
            sid: 36,
            sname: "Lucy Wang",
            price: "119.99",
            discount: "0.05",
            quantity: 7,
          },
        ],
      },
    ],
  };
  const [categories] = useState(["CAT1", "CAT2", "CAT3", "CAT4"]);
  let parsedProducts = productResponse.products.map((product) => {
    let option = product.options[0];
    option = {
      ...option,
      price: parseFloat(option.price),
      discount: parseFloat(option.discount),
    };
    return {
      ...product,
      rating: product.rating ? parseInt(product.rating) : 0,
      option: {
        ...option,
      },
    };
  });
  console.log(parsedProducts);
  // ax.get("/categories").then((res) => {
  //   console.log(res.data);
  // });
  return (
    <>
      <Layout
        className="layout-default layout-signin"
        style={{ height: "100%" }}
      >
        <AppHeader />
        <Menu mode="horizontal" style={{ justifyContent: "center" }}>
          {categories.map((category) => {
            return (
              <Menu.Item key={category}>
                <Link to={`#`}>
                  <span>{category}</span>
                </Link>
              </Menu.Item>
            );
          })}
        </Menu>
        <Content>
          <Row gutter={[24, 0]} justify="left" style={{ margin: "12px" }}>
            {parsedProducts.map((product, index) => {
              return (
                <Col
                  key={index}
                  xs={{ span: 24, offset: 0 }}
                  md={{ span: 12 }}
                  lg={{ span: 6, offset: 0 }}
                >
                  <Card
                    bordered={true}
                    cover={
                      <img
                        alt="product img"
                        src={`./img/image-${index + 1}.jpg`}
                      />
                    }
                    style={{ marginBottom: "12px" }}
                  >
                    <div className="card-tag" style={{ fontSize: 21 }}>
                      <Link to={`product/${product.pid}`}>{product.pname}</Link>
                    </div>
                    <p style={{ margin: 0 }}>US $ {product.option.price}</p>
                    <Rate
                      value={product.rating}
                      style={{ marginBottom: "6px" }}
                    />
                    <Row gutter={[6, 0]} className="card-footer">
                      <Col span={12}>
                        <Button type="primary">BUY NOW</Button>
                      </Col>
                      <Col span={12}>
                        <Button type="button">ADD TO CART</Button>
                      </Col>
                    </Row>
                  </Card>
                </Col>
              );
            })}
          </Row>
        </Content>
        <AppFooter />
      </Layout>
    </>
  );
}

export default UserLanding;
