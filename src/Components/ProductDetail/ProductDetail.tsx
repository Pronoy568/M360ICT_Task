import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, Button, Spin } from "antd";
import { useGetProductByIdQuery } from "../../redux/api";

interface RouteParams {
  id: string;
}

const ProductDetail: React.FC = () => {
  const { id } = useParams<keyof RouteParams>() as RouteParams;
  const { data, error, isLoading } = useGetProductByIdQuery(Number(id));
  const navigate = useNavigate();

  if (isLoading) {
    return <Spin />;
  }

  if (error) {
    return <div>Error loading data</div>;
  }

  return (
    <div style={{ padding: "24px", background: "#fff", borderRadius: "8px" }}>
      <Card
        title={data?.title}
        extra={<Button onClick={() => navigate("/")}>Back to Products</Button>}
        style={{ width: "100%" }}
        actions={[
          <Button
            type="primary"
            onClick={() => navigate(`/edit-product/${id}`)}
          >
            Edit Product
          </Button>,
        ]}
      >
        <img
          src={data?.thumbnail}
          alt={data?.title}
          style={{ width: "30%", marginBottom: "20px" }}
        />
        <p>
          <strong>Category:</strong> {data?.category}
        </p>
        <p>
          <strong>Price:</strong> ${data?.price}
        </p>
        <p>
          <strong>Rating:</strong> {data?.rating}
        </p>
        <p>{data?.description}</p>
      </Card>
    </div>
  );
};

export default ProductDetail;
