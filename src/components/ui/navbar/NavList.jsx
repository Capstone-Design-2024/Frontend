import React, { useMemo } from "react";
import { Typography } from "@material-tailwind/react";

export default function NavList({ isLoggedIn }) {
  const navContent = useMemo(
    () => [
      { Account: "account" },
      { Cart: "cart" },
      { "My Projects": "myprojects" },
    ],
    [],
  );
  const userEmail = localStorage.getItem("email");
  const userName = userEmail ? userEmail.split("@") : "";

  return (
    <ul className="mb-4 mt-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
      {isLoggedIn && (
        <div className="right-0 top-0 flex flex-col items-end">
          <Typography variant="small" className="font-montseratt font-medium">
            Welcome,{" "}
          </Typography>
          <Typography
            variant="small"
            className="font-montseratt font-medium text-purple-700"
          >
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
            className="flex justify-start p-1 font-normal hover:text-purple-600 focus:text-purple-600"
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
