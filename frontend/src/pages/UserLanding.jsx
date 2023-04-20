import React, { Component } from "react";
import AppHeader from "../components/AppHeader";
import { Button, Card, Col, Layout, Rate, Row } from "antd";
import AppFooter from "../components/AppFooter";
import { Link } from "react-router-dom";
import Categories from "../components/Categories";
import ax from "../utils/httpreq";

const { Content } = Layout;

class UserLanding extends Component {
  constructor(props) {
    super(props);
    this.state = {
      total: 0,
      products: [],
      categories: [],
      search: "",
    };
  }

  fetchProductData = async () => {
    const { notification } = this.props;
    const { categories, search } = this.state;
    let request = {
      search: search ? search : null,
      categories: categories.length > 0 ? categories : null,
      price: null,
      discount: null,
      limit: 999999,
      offset: 0,
      order_by: "price",
      order: "ASC",
      include_out_of_stock: true,
    };
    const res = await ax.post("/product", request);
    if (res.status !== 200) {
      const { response } = res;
      notification.error({
        message: `Error: ${response.status}`,
        description: response.data.error,
        placement: "topRight",
      });
      this.setState({
        total: 0,
        products: [],
      });
    } else {
      const { data } = res;
      console.log(data);
      this.setState({
        total: data.total,
        products: data.products,
      });
    }
  };

  componentDidMount = async () => {
    await this.fetchProductData();
  };

  categorySelected = async (data) => {
    await this.setState({ categories: [data.key] });
    await this.fetchProductData();
  };

  onSearch = async (value) => {
    await this.setState({ search: value.search });
    await this.fetchProductData();
  };

  render = () => {
    const { notification } = this.props;
    const { products } = this.state;
    let parsedProducts = products.map((product) => {
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

    return (
      <>
        <Layout
          className="layout-default layout-signin"
          style={{ height: "100%" }}
        >
          <AppHeader onSearch={this.onSearch} />
          <Categories
            notification={notification}
            selected={this.categorySelected}
          />
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
                          <b
                            style={{ paddingLeft: "10px", color: "orangered" }}
                          >
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
  };
}

export default UserLanding;
