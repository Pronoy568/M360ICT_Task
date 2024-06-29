import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, Button, Spin } from "antd";
import { useGetProductByIdQuery } from "../../redux/api";
import { Review, RouteParams } from "src/Type/Types";
import ReviewCard from "../ReviewCard/ReviewCard";
import "./ProductDetail.css";

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
    <div
      style={{
        padding: "24px",
        background: "#fff",
        borderRadius: "8px",
        maxWidth: "1250px",
        width: "100%",
        margin: "50px auto",
      }}
    >
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
        <div
          style={{
            maxWidth: "100%",
            margin: "auto",
            padding: "16px",
            marginTop: "10px",
            textAlign: "left",
            color: "#111827",
          }}
        >
          <div>
            <img
              src={data?.thumbnail}
              alt={data?.title}
              width="100%"
              height="auto"
              style={{
                maxHeight: "500px",
              }}
            />
          </div>
          <div>
            <h2>
              <strong>Category:</strong> {data?.category}
            </h2>
            <h2>
              <strong>Brand:</strong> {data?.brand}
            </h2>
            <h2>
              <strong>Price:</strong> ${data?.price}
            </h2>
            <h2>
              <strong>Rating:</strong> {data?.rating}
            </h2>
            <p>{data?.description}</p>
          </div>
          {/* //* Reviews */}
          <div className="responsive-div">
            {data?.reviews.map((review: Review, index: number) => (
              <ReviewCard key={index} review={review} />
            ))}
          </div>
        </div>
      </Card>
    </div>
  );
};

export default ProductDetail;
