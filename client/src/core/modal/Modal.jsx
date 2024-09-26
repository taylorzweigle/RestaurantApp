//Taylor Zweigle, 2024
import React, { useEffect } from "react";
import { createPortal } from "react-dom";

import CloseIcon from "@mui/icons-material/Close";

import Button from "../button/Button";
import IconButton from "../iconButton/IconButton";
import Typography from "../typography/Typography";

const Modal = ({ children, open, loading, title, size, errorModal, action, onAction, onCancel }) => {
  let positionClass = "";
  let sizeClass = "";

  switch (size) {
    case "default":
      positionClass = "items-center";
      sizeClass = "h-fit";
      break;
    case "full":
      positionClass = "items-start";
      sizeClass = "h-[calc(100vh-8rem)]";
      break;
    default:
      positionClass = "items-center";
      sizeClass = "h-fit";
  }

  useEffect(() => {
    open && document.body.classList.add("overflow-hidden");
  }, [open]);

  const handleAction = () => {
    document.body.classList.remove("overflow-hidden");

    onAction && onAction();
  };

  const handleCancel = () => {
    document.body.classList.remove("overflow-hidden");

    onCancel && onCancel();
  };

  return (
    <>
      {createPortal(
        <div
          className={`${
            open ? `flex justify-center ${positionClass}` : "hidden"
          } fixed left-0 top-0 w-screen h-screen p-4 bg-gray-950/75 dark:bg-gray-500/75 drop-shadow-md`}
        >
          <div className={`flex flex-col bg-white dark:bg-gray-950 ${sizeClass} w-full sm:max-w-96`}>
            <div className="flex flex-row justify-between items-center p-4">
              <Typography variant="heading" color="primary">
                {title}
              </Typography>
              <IconButton onClick={handleCancel}>
                <CloseIcon />
              </IconButton>
            </div>
            <div className="flex-grow overflow-y-auto">
              <div className="p-4">{children}</div>
            </div>
            <div className="flex flex-row justify-end gap-4 p-4">
              <Button variant="text" onClick={handleCancel}>
                Cancel
              </Button>
              {action && (
                <Button variant={errorModal ? "error" : "primary"} onClick={handleAction} loading={loading}>
                  {action}
                </Button>
              )}
            </div>
          </div>
        </div>,
        document.getElementById("root-portal")
      )}
    </>
  );
};

export default Modal;
