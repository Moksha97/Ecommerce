import React, { Component } from "react";
import AppFooter from "../components/AppFooter";
import Categories from "../components/Categories";
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
import withRouter from "../components/withRouter";
import ax from "../utils/httpreq";
import UnsplashImage from "../components/AsyncImage";

const { Content } = Layout;

class Product extends Component {
  constructor(props) {
    super(props);
    this.state = {
      product: {},
      options: [],
      option: {},
    };
  }

  getProduct = async () => {
    const { notification } = this.props;
    const { id } = this.props.params;

    let res = await ax.get("/product/" + id);
    if (res.status !== 200) {
      const { response } = res;
      notification.error({
        message: `Error: ${response.status}`,
        description: response.data.error,
        placement: "topRight",
      });
      this.setState({
        product: {},
        options: [],
        option: {},
      });
    } else {
      let product = res.data;
      product = {
        ...product,
        rating: product.rating ? parseFloat(product.rating) : 0,
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

      let option = {};
      if (options && options.length > 0) {
        option = options[0];
      }

      this.setState({ product: product, options: options, option: option });
    }
  };

  componentDidMount = async () => {
    await this.getProduct();
  };

  onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  onFinish = async (values) => {
    console.log("Success:", values);
    const { notification } = this.props;
    const { quantity, sid } = values;
    const { id } = this.props.params;
    const res = await ax.post("/cart/addtocart", {
      quantity: quantity,
      sid: sid,
      pid: id,
    });
    if (res.status !== 200) {
      const { response } = res;
      notification.error({
        message: `Error: ${response.status}`,
        description: response.data.error,
        placement: "topRight",
      });
    } else {
      notification.success({
        message: `Success`,
        description: "Item added to cart",
        placement: "topRight",
      });
      await this.getProduct();
    }
  };

  sellerChanged = (value) => {
    const { options } = this.state;
    this.setState({ option: options.find((o) => o.sid === value) });
  };

  render() {
    const { product, options, option } = this.state;

    return (
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
                    style={{
                      marginTop: "30px",
                    }}
                  >
                    {product.pname ? (
                      <UnsplashImage keyword={product.pname} height={300} />
                    ) : (
                      ""
                    )}
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
                          disabled
                          value={product.rating}
                          style={{ marginBottom: "12px" }}
                        />

                        <Form
                          layout="vertical"
                          className="row-col"
                          onFinish={this.onFinish}
                          onFinishFailed={this.onFinishFailed}
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
                            name="sid"
                            rules={[
                              {
                                required: true,
                                message: "Please select a seller",
                              },
                            ]}
                          >
                            <Select
                              showSearch
                              onChange={this.sellerChanged}
                              placeholder="Seller"
                              optionFilterProp="children"
                              defaultValue={option.sid}
                              options={options.map((option) => {
                                return {
                                  label: option.sname,
                                  value: option.sid,
                                };
                              })}
                            />
                          </Form.Item>
                          <Form.Item>
                            <h3>US $ {option.finalPrice}</h3>
                            {option.discount > 0 ? (
                              <p>
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
                            ) : (
                              <p>List: {option.price}</p>
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
                      <Card
                        className="card-billing-info"
                        bordered="true"
                        key={index}
                      >
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
    );
  }
}

export default withRouter(Product);
