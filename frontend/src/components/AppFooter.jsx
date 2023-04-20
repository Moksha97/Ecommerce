import React from "react";
import { Layout } from "antd";

const { Footer } = Layout;
const AppFooter = () => {
  return (
    <Footer>
      <p
        className="copyright"
        style={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          height: "30px",
          backgroundColor: `rgb(240, 242, 245)`,
          margin: 0,
        }}
      >
        CS 6360.003 - Database Design - S23 Project - E-commerce Platform
      </p>
    </Footer>
  );
};

export default AppFooter;
