import React from "react";

const Card = ({ title, width, children }) => {
  const noAccount = (
    <p className="text-gray-400">
      Don't have an account?{" "}
      <a
        href="/signup"
        className="text-sm text-purple-700 hover:text-purple-700"
      >
        Sign Up
      </a>
    </p>
  );
  return (
    <div className="flex justify-center self-center  z-10">
      <div className={`p-12 bg-white mx-auto rounded-3xl ${width}`}>
        <div className="mb-7">
          <h3 className="font-semibold text-2xl text-gray-800">{title}</h3>
          {title === "Log In" && noAccount}
        </div>
        {children}
        <div className="mt-7 text-center text-gray-300 text-xs">
          <span>
            {"Copyright © 2024 "}
            <a
              href="https://codepen.io/uidesignhub"
              rel=""
              target="_blank"
              title="Codepen aji"
              className="text-purple-500 hover:text-purple-600 "
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
