//Taylor Zweigle, 2024
import React from "react";

const FloatingActionButton = ({ children, onClick }) => {
  return (
    <button
      className="fixed flex justify-center items-center h-16 w-16 right-0 bottom-0 bg-teal-600 hover:bg-teal-500 active:bg-teal-500 text-white m-4 rounded-full"
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default FloatingActionButton;
