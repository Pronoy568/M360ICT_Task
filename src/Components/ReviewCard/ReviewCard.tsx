import { Avatar, Divider } from "antd";
import React from "react";
import { Review } from "src/Type/Types";

const ReviewCard = ({ review }: { review: Review }) => {
  return (
    <div
      style={{
        background: "#FFFFFF",
        borderRadius: "4px",
        padding: "8px",
        marginBottom: "12px",
        overflow: "hidden",
      }}
    >
      <div
        style={{ display: "flex", alignItems: "center", marginBottom: "8px" }}
      >
        <Avatar
          src="https://i.ibb.co/xgvvVMw/User-Profile.png"
          style={{
            width: "40px",
            height: "40px",
            borderRadius: "50%",
            marginRight: "8px",
          }}
        />
        <div>
          <p
            style={{
              color: "#1F2937",
              fontSize: "14px",
              fontWeight: "bold",
              margin: "0 0 3px 0",
            }}
          >
            {review.reviewerName}
          </p>
          <p
            style={{
              color: "#1F2937",
              fontSize: "14px",
              fontWeight: "bold",
              margin: "0 0 3px 0",
            }}
          >
            {review.reviewerEmail}
          </p>
        </div>
      </div>
      <Divider
        style={{
          width: "100%",
          height: "1px",
          borderRadius: "1px",
          backgroundColor: "#E5E7EB",
          margin: "8px 0",
        }}
      />
      <div>
        <p
          style={{
            color: "#1F2937",
            fontSize: "14px",
            marginBottom: "2px",
          }}
        >
          {review.comment}
        </p>
        <p
          style={{
            color: "#1F2937",
            fontSize: "14px",
            marginBottom: "8px",
          }}
        >
          Rating: {review.rating}
        </p>
      </div>
    </div>
  );
};

export default ReviewCard;
