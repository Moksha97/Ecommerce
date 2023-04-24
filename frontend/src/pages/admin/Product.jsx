import React, { Component } from "react";
import { Button, Col, Form, Input, Row, Select } from "antd";
import ax from "../../utils/httpreq";

class Product extends Component {
  formRef = React.createRef();

  constructor(props) {
    super(props);
    this.state = {
      products: [],
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
    if (mode === "update") {
      let res = await ax.get("/admin/product/list");
      if (res.status !== 200) {
        notification.error({
          message: `Error: ${res.status}`,
          description: res.data.error,
          placement: "topRight",
        });
      } else {
        this.setState({ products: res.data });
      }
    }
  };

  onFinish = async (values) => {
    const { notification } = this.props;
    const { pname, pdesc, pcategory, pid } = values;
    if (pid) {
      const res = await ax.post("/admin/product/update", {
        pid,
        pname,
        pdesc,
        pcategory,
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
          description: "Product updated successfully",
          placement: "topRight",
        });
      }
    } else {
      const res = await ax.post("/admin/product/add", {
        pname,
        pdesc,
        pcategory,
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
          description: "Product added successfully",
          placement: "topRight",
        });
      }
    }
  };

  onProductChange = async (value) => {
    const { products } = this.state;
    const { mode } = this.props;
    const product = products.find((product) => product.pid === value);
    const initialValues =
      product.pname && mode === "update"
        ? {
            pname: product.pname,
            pdesc: product.pdesc,
            pcategory: product.pcategory,
          }
        : {};
    this.formRef.current.setFieldsValue(initialValues);
  };

  render = () => {
    const { mode } = this.props;
    const { products } = this.state;
    const validCategories = [
      "ELECTRONICS",
      "FASHION",
      "HOME",
      "HEALTH",
      "TOYS",
    ];

    return (
      <Row>
        <Col span={24}>
          <h2>{mode === "update" ? "Update product" : "Add new product"}</h2>
        </Col>
        <Col span={12}></Col>
        <Col span={12}></Col>
        <Col span={12}>
          <Form ref={this.formRef} layout="vertical" onFinish={this.onFinish}>
            {mode === "update" ? (
              <Form.Item
                name="pid"
                label="Select a product"
                rules={[{ required: true, message: "Please select a product" }]}
              >
                <Select
                  showSearch
                  placeholder="Select a product"
                  optionFilterProp="children"
                  onChange={this.onProductChange}
                >
                  {products.map((product) => (
                    <Select.Option key={product.pid} value={product.pid}>
                      {product.pname}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            ) : (
              ""
            )}
            <Form.Item
              name="pname"
              label="Product Name"
              rules={[{ required: true, message: "Please enter product name" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="pdesc"
              label="Product Description"
              rules={[
                { required: true, message: "Please enter product description" },
              ]}
            >
              <Input.TextArea />
            </Form.Item>
            <Form.Item
              name="pcategory"
              label="Category"
              rules={[{ required: true, message: "Please enter category" }]}
            >
              <Select>
                {validCategories.map((category) => (
                  <Option key={category} value={category}>
                    {category}
                  </Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                {mode === "update" ? "Update Product" : "Save Product"}
              </Button>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    );
  };
}

export default Product;
