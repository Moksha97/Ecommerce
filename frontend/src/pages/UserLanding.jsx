import React, { Component } from "react";
import AppHeader from "../components/AppHeader";
import {
  Button,
  Card,
  Checkbox,
  Col,
  Layout,
  Radio,
  Rate,
  Row,
  Select,
  Slider,
  Space,
} from "antd";
import AppFooter from "../components/AppFooter";
import { Link } from "react-router-dom";
import Categories from "../components/Categories";
import ax from "../utils/httpreq";
import UnsplashImage from "../components/AsyncImage";

const { Content } = Layout;

class UserLanding extends Component {
  constructor(props) {
    super(props);
    this.state = {
      total: 0,
      products: [],
      categories: [],
      search: "",
      showSidebar: false,
      allCategories: [],
      order_by: "price",
      order: "ASC",
      priceRange: null,
      discountRange: null,
      discountRadio: "any",
    };
  }

  fetchProductData = async () => {
    const { notification } = this.props;
    const { categories, search, order_by, order, priceRange, discountRange } =
      this.state;
    let request = {
      search: search ? search : null,
      categories: categories.length > 0 ? categories : null,
      price:
        priceRange && priceRange.length === 2
          ? {
              min: priceRange[0],
              max: priceRange[1],
            }
          : null,
      discount:
        discountRange && discountRange.length === 2
          ? {
              min: discountRange[0],
              max: discountRange[1],
            }
          : null,
      limit: 999999,
      offset: 0,
      order_by: order_by ? order_by : "price",
      order: order ? order : "ASC",
      include_out_of_stock: true,
    };
    let res = await ax.post("/product", request);
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
      this.setState({
        total: data.total,
        products: data.products ? data.products : [],
      });
    }

    res = await ax.get("/product/category");
    if (res.status !== 200) {
      const { response } = res;
      notification.error({
        message: `Error: ${response.status}`,
        description: response.data.error,
        placement: "topRight",
      });
    } else {
      this.setState({ allCategories: res.data });
    }
  };

  componentDidMount = async () => {
    await this.fetchProductData();
  };

  categorySelected = async (data) => {
    await this.setState({ categories: [data.key], showSidebar: true });
    await this.fetchProductData();
  };

  onSearch = async (value) => {
    await this.setState({ search: value.search, showSidebar: true });
    await this.fetchProductData();
  };

  changeCategories = async (value) => {
    await this.setState({ categories: value });
    await this.fetchProductData();
  };

  sortChange = async (value) => {
    let order_by = "price";
    let order = "ASC";
    if (value === "price_low_to_high") {
      order_by = "price";
      order = "ASC";
    } else if (value === "price_high_to_low") {
      order_by = "price";
      order = "DESC";
    } else if (value === "discount_low_to_high") {
      order_by = "discount";
      order = "ASC";
    } else if (value === "discount_high_to_low") {
      order_by = "discount";
      order = "DESC";
    }
    await this.setState({ order_by: order_by, order: order });
    await this.fetchProductData();
  };

  priceRangeChange = async (value) => {
    await this.setState({ priceRange: value });
    await this.fetchProductData();
  };

  discountChange = async (e) => {
    const value = e.target.value;
    if (value === "any") {
      await this.setState({ discountRange: null, discountRadio: value });
    } else if (value === "10") {
      await this.setState({ discountRange: [0.1, 1], discountRadio: value });
    } else if (value === "25") {
      await this.setState({ discountRange: [0.25, 1], discountRadio: value });
    } else if (value === "50") {
      await this.setState({ discountRange: [0.5, 1], discountRadio: value });
    } else if (value === "75") {
      await this.setState({ discountRange: [0.75, 1], discountRadio: value });
    }
    await this.fetchProductData();
  };

  render = () => {
    const { notification } = this.props;
    const { products, showSidebar, allCategories, categories, discountRadio } =
      this.state;

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
      <Layout
        className="layout-default layout-signin"
        style={{ height: "100%" }}
      >
        <AppHeader onSearch={this.onSearch} />
        <Categories
          notification={notification}
          selected={this.categorySelected}
        />
        <Content
          style={{
            paddingBottom: "100px",
            paddingTop: 0,
            paddingLeft: showSidebar ? "5%" : "10%",
            paddingRight: showSidebar ? "5%" : "10%",
          }}
        >
          <Col
            span={24}
            style={{
              justifyContent: "right",
              display: "flex",
              alignItems: "center",
              marginRight: "60px",
              paddingTop: "20px",
              paddingBottom: "20px",
            }}
          >
            Sort by &nbsp;
            <Select
              defaultValue="price_low_to_high"
              style={{ width: 240 }}
              onChange={this.sortChange}
              options={[
                { value: "price_low_to_high", label: "Price (Low to High)" },
                { value: "price_high_to_low", label: "Price (High to Low)" },
                {
                  value: "discount_high_to_low",
                  label: "Discount (High to Low)",
                },
              ]}
            />
          </Col>
          <Row>
            <Col span={showSidebar ? 4 : 0} style={{ paddingLeft: "50px" }}>
              <h2 style={{ marginTop: 0 }}>Category</h2>
              <Checkbox.Group
                value={categories}
                onChange={this.changeCategories}
              >
                <Row>
                  {allCategories.map((category) => (
                    <Col key={category.code} span={24}>
                      <Checkbox value={category.code}>{category.name}</Checkbox>
                    </Col>
                  ))}
                </Row>
              </Checkbox.Group>
              <h2>Price</h2>
              <Slider
                range
                min={0}
                max={1000}
                defaultValue={[0, 1000]}
                tooltip={{ open: true }}
                step={10}
                onAfterChange={this.priceRangeChange}
                style={{ marginTop: "50px", marginBottom: "50px" }}
              />
              <h2>Discount</h2>
              <Radio.Group onChange={this.discountChange} value={discountRadio}>
                <Space direction="vertical">
                  <Radio value={"any"}>Any</Radio>
                  <Radio value={"10"}>10% off or more</Radio>
                  <Radio value={"25"}>25% off or more</Radio>
                  <Radio value={"50"}>50% off or more</Radio>
                  <Radio value={"75"}>75% off or more</Radio>
                </Space>
              </Radio.Group>
            </Col>
            <Col span={showSidebar ? 20 : 24}>
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
                      cover={<UnsplashImage keyword={product.pname} />}
                      style={{ marginBottom: "12px" }}
                    >
                      <div className="card-tag" style={{ fontSize: 21 }}>
                        <Link to={`product/${product.pid}`}>
                          {product.pname}
                        </Link>
                      </div>
                      <h3 style={{ margin: 0 }}>
                        US $ {product.option.finalPrice}
                      </h3>
                      {product.option.discount > 0 ? (
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
            </Col>
          </Row>
        </Content>
        <AppFooter />
      </Layout>
    );
  };
}

export default UserLanding;
