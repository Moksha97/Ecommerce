import { useParams } from "react-router-dom";
import {
  Button,
  Card,
  Col,
  Descriptions,
  Form,
  Input,
  Layout,
  Rate,
  Row,
  Select,
  Space,
} from "antd";
import AppHeader from "../components/AppHeader";
import React, { useState } from "react";
import AppFooter from "../components/AppFooter";
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
        sname: "John Doe 1",
        price: "99.99",
        discount: "0.05",
        quantity: 10,
      },
      {
        sid: 27,
        sname: "John Doe 2",
        price: "999.99",
        discount: "0.5",
        quantity: 10,
      },
      {
        sid: 28,
        sname: "John Doe 3",
        price: "999.99",
        discount: "0.05",
        quantity: 10,
      },
      {
        sid: 29,
        sname: "John Doe 4",
        price: "9999.99",
        discount: "0.95",
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
  let [option, setOption] = useState(options[selectedOption]);
  product = {
    ...product,
    option: option,
    rating: product.rating ? parseFloat(product.rating) : 0,
  };

  // console.log(product);

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  const onFinish = async (values) => {
    console.log("Success:", values);
  };

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
            <Col span={18}>
              <Card
                bordered={false}
                className="criclebox h-full"
                style={{ height: "700px" }}
              >
                <Row gutter>
                  <Col
                    xs={24}
                    md={12}
                    sm={24}
                    lg={12}
                    xl={10}
                    className="col-img"
                    style={{ backgroundImage: `url(${product.option.image})` }}
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
                        <Rate
                          allowHalf
                          value={product.rating}
                          style={{ marginBottom: "6px" }}
                        />

                        <Form
                          layout="vertical"
                          className="row-col"
                          onFinish={onFinish}
                          onFinishFailed={onFinishFailed}
                        >
                          <Form.Item
                            className=""
                            label=""
                            name="quantity"
                            rules={[
                              {
                                required: true,
                                message:
                                  "Please input the quantity less than " +
                                  option.quantity,
                              },
                            ]}
                          >
                            <Space direction="vertical" size="middle">
                              <Input
                                placeholder="Quantity"
                                type={"number"}
                                addonAfter={`${option.quantity} available`}
                                max={option.quantity}
                                min={1}
                              />
                            </Space>
                          </Form.Item>
                          <Form.Item
                            className=""
                            label=""
                            name="seller"
                            rules={[
                              {
                                required: true,
                                message: "Please select a seller",
                              },
                            ]}
                          >
                            <Select
                              showSearch
                              onChange={(value) => {
                                console.log(value);
                                setOption(
                                  options.find((option) => option.sid === value)
                                );
                              }}
                              placeholder="Seller"
                              optionFilterProp="children"
                              options={product.options.map((option) => {
                                return {
                                  label: option.sname,
                                  value: option.sid,
                                };
                              })}
                            />

                            <h3>US $ {product.option.finalPrice}</h3>
                            {product.option.discount > 0 ? (
                              <>
                                <p>
                                  <strike>List: {product.option.price}</strike>
                                  <b
                                    style={{
                                      paddingLeft: "10px",
                                      color: "orangered",
                                    }}
                                  >
                                    {product.option.discount * 100}% OFF
                                  </b>
                                </p>
                              </>
                            ) : (
                              <p>List: {product.option.price}</p>
                            )}
                          </Form.Item>
                          <Form.Item>
                            <Button
                              type="primary"
                              htmlType="submit"
                              style={{ width: "100%" }}
                            >
                              <span style={{ color: "white" }}>BUY NOW</span>
                            </Button>
                          </Form.Item>
                          <Form.Item>
                            <Button
                              type="button"
                              htmlType="submit"
                              style={{ width: "100%" }}
                            >
                              ADD TO CART
                            </Button>
                          </Form.Item>
                        </Form>
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
                style={{ height: "700px", overflowY: "scroll" }}
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
