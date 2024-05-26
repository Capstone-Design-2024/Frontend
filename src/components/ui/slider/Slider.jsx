import React, { useState, useEffect } from "react";
import "./Slider.css";
import { Typography } from "@material-tailwind/react";

const Slider = ({ min, max, className }) => {
  const [value, setValue] = useState(50);

  useEffect(() => {
    const rangeInput = document.getElementById("purpleRange");
    rangeInput.style.background = `linear-gradient(to right, #7e22ce ${
      (value / 1000) * 100
    }%, #D8B4FE ${(value / 1000) * 100}%)`;
  }, [value]);

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <div className={`${className}`}>
      <Typography className="font-medium">$0 ~ ${value}.00</Typography>
      <input
        type="range"
        id="purpleRange"
        name="purpleRange"
        min={min}
        max={max}
        value={value}
        step={10}
        onChange={handleChange}
        className="mt-1"
      />
    </div>
  );
};

export default Slider;
