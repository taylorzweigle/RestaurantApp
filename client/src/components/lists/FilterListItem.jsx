//Taylor Zweigle, 2024
import React from "react";

import { List, Typography } from "antd";

import { CheckOutlined } from "@ant-design/icons";

const FilterListItem = ({ attribute, query, label, value, selected, onClick }) => {
  return (
    <List.Item
      actions={[
        <Typography.Text type="secondary">{value}</Typography.Text>,
        <CheckOutlined className={`text-lg text-blue-600 ${selected ? "opacity-100" : "opacity-0"}`} />,
      ]}
      onClick={() =>
        onClick({
          label: query,
          attribute: attribute,
          query: query,
        })
      }
      className="w-full cursor-pointer"
    >
      <List.Item.Meta title={<Typography.Text strong>{label}</Typography.Text>} />
    </List.Item>
  );
};

export default FilterListItem;
