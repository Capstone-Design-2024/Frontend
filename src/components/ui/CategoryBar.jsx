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
import { useNavigate } from "react-router-dom";

export function CategoryBar() {
  const navigate = useNavigate();
  const navigateHandler = (cat) => {
    const itemCategory = cat[0];
    navigate(`/projectslist/${itemCategory}`);
  };
  return (
    <div className="flex flex-wrap justify-center gap-4 bg-transparent">
      {category.map((item, index) => {
        return (
          <Menu key={index} allowHover>
            <MenuHandler>
              <Button
                variant="text"
                className="flex items-center gap-2 text-base font-normal !normal-case hover:bg-gray-100"
              >
                <Typography
                  variant="small"
                  className="font-normal text-gray-900"
                >
                  {Object.keys(item)}
                </Typography>
                <ChevronDownIcon className="h-4 w-4 transition-transform" />
              </Button>
            </MenuHandler>
            <MenuList className="w-full sm:w-96">
              {Object.values(item).map((detail, idx) => (
                <div
                  key={idx}
                  className="grid grid-cols-1 gap-2 sm:grid-cols-3"
                >
                  {detail.map((cat, i) => (
                    <MenuItem key={i}>
                      <Typography
                        variant="small"
                        className="font-normal text-gray-900"
                        key={i}
                      >
                        {cat}
                      </Typography>
                    </MenuItem>
                  ))}
                  <MenuItem onClick={() => navigateHandler(Object.keys(item))}>
                    <div className="flex items-center justify-start space-x-1">
                      <Typography
                        variant="small"
                        className="font-bold text-purple-700"
                      >
                        Show all
                      </Typography>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="size-4 text-purple-700"
                      >
                        <path
                          fillRule="evenodd"
                          d="M15.75 2.25H21a.75.75 0 0 1 .75.75v5.25a.75.75 0 0 1-1.5 0V4.81L8.03 17.03a.75.75 0 0 1-1.06-1.06L19.19 3.75h-3.44a.75.75 0 0 1 0-1.5Zm-10.5 4.5a1.5 1.5 0 0 0-1.5 1.5v10.5a1.5 1.5 0 0 0 1.5 1.5h10.5a1.5 1.5 0 0 0 1.5-1.5V10.5a.75.75 0 0 1 1.5 0v8.25a3 3 0 0 1-3 3H5.25a3 3 0 0 1-3-3V8.25a3 3 0 0 1 3-3h8.25a.75.75 0 0 1 0 1.5H5.25Z"
                          clipRule="evenodd"
                          stroke="currentColor"
                          stroke-width="1"
                        />
                      </svg>
                    </div>
                  </MenuItem>
                </div>
              ))}
            </MenuList>
          </Menu>
        );
      })}
    </div>
  );
}
