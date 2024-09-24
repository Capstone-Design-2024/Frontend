import React from "react";
import {
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Button,
  Typography,
} from "@material-tailwind/react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import category from "../createProject/projectCategory.js";

export function CategoryBar() {
  return (
    <div className="flex flex-wrap gap-4 justify-center">
      {category.map((item, index) => (
        <Menu key={index} allowHover>
          <MenuHandler>
            <Button
              variant="text"
              className="flex items-center gap-2 text-base font-normal capitalize tracking-normal"
            >
              <Typography variant="small" className="text-gray-900 font-normal">
                {Object.keys(item)}
              </Typography>
              <ChevronDownIcon className="h-4 w-4 transition-transform" />
            </Button>
          </MenuHandler>
          <MenuList className="w-full sm:w-96">
            {Object.values(item).map((detail, idx) => (
              <div key={idx} className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {detail.map((cat, i) => (
                  <MenuItem key={i}>
                    <Typography
                      variant="small"
                      className="text-gray-900 font-normal"
                      key={i}
                    >
                      {cat}
                    </Typography>
                  </MenuItem>
                ))}
              </div>
            ))}
          </MenuList>
        </Menu>
      ))}
    </div>
  );
}
