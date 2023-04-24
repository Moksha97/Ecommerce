import React, { Component } from "react";
import { Button, Col, Form, Input, InputNumber, Row, Select } from "antd";
import ax from "../../utils/httpreq";

class Inventory extends Component {
  formRef = React.createRef();

  constructor(props) {
    super(props);
    this.state = {
      sellers: [],
      products: [],
      inventory: [],
    };
  }

  componentDidUpdate = async (prevProps) => {
    if (prevProps.mode !== this.props.mode) {
      await this.updateData();
    }
  };

  componentDidMount = async () => {
    await this.updateData();
  };

  updateData = async () => {
    const { mode } = this.props;
    const { notification } = this.props;

    let res = await ax.get("/admin/seller");
    if (res.status !== 200) {
      notification.error({
        message: `Error: ${res.status}`,
        description: res.data.error,
        placement: "topRight",
      });
    } else {
      this.setState({ sellers: res.data });
    }

    res = await ax.get("/admin/product/list");
    if (res.status !== 200) {
      notification.error({
        message: `Error: ${res.status}`,
        description: res.data.error,
        placement: "topRight",
      });
    } else {
      this.setState({ products: res.data });
    }

    if (mode === "update") {
      let res = await ax.get("/admin/inventory/list");
      if (res.status !== 200) {
        notification.error({
          message: `Error: ${res.status}`,
          description: res.data.error,
          placement: "topRight",
        });
      } else {
        let inventory = res.data.map((i) => {
          const pname = this.state.products.find((p) => p.pid === i.pid).pname;
          const sname = this.state.sellers.find((s) => s.sid === i.sid).sname;
          return {
            ...i,
            name: "Seller: " + sname + ", Product: " + pname,
          };
        });
        this.setState({ inventory: inventory });
      }
    }
  };

  onFinish = async (values) => {
    const { notification } = this.props;
    const { sid, pid, quantity, price, discount } = values;
    if (sid) {
      const res = await ax.post("/admin/inventory/update", {
        sid,
        pid,
        quantity,
        price,
        discount,
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
          message: "Success",
          description: "Inventory updated successfully",
          placement: "topRight",
        });
      }
    } else {
      const res = await ax.post("/admin/inventory/add", {
        sid,
        pid,
        quantity,
        price,
        discount,
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
          message: "Success",
          description: "Inventory added successfully",
          placement: "topRight",
        });
      }
    }
  };

  onInventoryChange = async (value) => {
    const { inventory } = this.state;
    const { mode } = this.props;
    const i = inventory.find((i) => i.sid + "-" + i.pid === value);
    const initialValues =
      i.sid && mode === "update"
        ? {
            sid: i.sid,
            pid: i.pid,
            quantity: i.quantity,
            price: i.price,
            discount: i.discount,
          }
        : {};
    this.formRef.current.setFieldsValue(initialValues);
  };

  render = () => {
    const { mode } = this.props;
    const { sellers, products, inventory } = this.state;

    return (
      <Row>
        <Col span={24}>
          <h2>{mode === "update" ? "Update seller" : "Add new seller"}</h2>
        </Col>
        <Col span={12}></Col>
        <Col span={12}></Col>
        <Col span={12}>
          <Form ref={this.formRef} layout="vertical" onFinish={this.onFinish}>
            {mode === "update" ? (
              <Form.Item
                name="iid"
                label="Select an inventory"
                rules={[
                  { required: true, message: "Please select an inventory" },
                ]}
              >
                <Select
                  showSearch
                  placeholder="Select an inventory"
                  optionFilterProp="children"
                  onChange={this.onInventoryChange}
                >
                  {inventory.map((i) => {
                    const iid = i.sid + "-" + i.pid;
                    return (
                      <Select.Option key={iid} value={iid}>
                        {i.name}
                      </Select.Option>
                    );
                  })}
                </Select>
              </Form.Item>
            ) : (
              ""
            )}
            <Form.Item
              name="sid"
              label="Select a seller"
              rules={[{ required: true, message: "Please select a seller" }]}
            >
              <Select
                showSearch
                placeholder="Select a seller"
                optionFilterProp="children"
              >
                {sellers.map((seller) => (
                  <Select.Option key={seller.sid} value={seller.sid}>
                    {seller.sname}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item
              name="pid"
              label="Product"
              rules={[{ required: true, message: "Please select a product" }]}
            >
              <Select
                showSearch
                placeholder="Select a product"
                optionFilterProp="children"
              >
                {products.map((product) => (
                  <Select.Option key={product.pid} value={product.pid}>
                    {product.pname}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item
              name="quantity"
              label="Quantity"
              rules={[{ required: true, message: "Please enter a quantity" }]}
            >
              <InputNumber />
            </Form.Item>
            <Form.Item
              name="price"
              label="Price"
              rules={[{ required: true, message: "Please enter a price" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="discount"
              label="Discount"
              rules={[{ required: true, message: "Please enter a discount" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                {mode === "update" ? "Update Inventory" : "Add Inventory"}
              </Button>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    );
  };
}

export default Inventory;
