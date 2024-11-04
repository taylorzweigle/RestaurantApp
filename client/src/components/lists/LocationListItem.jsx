//Taylor Zweigle, 2024
import React from "react";

import { Button, Flex, Typography } from "antd";

import { CloseOutlined } from "@ant-design/icons";

const LocationListItem = ({ location, onClick }) => {
  return (
    <Flex
      justify="space-between"
      align="flex-start"
      className="bg-white p-3 rounded-xl drop-shadow"
      onClick={onClick}
    >
      <Flex vertical>
        <Typography.Title level={5} style={{ marginBottom: "0px", lineHeight: "normal" }}>
          {`${location.city}, ${location.state}`}
        </Typography.Title>
        <Typography.Text type="secondary">{location.category}</Typography.Text>
      </Flex>
      <Flex>
        <Button type="text" shape="circle" icon={<CloseOutlined />} />
      </Flex>
    </Flex>
  );
};

export default LocationListItem;
