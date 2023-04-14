import { useParams } from "react-router-dom";
import { Card, Col, Descriptions, Layout, Rate, Row } from "antd";
import AppHeader from "./AppHeader";
import React from "react";
import AppFooter from "./AppFooter";
import Categories from "../components/Categories";

const { Content } = Layout;

const Product = () => {
  const { id } = useParams();
  console.log(id);
  let product = {
    pid: 1,
    pname: "T-shirt",
    pcategory: "FASHION",
    rating: "4.2",
    pdesc: "100% cotton, available in various colors and sizes",
    options: [
      {
        sid: 26,
        sname: "John Doe",
        price: "99.99",
        discount: "0.05",
        quantity: 10,
      },
      {
        sid: 26,
        sname: "John Doe",
        price: "99.99",
        discount: "0.05",
        quantity: 10,
      },
      {
        sid: 26,
        sname: "John Doe",
        price: "99.99",
        discount: "0.05",
        quantity: 10,
      },
      {
        sid: 26,
        sname: "John Doe",
        price: "99.99",
        discount: "0.05",
        quantity: 10,
      },
    ],
  };

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
  let selectedOption = 0;
  let option = options[selectedOption];
  product = {
    ...product,
    option: option,
    rating: product.rating ? parseFloat(product.rating) : 0,
  };

  console.log(product);
  return (
    <>
      <Layout className="layout-default" style={{ height: "100%" }}>
        <AppHeader />
        <Categories />
        <Content>
          <Row
            gutter={[24, 0]}
            justify="left"
            style={{ marginLeft: "50px", marginRight: "50px" }}
          >
            <Col span={18}>
              <Card bordered={false} className="criclebox h-full">
                <Row gutter>
                  <Col
                    xs={24}
                    md={12}
                    sm={24}
                    lg={12}
                    xl={10}
                    className="col-img"
                  >
                    <div className="ant-cret text-right"></div>
                  </Col>
                  <Col
                    xs={24}
                    md={12}
                    sm={24}
                    lg={12}
                    xl={14}
                    className="mobile-24"
                  >
                    <div className="h-full col-content p-20">
                      <div className="ant-muse">
                        <h5>{product.pname}</h5>
                        <p>{product.pcategory}</p>
                        <p className="lastweek mb-36">{product.pdesc}</p>
                        <Rate></Rate>
                      </div>
                    </div>
                  </Col>
                </Row>
              </Card>
            </Col>
            <Col span={6} className="mb-24">
              <Card
                className="header-solid h-full"
                bordered={false}
                title={[<h6 className="font-semibold m-0">Sellers</h6>]}
                bodyStyle={{ paddingTop: "0" }}
              >
                <Row gutter={[24, 24]}>
                  {options.map((option, index) => (
                    <Col span={24} key={index}>
                      <Card className="card-billing-info" bordered="true">
                        <div className="col-info">
                          <Descriptions title={option.sname}>
                            <Descriptions.Item label="" span={3}>
                              US $ {option.finalPrice}
                            </Descriptions.Item>

                            <Descriptions.Item label="" span={3}>
                              {option.discount > 0 ? (
                                <>
                                  <p style={{ margin: 0 }}>
                                    <strike>List: {option.price}</strike>
                                    <b
                                      style={{
                                        paddingLeft: "10px",
                                        color: "orangered",
                                      }}
                                    >
                                      {option.discount * 100}% OFF
                                    </b>
                                  </p>
                                </>
                              ) : (
                                <p>List: {option.price}</p>
                              )}
                            </Descriptions.Item>
                          </Descriptions>
                        </div>
                      </Card>
                    </Col>
                  ))}
                </Row>
              </Card>
            </Col>
          </Row>
        </Content>
        <AppFooter />
      </Layout>
    </>
  );
};

export default Product;
