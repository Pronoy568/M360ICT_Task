import React, { useState, useEffect } from "react";
import { Table, Button, Pagination } from "antd";
import { ColumnsType } from "antd/es/table";
import { useNavigate } from "react-router-dom";
import { useGetProductsQuery } from "../../redux/api";
import { Product } from "src/Type/Types";
import "./ProductList.css";

const ProductList: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const { data, error, isLoading, refetch } = useGetProductsQuery({
    limit: pageSize,
    skip: (currentPage - 1) * pageSize,
  });

  useEffect(() => {
    refetch();
  }, [currentPage, pageSize, refetch]);

  const navigate = useNavigate();

  const columns: ColumnsType<Product> = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Brand",
      dataIndex: "brand",
      key: "brand",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
    },
    {
      title: "Rating",
      dataIndex: "rating",
      key: "rating",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Button
          type="primary"
          onClick={() => navigate(`/product/${record.id}`)}
        >
          View
        </Button>
      ),
    },
    {
      title: "Edit",
      key: "edit",
      render: (_, record) => (
        <Button onClick={() => navigate(`/edit-product/${record.id}`)}>
          Edit
        </Button>
      ),
    },
  ];

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading data</div>;
  }

  return (
    <div className="responsive-container">
      <h1 className="responsive-title">Product List</h1>
      <Table
        dataSource={data?.products}
        columns={columns}
        rowKey="id"
        pagination={false}
        scroll={{ x: 800 }}
        style={{ marginBottom: "20px" }}
      />
      <Pagination
        current={currentPage}
        pageSize={pageSize}
        total={data?.total}
        showSizeChanger
        onChange={(page) => setCurrentPage(page)}
        onShowSizeChange={(current, size) => setPageSize(size)}
      />
    </div>
  );
};

export default ProductList;
