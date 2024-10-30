//Taylor Zweigle, 2024
import React from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

import { Button, Typography } from "antd";

const FilterCard = ({ attribute, query, label, value }) => {
  const naviagte = useNavigate();

  const [searchParams] = useSearchParams({ attribute: "", query: "" });

  const handleOnClick = () => {
    searchParams.set("attribute", attribute);
    searchParams.set("query", query);

    attribute === "All" ? naviagte("/") : naviagte(`/restaurants?attribute=${attribute}&query=${query}`);
  };

  return (
    <Button onClick={handleOnClick}>
      <Typography.Text strong>{label}</Typography.Text>
      <Typography.Text type="secondary">{value}</Typography.Text>
    </Button>
  );
};

export default FilterCard;
