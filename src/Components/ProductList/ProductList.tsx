import React, { useState, useEffect } from "react";
import { Table, Button, Pagination } from "antd";
import { ColumnsType } from "antd/es/table";
import { useNavigate } from "react-router-dom";
import { useGetProductsQuery } from "../../redux/api";

interface Product {
  id: number;
  title: string;
  price: number;
  category: string;
  description: string;
  thumbnail: string;
}

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
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Button
          type="primary"
          onClick={() => navigate(`/product/${record.id}`)}
        >
          View Details
        </Button>
      ),
    },
    {
      title: "Edit",
      key: "edit",
      render: (_, record) => (
        <Button
          type="primary"
          onClick={() => navigate(`/edit-product/${record.id}`)}
        >
          Edit Product
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
    <div>
      <h2>Total Product: {data?.total}</h2>
      <Table
        dataSource={data?.products}
        columns={columns}
        rowKey="id"
        pagination={false}
        style={{ marginBottom: "20px" }}
      />
      <Pagination
        current={currentPage}
        pageSize={pageSize}
        total={data?.total}
        showSizeChanger
        onChange={(page) => setCurrentPage(page)}
        onShowSizeChange={(size) => setPageSize(size)}
      />
    </div>
  );
};

export default ProductList;
