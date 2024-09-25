// components/CustomButton.js
import React from "react";
import { Button, Typography } from "@material-tailwind/react";

const CustomButton = ({ label, active, onClick, type }) => {
  const activeColor = type === "Bid" ? "red-600" : "green-600";
  const hoverColor = type === "Bid" ? "red-600" : "green-600";

  return (
    <Button
      size="lg"
      className={`rounded-3xl ${
        active
          ? `bg-${activeColor} border border-transparent`
          : `bg-gray-50 hover:shadow-none shadow-none hover:border hover:border-${hoverColor}`
      }`}
      onClick={onClick}
    >
      <Typography
        className={`!normal-case ${
          active ? "font-medium text-white" : "text-black"
        }`}
      >
        {label}
      </Typography>
    </Button>
  );
};

export default CustomButton;