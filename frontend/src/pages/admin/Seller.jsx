import React, { Component } from "react";
import { Button, Col, Form, Input, Row, Select } from "antd";
import ax from "../../utils/httpreq";

class Seller extends Component {
  formRef = React.createRef();

  constructor(props) {
    super(props);
    this.state = {
      sellers: [],
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
    }
  };

  onFinish = async (values) => {
    const { notification } = this.props;
    const { accountnumber, bank, branchcode, routingnumber, sid, sname } =
      values;
    if (sid) {
      const res = await ax.post("/admin/seller/update", {
        sid,
        sname,
        accountnumber,
        branchcode,
        bank,
        routingnumber,
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
          description: "Seller updated successfully",
          placement: "topRight",
        });
      }
    } else {
      const res = await ax.post("/admin/seller/add", {
        sname,
        accountnumber,
        branchcode,
        bank,
        routingnumber,
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
          description: "Seller added successfully",
          placement: "topRight",
        });
      }
    }
  };

  onSellerChange = async (value) => {
    const { sellers } = this.state;
    const { mode } = this.props;
    const seller = sellers.find((seller) => seller.sid === value);
    const initialValues =
      seller.sname && mode === "update"
        ? {
            sname: seller.sname,
            accountnumber: seller.accountnumber,
            branchcode: seller.branchcode,
            bank: seller.bank,
            routingnumber: seller.routingnumber,
          }
        : {};
    this.formRef.current.setFieldsValue(initialValues);
  };

  render = () => {
    const { mode } = this.props;
    const { sellers } = this.state;

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
                name="sid"
                label="Select a seller"
                rules={[{ required: true, message: "Please select a seller" }]}
              >
                <Select
                  showSearch
                  placeholder="Select a seller"
                  optionFilterProp="children"
                  onChange={this.onSellerChange}
                >
                  {sellers.map((seller) => (
                    <Select.Option key={seller.sid} value={seller.sid}>
                      {seller.sname}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            ) : (
              ""
            )}
            <Form.Item
              name="sname"
              label="Seller Name"
              rules={[{ required: true, message: "Please enter seller name" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="accountnumber"
              label="Account Number"
              rules={[
                { required: true, message: "Please enter account number" },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="branchcode"
              label="Branch Code"
              rules={[{ required: true, message: "Please enter branch code" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="bank"
              label="Bank"
              rules={[{ required: true, message: "Please enter a bank" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="routingnumber"
              label="Routing Number"
              rules={[
                { required: true, message: "Please enter routing number" },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                {mode === "update" ? "Update Seller" : "Save Seller"}
              </Button>
            </Form.Item>
          </Form>
        </Col>
        <Col span={12}></Col>
      </Row>
    );
  };
}

export default Seller;
