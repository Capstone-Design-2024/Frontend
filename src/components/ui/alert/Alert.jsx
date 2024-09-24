import React, { useState } from "react";

const Alert = ({ message, open, onClose }) => {
  return (
    <>
      <Alert
        color="red"
        onClose={onClose}
        animate={{
          mount: { y: 0 },
          unmount: { y: 100 },
        }}
        className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 w-3/4 sm:w-1/2"
      >
        {message}
      </Alert>
    </>
  );
};

export default Alert;
