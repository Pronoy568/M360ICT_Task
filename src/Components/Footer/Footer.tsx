import { Layout, Row, Col } from "antd";
import React from "react";

const { Footer } = Layout;

const AppFooter = () => {
  return (
    <Footer
      style={{
        background: "#1c1e22",
        color: "#fff",
        textAlign: "center",
      }}
    >
      <div
        style={{
          maxWidth: "1250px",
          width: "90%",
          margin: "0px auto",
        }}
      >
        <Row gutter={[16, 16]} justify="space-between">
          <Col xs={24} sm={12} md={6} style={{ marginBottom: "16px" }}>
            <h3 style={{ color: "#fff" }}>Services</h3>
            <p>Product</p>
            <p>Fresh</p>
            <p>Sell</p>
            <p>Marketing</p>
          </Col>
          <Col xs={24} sm={12} md={6} style={{ marginBottom: "16px" }}>
            <h3 style={{ color: "#fff" }}>Customers</h3>
            <p>Supplier</p>
            <p>Buyer</p>
            <p>Female</p>
            <p>Girls</p>
          </Col>
          <Col xs={24} sm={12} md={6} style={{ marginBottom: "16px" }}>
            <h3 style={{ color: "#fff" }}>Company</h3>
            <p>About us</p>
            <p>Careers</p>
            <p>Contact us</p>
            <p>Information</p>
          </Col>
          <Col xs={24} sm={12} md={6} style={{ marginBottom: "16px" }}>
            <h3 style={{ color: "#fff" }}>Further Information</h3>
            <p>Terms & Conditions</p>
            <p>Privacy</p>
            <p>Copy</p>
            <p>Policy</p>
          </Col>
        </Row>
        <p>Copyright © 2024 The M360ICTTask. Reserved All Rights.</p>
      </div>
    </Footer>
  );
};

export default AppFooter;
