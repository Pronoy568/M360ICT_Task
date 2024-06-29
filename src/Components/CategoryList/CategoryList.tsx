import { Card, Spin, Button } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useGetCategoriesQuery } from "../../redux/api";
import { Category } from "src/Type/Types";
import "./CategoryList.css";

const CategoryList: React.FC = () => {
  const { data: categories, error, isLoading } = useGetCategoriesQuery();
  const navigate = useNavigate();

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
          marginBottom: "20px",
          fontSize: "38px",
        }}
      >
        Categories
      </h1>
      <ul className="categoryList-div">
        {categories?.map((category: Category) => (
          <div className="grid-item" key={category.slug}>
            <Card title={category?.name} style={{ width: "100%" }}>
              <p>
                <strong>Slug:</strong> {category?.slug}
              </p>
              <Button
                type="dashed"
                onClick={() => navigate(`/category/${category.slug}`)}
              >
                See {category?.name} Item
              </Button>
            </Card>
          </div>
        ))}
      </ul>
    </div>
  );
};

export default CategoryList;
