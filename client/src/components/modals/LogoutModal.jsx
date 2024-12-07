//Taylor Zweigle, 2024
import React from "react";

import { Modal, Typography } from "antd";

import ModalNoScroll from "../../utility/ModalNoScroll";

const LogoutModal = ({ open, onLogoutClick, onCancelClick }) => {
  return (
    <ModalNoScroll open={open}>
      <Modal title="Logout" open={open} onOk={onLogoutClick} onCancel={onCancelClick}>
        <Typography.Text>Are you sure you want to logout?</Typography.Text>
      </Modal>
    </ModalNoScroll>
  );
};

export default LogoutModal;
