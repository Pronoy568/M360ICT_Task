import { Card, Spin, Button } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useGetCategoriesQuery } from "../../redux/api";

interface Category {
  slug: string;
  name: string;
  url: string;
}

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
      <h2>Categories</h2>
      <ul>
        {categories?.map((category: Category) => (
          <div key={category.slug}>
            <Card title={category?.name} style={{ width: "100%" }}>
              <p>
                <strong>Slug:</strong> {category?.slug}
              </p>
              <Button
                type="primary"
                onClick={() => navigate(`/category/${category.slug}`)}
              >
                See All {category?.name} item
              </Button>
            </Card>
          </div>
        ))}
      </ul>
    </div>
  );
};

export default CategoryList;
