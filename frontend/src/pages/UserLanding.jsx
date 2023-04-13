import React from "react";
import AppHeader from "./AppHeader";
import { Col, Layout, Row } from "antd";
import AppFooter from "./AppFooter";

const { Content } = Layout;

function UserLanding() {
  return (
    <>
      <Layout
        className="layout-default layout-signin"
        style={{ height: "100%" }}
      >
        <AppHeader />
        <Content className="signin">
          <Row gutter={[24, 0]} justify="center">
            <Col
              xs={{ span: 24, offset: 0 }}
              lg={{ span: 6, offset: 0 }}
              md={{ span: 12 }}
            ></Col>
          </Row>
        </Content>
        <AppFooter />
      </Layout>
    </>
  );
}

export default UserLanding;
