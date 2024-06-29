import { Card, Spin } from "antd";
import React from "react";
import { useParams } from "react-router-dom";
import { useGetProductsByCategoryQuery } from "../../redux/api";

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  thumbnail: string;
}

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
      <h2>Products in {slug} category</h2>
      <ul>
        {data?.products.map((product: Product) => (
          <Card
            key={product.id}
            title={product.title}
            style={{ width: "100%" }}
          >
            <p>{product.description}</p>
            <p>
              <strong>Price:</strong> ${product.price}
            </p>
            <img
              src={product.thumbnail}
              alt={product.title}
              style={{ width: "100px" }}
            />
          </Card>
        ))}
      </ul>
    </div>
  );
};

export default CategoryProducts;
