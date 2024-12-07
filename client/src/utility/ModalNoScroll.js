//Taylor Zweigle, 2024
import React, { useEffect } from "react";

const ModalNoScroll = ({ open, children }) => {
  useEffect(() => {
    if (open) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
  }, [open]);

  return <>{children}</>;
};

export default ModalNoScroll;
