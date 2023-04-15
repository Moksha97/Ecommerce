import React from "react";
import AppHeader from "./AppHeader";
import { Button, Card, Col, Layout, Rate, Row } from "antd";
import AppFooter from "./AppFooter";
import { Link } from "react-router-dom";
import Categories from "../components/Categories";
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
        rating: "4.5",
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
        pid: 11,
        pname: "Cotton Dress",
        pcategory: "FASHION",
        rating: "5",
        options: [
          {
            sid: 36,
            sname: "Lucy Wang",
            price: "119.99",
            discount: "0",
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
  let parsedProducts = productResponse.products.map((product) => {
    let options = product.options.map((option) => {
      let price = Math.round(parseFloat(option.price) * 100) / 100;
      let discount = Math.round(parseFloat(option.discount) * 100) / 100;
      let finalPrice = Math.round(price * (1 - discount) * 100) / 100;
      return {
        ...option,
        price: price,
        discount: discount,
        finalPrice: finalPrice,
      };
    });
    let option = options[0];
    return {
      ...product,
      rating: product.rating ? parseFloat(product.rating) : 0,
      option: {
        ...option,
      },
    };
  });
  // console.log(parsedProducts);
  // ax.get("/").then((res) => {
  //   console.log(res.data);
  // });
  return (
    <>
      <Layout
        className="layout-default layout-signin"
        style={{ height: "100%" }}
      >
        <AppHeader />
        <Categories />
        <Content style={{ paddingBottom: "100px" }}>
          <Row
            gutter={[24, 0]}
            justify="left"
            style={{ marginLeft: "50px", marginRight: "50px" }}
          >
            {parsedProducts.map((product, index) => (
              <Col
                key={index}
                xs={{ span: 24, offset: 0 }}
                md={{ span: 12, offset: 0 }}
                lg={{ span: 6, offset: 0 }}
              >
                <Card
                  bordered={true}
                  cover={
                    <img
                      alt="product img"
                      src={`/img/image-${index + 1}.jpg`}
                    />
                  }
                  style={{ marginBottom: "12px" }}
                >
                  <div className="card-tag" style={{ fontSize: 21 }}>
                    <Link to={`product/${product.pid}`}>{product.pname}</Link>
                  </div>
                  <h3 style={{ margin: 0 }}>
                    US $ {product.option.finalPrice}
                  </h3>
                  {product.option.discount > 0 ? (
                    <>
                      <p>
                        <strike>List: {product.option.price}</strike>
                        <b style={{ paddingLeft: "10px", color: "orangered" }}>
                          {product.option.discount * 100}% OFF
                        </b>
                      </p>
                    </>
                  ) : (
                    <p>List: {product.option.price}</p>
                  )}

                  <Rate
                    allowHalf
                    disabled
                    value={product.rating}
                    style={{ marginBottom: "6px" }}
                  />
                  <Row gutter={[6, 0]} className="card-footer">
                    <Col span={8}>
                      <Button type="primary">BUY NOW</Button>
                    </Col>
                    <Col span={8}>
                      <Button type="button">ADD TO CART</Button>
                    </Col>
                  </Row>
                </Card>
              </Col>
            ))}
          </Row>
        </Content>
        <AppFooter />
      </Layout>
    </>
  );
}

export default UserLanding;
