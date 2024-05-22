import React from "react";
import {
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Button,
  Card,
  Typography,
} from "@material-tailwind/react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import category from "../project/projectCategory.js";

const menuItems = [
  {
    category: "Technology",
    details: [
      {
        title: "JavaScript",
        description:
          "Learn JavaScript, a powerful and popular programming language.",
      },
      {
        title: "React",
        description: "A library for building user interfaces efficiently.",
      },
    ],
  },
  {
    category: "Design",
    details: [
      {
        title: "UI/UX",
        description: "Design user-friendly and engaging interfaces.",
      },
      {
        title: "Graphic Design",
        description: "Create visual content to communicate messages.",
      },
    ],
  },
];

console.log(category);

export function CategoryBar() {
  return (
    <div className="flex gap-4 justify-center">
      {category.map((item, index) => (
        <Menu key={index} allowHover>
          <MenuHandler>
            <Button
              variant="text"
              className="flex items-center gap-2 text-base font-normal capitalize tracking-normal"
            >
              {
                <Typography
                  variant="small"
                  className="text-gray-900 font-normal"
                >
                  {Object.keys(item)}
                </Typography>
              }
              <ChevronDownIcon className="h-4 w-4 transition-transform" />
            </Button>
          </MenuHandler>
          <MenuList className="w-100">
            {Object.values(item).map((detail, idx) => (
              <div key={idx} className="grid grid-cols-3 gap-2">
                {detail.map((cat, i) => (
                  <MenuItem key={idx}>
                    <>
                      <Typography variant="h6" key={i}>
                        {cat}
                      </Typography>
                    </>
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
