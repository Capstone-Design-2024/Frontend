import { Typography } from "@material-tailwind/react";
import React from "react";

const Card = ({ title, children, msg }) => {
  const noAccount = (
    <>
      <p className="text-gray-700">
        Don't have an account?{" "}
        <a
          href="/signup"
          className="text-sm text-purple-700 hover:text-purple-700"
        >
          Sign Up
        </a>
      </p>
      <Typography className="text-md font-normal text-red-700">
        {msg}
      </Typography>
    </>
  );
  return (
    <div className="flex w-full justify-center self-center">
      <div className={`mx-auto w-2/3 rounded-3xl bg-white/80 p-12`}>
        <div className="mb-5">
          <h3 className="text-2xl font-semibold text-gray-800">{title}</h3>
          {title === "Log In" && noAccount}
        </div>
        {children}
        <div className="mt-7 text-center text-xs text-gray-800">
          <span>
            {"Copyright © 2024 "}
            <a
              href="/"
              target="_blank"
              className="text-purple-700 hover:text-purple-600"
            >
              Itemize
            </a>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Card;
