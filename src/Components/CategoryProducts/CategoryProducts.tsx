import { Card, Spin } from "antd";
import React from "react";
import { useParams } from "react-router-dom";
import { useGetProductsByCategoryQuery } from "../../redux/api";
import { Product } from "src/Type/Types";
import "./CategoryProducts.css";

const CategoryProducts: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { data, error, isLoading } = useGetProductsByCategoryQuery(slug);

  if (isLoading) {
    return <Spin />;
  }

  if (error) {
    return <div>Error loading data</div>;
  }

  return (
    <div>
      <h1
        style={{
          textAlign: "center",
          fontSize: "38px",
        }}
      >
        Products in {slug} category
      </h1>
      <ul className="categoryProduct">
        {data?.products.map((product: Product) => (
          <Card
            key={product.id}
            title={product.title}
            style={{ width: "100%", textAlign: "center" }}
            className="product-item"
          >
            <img
              src={product.thumbnail}
              alt={product.title}
              style={{ width: "100px" }}
            />
            <p style={{ textAlign: "justify" }}>{product.description}</p>
            <p>
              <strong>Price:</strong> ${product.price}
            </p>
            <p>
              <strong>Rating:</strong> {product.rating}
            </p>
          </Card>
        ))}
      </ul>
    </div>
  );
};

export default CategoryProducts;
