import React, { useMemo } from "react";
import { Typography } from "@material-tailwind/react";

export default function NavList({ isLoggedIn }) {
  const navContent = useMemo(
    () => [
      { Account: "account" },
      { Cart: "cart" },
      { "My Projects": "myprojects" },
    ],
    []
  );
  const userEmail = localStorage.getItem("email");
  const userName = userEmail.split("@");

  return (
    <ul className="mt-2 mb-4 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
      {isLoggedIn && (
        <div className=" right-0 top-0 flex flex-col items-end">
          <Typography variant="small">Welcome, </Typography>
          <Typography variant="small" className="text-purple-700">
            {userName[0]}
          </Typography>
        </div>
      )}
      {navContent.map((content, index) => {
        const [key, value] = Object.entries(content)[0];
        return (
          <Typography
            key={index}
            as="li"
            variant="small"
            color="blue-gray"
            className="p-1 font-normal transition-colors hover:text-purple-600 focus:text-purple-600 text-gray-600 flex justify-center"
          >
            <a href={`/${value}`} className="flex items-center">
              {key}
            </a>
          </Typography>
        );
      })}
    </ul>
  );
}
