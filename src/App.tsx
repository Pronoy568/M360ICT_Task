import React from "react";
import { Route, Routes } from "react-router-dom";
import { Layout, Menu } from "antd";
import { Link } from "react-router-dom";
import ProductList from "./Components/ProductList/ProductList";
import ProductDetail from "./Components/ProductDetail/ProductDetail";
import EditProduct from "./Components/EditProduct/EditProduct";
import CategoryList from "./Components/CategoryList/CategoryList";
import CategoryProducts from "./Components/CategoryProducts/CategoryProducts";

const { Header, Content } = Layout;

const App: React.FC = () => {
  return (
    <Layout>
      <Header>
        <Menu theme="dark" mode="horizontal">
          <Menu.Item key="1">
            <Link to="/">Products</Link>
          </Menu.Item>
          <Menu.Item key="2">
            <Link to="/categories">Category</Link>
          </Menu.Item>
        </Menu>
      </Header>
      <Content style={{ padding: "0 50px", marginTop: "16px" }}>
        <Routes>
          <Route path="/" element={<ProductList />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/edit-product/:id" element={<EditProduct />} />
          <Route path="/categories" element={<CategoryList />} />
          <Route path="/category/:slug" element={<CategoryProducts />} />
        </Routes>
      </Content>
    </Layout>
  );
};

export default App;
