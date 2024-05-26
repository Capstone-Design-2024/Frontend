import React, { useState } from "react";
import {
  Input,
  Select,
  Option,
  Slider,
  Button,
  Card,
  Typography,
} from "@material-tailwind/react";

export default function ProjectFilter({ onApplyFilters }) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [priceRange, setPriceRange] = useState([0, 500]);

  const handleApplyFilters = () => {
    onApplyFilters({
      search,
      category,
      priceRange,
    });
  };

  const handlePriceChange = (newValue) => {
    setPriceRange([0, newValue]);
  };

  return (
    <Card className="p-4 mb-4">
      <Typography variant="h6" color="blue-gray" className="mb-4">
        Filter Products
      </Typography>
      <Input
        label="Search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <Select
        label="Category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      >
        <Option value="">All Categories</Option>
        <Option value="electronics">Electronics</Option>
        <Option value="clothing">Clothing</Option>
        <Option value="furniture">Furniture</Option>
        <Option value="beauty">Beauty</Option>
      </Select>
      <div className="flex flex-col">
        <Typography variant="small" color="blue-gray" className="mb-2">
          Price Range: ${priceRange[0]} - ${priceRange[1]}
        </Typography>
      </div>
      <div className="w-full">
        <Slider
          size="md"
          defaultValue={(priceRange[1] / 1000) * 100}
          onChange={(event) => handlePriceChange(event.target.value)}
          min={0}
          max={1000}
          step={10}
        />
      </div>
      <Button onClick={handleApplyFilters} className="mt-4">
        Apply Filters
      </Button>
    </Card>
  );
}
