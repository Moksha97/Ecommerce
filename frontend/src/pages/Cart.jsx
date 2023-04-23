import React, { Component } from "react";
import { Button, Card, Layout, Space } from "antd";
import { Col, Row, Divider } from "antd";
import AppHeader from "../components/AppHeader";
import Categories from "../components/Categories";
import { Content } from "antd/es/layout/layout";
import AppFooter from "../components/AppFooter";
import ax from "../utils/httpreq";
import UnsplashImage from "../components/AsyncImage";

class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cart: [],
      user: {},
      account: null,
      address: null,
    };
  }

  getCartDetails = async () => {
    const { notification } = this.props;
    let res = await ax.get("/users/getUser");
    if (res.status !== 200) {
      const { response } = res;
      notification.error({
        message: `Error: ${response.status}`,
        description: response.data.error,
        placement: "topRight",
      });
    } else {
      const { data } = res;
      if (data.length !== 0) {
        let user = data[0];
        this.setState({ user: user });
      }
    }

    res = await ax.get("/cart/getCart");
    if (res.status !== 200) {
      const { response } = res;
      notification.error({
        message: `Error: ${response.status}`,
        description: response.data.error,
        placement: "topRight",
      });
    } else {
      let cart = res.data;
      cart = await Promise.all(
        cart.map(async (item) => {
          const productRes = await ax.get(`/product/${item.pid}`);
          if (productRes.status === 200) {
            const { data } = productRes;
            const seller = data.options.find((o) => o.sid === item.sid);
            let price = Math.round(parseFloat(seller.price) * 100) / 100;
            let discount = Math.round(parseFloat(seller.discount) * 100) / 100;
            seller.finalPrice = Math.round(price * (1 - discount) * 100) / 100;
            item.seller = seller;
            item.product = data;
          } else {
            item.product = null;
            item.seller = null;
          }
          return item;
        })
      );
      this.setState({ cart: cart });
    }

    const { user } = this.state;
    if (user.preferredaccount) {
      res = await ax.get(`/accounts/${user.preferredaccount}`);
      if (res.status !== 200) {
        const { response } = res;
        notification.error({
          message: `Error: ${response.status}`,
          description: response.data.error,
          placement: "topRight",
        });
      } else {
        const { data } = res;
        this.setState({ account: data });
      }
    }

    if (user.preferredaddress) {
      res = await ax.get(`/address/${user.preferredaddress}`);
      if (res.status !== 200) {
        const { response } = res;
        notification.error({
          message: `Error: ${response.status}`,
          description: response.data.error,
          placement: "topRight",
        });
      } else {
        const { data } = res;
        this.setState({ address: data });
      }
    }
  };

  componentDidMount = async () => {
    await this.getCartDetails();
  };

  buy = async () => {
    const { cart, account, address } = this.state;
    const { notification } = this.props;
    if (!cart || cart.length === 0) {
      notification.error({
        message: `Error: No items in cart`,
        description: "Please add items to cart",
        placement: "topRight",
      });
      return;
    }
    if (!account) {
      notification.error({
        message: `Error: No account`,
        description: "Please add an account to buy",
        placement: "topRight",
      });
      return;
    }
    if (!address) {
      notification.error({
        message: `Error: No address`,
        description: "Please add an address to buy",
        placement: "topRight",
      });
      return;
    }

    let res = await ax.post("/order/placeorder", {
      aid: address.aid,
      accountid: account.accountid,
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
        message: `Success: Order placed`,
        description: "Order placed successfully",
        placement: "topRight",
      });
      document.location.href = "/orders";
    }
  };

  removeFromCart = async (pid, sid) => {
    const { notification } = this.props;
    let res = await ax.post(`/cart/modifycart`, {
      pid: pid,
      sid: sid,
      quantity: 0,
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
        message: `Success: Removed from cart`,
        description: "Item removed from cart successfully",
        placement: "topRight",
      });
      await this.getCartDetails();
    }
  };

  render() {
    const { cart, account, address } = this.state;
    console.log(cart);
    return (
      <div>
        <Layout
          className="layout-default layout-signin"
          style={{ height: "100%" }}
        >
          <AppHeader />
          <Categories />
          <Content
            style={{
              paddingBottom: "100px",
              paddingLeft: "10%",
              paddingRight: "10%",
            }}
          >
            <Row
              gutter={[24, 0]}
              justify="left"
              style={{ marginLeft: "50px", marginRight: "50px" }}
            >
              <Col
                span={24}
                style={{
                  fontSize: "28px",
                  marginTop: "12px",
                  marginBottom: "2px",
                }}
              >
                Shopping Cart
              </Col>
              <Col span={18}>
                <Row
                  gutter={[24, 0]}
                  justify="left"
                  style={{ marginRight: "50px" }}
                >
                  {cart.map((item) => (
                    <>
                      <Col span={8}>
                        <Card
                          size={"small"}
                          bordered={true}
                          cover={<UnsplashImage keyword={item.product.pname} />}
                        >
                          {item.product
                            ? item.product.pcategory +
                              " | " +
                              item.product.pdesc
                            : ""}
                        </Card>
                      </Col>
                      <Col span={16}>
                        <Row style={{ paddingTop: "10px" }}>
                          <Col span={20}>
                            <h3>{item.pname}</h3>
                          </Col>
                          <Col
                            span={4}
                            style={{ justifyContent: "right", display: "flex" }}
                          >
                            <h3>
                              US ${" "}
                              {Math.round(
                                (parseFloat(item.totalprice) + Number.EPSILON) *
                                  100
                              ) / 100}
                            </h3>
                          </Col>
                          <Col span={24}>
                            {item.seller ? `Sold by ${item.seller.sname}` : ""}
                            <p style={{ margin: 0 }}>
                              US $ {item.seller.finalPrice}
                            </p>
                            {item.seller.discount > 0 ? (
                              <p style={{ margin: 0 }}>
                                <strike>List: {item.seller.price}</strike>
                                <b
                                  style={{
                                    paddingLeft: "10px",
                                    color: "orangered",
                                  }}
                                >
                                  {item.seller.discount * 100}% OFF
                                </b>
                              </p>
                            ) : (
                              <p style={{ margin: 0 }}>
                                List: {item.seller.price}
                              </p>
                            )}
                          </Col>
                          <Col span={16}>
                            <h4>Quantity: {item.quantity}</h4>
                          </Col>
                          <Col
                            span={8}
                            style={{ justifyContent: "right", display: "flex" }}
                          >
                            <Space direction={"vertical"} align={"end"}>
                              <Button
                                type="primary"
                                onClick={() => {
                                  window.location.href =
                                    "/product/" + item.product.pid;
                                }}
                              >
                                Edit
                              </Button>
                              <Button
                                type="primary"
                                danger
                                onClick={() => {
                                  this.removeFromCart(
                                    item.product.pid,
                                    item.seller.sid
                                  );
                                }}
                              >
                                Remove
                              </Button>
                            </Space>
                          </Col>
                        </Row>
                      </Col>
                      <Divider />
                    </>
                  ))}
                </Row>
              </Col>
              <Col span={6}>
                <div
                  className="rectangle-box"
                  style={{
                    border: "1px #c7bca1",
                    height: "350PX",
                    width: "300PX",
                  }}
                >
                  <h2 style={{ alignContent: "Center" }}>Cart Summary</h2>
                  <Divider style={{ marginTop: "0px" }} />
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    <div>Subtotal</div>
                    <div>US $Price</div>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    <div>Shipping</div>
                    <div style={{ color: "green" }}>FREE</div>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    <div>Discount</div>
                    <div>US $Discount</div>
                  </div>
                  {/*<div*/}
                  {/*  style={{*/}
                  {/*    display: "flex",*/}
                  {/*    justifyContent: "space-between",*/}
                  {/*  }}*/}
                  {/*>*/}
                  {/*  <div>Estimated Tax</div>*/}
                  {/*  <div>US $Tax</div>*/}
                  {/*</div>*/}
                  <Divider />
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    <div>
                      <b>Total</b>
                    </div>
                    <div>US $Total</div>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      gap: "8px",
                      Padding: "10px",
                    }}
                  >
                    <Button
                      style={{
                        width: "100%",
                        height: "40px",
                        fontSize: "16px",
                        marginTop: "20px",
                      }}
                      type="primary"
                      onClick={this.buy}
                    >
                      BUY
                    </Button>
                  </div>
                </div>
              </Col>
              <Divider />

              <Col
                span={24}
                style={{
                  fontSize: "28px",
                  marginTop: "12px",
                  marginBottom: "2px",
                }}
              >
                Shipping Address
              </Col>
              <Col span={8}>
                <p
                  style={{
                    fontSize: "20px",
                    margin: 0,
                  }}
                >
                  Shipping from preferred address
                </p>
              </Col>
              <Col span={8}>
                {address ? (
                  <>
                    <code>{address.line1}</code>
                    <br />
                    <code>{address.line2}</code>
                    <br />
                    <code>
                      {address.city + " " + address.state + ", " + address.zip}
                    </code>
                  </>
                ) : (
                  "No preferred address is set"
                )}
              </Col>
              <Col span={8} style={{ alignSelf: "center" }}>
                <div>
                  <Button
                    type="primary"
                    onClick={() => {
                      window.location.href = "/profile";
                    }}
                  >
                    {address ? "Change address" : "Set address"}
                  </Button>
                </div>
              </Col>
              <Divider />

              <Col
                span={24}
                style={{
                  fontSize: "28px",
                  marginTop: "12px",
                  marginBottom: "2px",
                }}
              >
                Payment Methods
              </Col>
              <Col span={8}>
                <p
                  style={{
                    fontSize: "20px",
                    margin: 0,
                  }}
                >
                  Selecting preferred account
                </p>
              </Col>
              <Col span={8} style={{ paddingBottom: "20px" }}>
                {account ? (
                  <Card
                    bordered={false}
                    className="card-credit header-solid h-ful"
                  >
                    <code>Account number </code>
                    <h5 className="card-number" style={{ margin: 0 }}>
                      {account.accountnumber}
                    </h5>
                    <code>Routing number</code>
                    <h6 style={{ margin: 0 }}>{account.routingnumber}</h6>
                    <div className="card-footer">
                      <div className="mr-30">
                        <p>{account.bank}</p>
                      </div>
                      <div className="mr-30">
                        <p>Branch: {account.branchcode}</p>
                      </div>
                    </div>
                  </Card>
                ) : (
                  "No preferred payment method is set"
                )}
              </Col>
              <Col span={8} style={{ alignSelf: "center" }}>
                <div>
                  <Button
                    type="primary"
                    onClick={() => {
                      window.location.href = "/profile";
                    }}
                  >
                    {account ? "Change account" : "Set account"}
                  </Button>
                </div>
              </Col>
            </Row>
          </Content>
          <AppFooter />
        </Layout>
      </div>
    );
  }
}

export default Cart;
