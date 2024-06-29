import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Form, Input, Button, Select, Spin, Space, InputNumber } from "antd";
import { FormListFieldData } from "antd/lib/form/FormList";
import {
  useGetCategoriesQuery,
  useGetProductByIdQuery,
  useUpdateProductMutation,
} from "../../redux/api";

interface RouteParams {
  id: string;
}

const EditProduct: React.FC = () => {
  const { id } = useParams<keyof RouteParams>() as RouteParams;
  const navigate = useNavigate();
  const {
    data: product,
    isLoading: productLoading,
    error: productError,
  } = useGetProductByIdQuery(Number(id));
  const {
    data: categories,
    isLoading: categoriesLoading,
    error: categoriesError,
  } = useGetCategoriesQuery();
  const [updateProduct, { isLoading: updating }] = useUpdateProductMutation();
  const [form] = Form.useForm();

  useEffect(() => {
    if (product) {
      form.setFieldsValue({
        ...product,
        reviews: product.reviews || [],
      });
    }
  }, [product, form]);

  const onFinish = (values: any) => {
    const formattedValues = {
      ...values,
      price: Number(values.price),
      reviews: values.reviews.map((review: any) => ({
        ...review,
        rating: Number(review.rating),
      })),
    };

    console.log("Updated Product:", formattedValues);
    updateProduct({ id: Number(id), product: formattedValues }).then(() => {
      navigate(`/product/${id}`);
    });
  };

  interface Category {
    slug: string;
    name: string;
    url: string;
  }

  if (productLoading || categoriesLoading) {
    return <Spin />;
  }

  if (productError || categoriesError) {
    return <div>Error loading data</div>;
  }

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={onFinish}
      initialValues={{
        ...product,
        category: product?.category || "",
        reviews: product?.reviews || [],
      }}
    >
      <Form.Item name="title" label="Title" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item name="price" label="Price" rules={[{ required: true }]}>
        <Input type="number" />
      </Form.Item>
      <Form.Item name="category" label="Category" rules={[{ required: true }]}>
        <Select>
          {categories?.map((category: Category) => (
            <Select.Option key={category.slug} value={category.name}>
              {category.name}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item
        name="description"
        label="Description"
        rules={[{ required: true }]}
      >
        <Input.TextArea rows={4} />
      </Form.Item>
      <Form.List name="reviews">
        {(fields: FormListFieldData[], { add, remove }) => (
          <>
            {fields.map(({ key, name, ...restField }) => (
              <Space
                key={key}
                style={{ display: "flex", marginBottom: 8 }}
                align="baseline"
              >
                <Form.Item
                  {...restField}
                  name={[name, "reviewerName"]}
                  fieldKey={[String(key), "reviewerName"]}
                  rules={[{ required: true, message: "Missing user" }]}
                >
                  <Input placeholder="reviewerName" />
                </Form.Item>
                <Form.Item
                  {...restField}
                  name={[name, "reviewerEmail"]}
                  fieldKey={[String(key), "reviewerEmail"]}
                  rules={[{ required: true, message: "Missing reviewerEmail" }]}
                >
                  <Input placeholder="reviewerEmail" />
                </Form.Item>
                <Form.Item
                  {...restField}
                  name={[name, "comment"]}
                  fieldKey={[String(key), "comment"]}
                  rules={[{ required: true, message: "Missing comment" }]}
                >
                  <Input placeholder="Review" />
                </Form.Item>
                <Form.Item
                  {...restField}
                  name={[name, "rating"]}
                  fieldKey={[String(key), "rating"]}
                  rules={[{ required: true, message: "Missing rating" }]}
                >
                  <InputNumber placeholder="Rating" />
                </Form.Item>
                <Button type="dashed" onClick={() => remove(name)}>
                  Remove
                </Button>
              </Space>
            ))}
            <Form.Item>
              <Button type="dashed" onClick={() => add()} block>
                Add Review
              </Button>
            </Form.Item>
          </>
        )}
      </Form.List>
      <Form.Item>
        <Button type="primary" htmlType="submit" loading={updating}>
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default EditProduct;
