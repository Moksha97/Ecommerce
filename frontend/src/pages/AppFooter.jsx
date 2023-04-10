import React, { Component } from "react";
import { Layout } from "antd";

const { Footer } = Layout;
export default class AppFooter extends Component {
  render() {
    return (
      <Footer>
        <p className="copyright">
          CS 6360.003 - Database Design - S23 Project - E-commerce Platform
        </p>
      </Footer>
    );
  }
}
