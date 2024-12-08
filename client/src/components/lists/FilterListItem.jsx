//Taylor Zweigle, 2024
import React from "react";

import { Button, Typography } from "antd";

const FilterListItem = ({ attribute, query, label, value, selected, onClick }) => {
  return (
    <Button
      type="default"
      color={selected ? "primary" : "default"}
      variant={selected ? "solid" : "outlined"}
      onClick={() =>
        onClick({
          label: query,
          attribute: attribute,
          query: query,
        })
      }
    >
      <Typography.Text strong>{label}</Typography.Text>
      <Typography.Text>{value}</Typography.Text>
    </Button>
  );
};

export default FilterListItem;
