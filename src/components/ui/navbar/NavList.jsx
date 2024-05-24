import React, { useMemo } from "react";
import { Typography } from "@material-tailwind/react";

export default function NavList() {
  const navContent = useMemo(
    () => [
      { Account: "account" },
      { Cart: "cart" },
      { "My Projects": "myprojects" },
    ],
    []
  );

  return (
    <ul className="mt-2 mb-4 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
      {navContent.map((content, index) => {
        const [key, value] = Object.entries(content)[0];
        return (
          <Typography
            key={index}
            as="li"
            variant="small"
            color="blue-gray"
            className="p-1 font-normal transition-colors hover:text-purple-600 focus:text-purple-600 text-gray-600 sm:flex sm:justify-center xs:flex xs:justify-center"
          >
            <a href={value} className="flex items-center">
              {key}
            </a>
          </Typography>
        );
      })}
    </ul>
  );
}
