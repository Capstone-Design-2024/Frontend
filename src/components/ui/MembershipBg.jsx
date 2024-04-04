import React from "react";

const MembershipBg = ({ children, type, padding }) => {
  var sentence = "Welcome back";
  if (type !== "Log In") {
    sentence = "Get your account free";
  }
  return (
    <>
      <div className="bg-purple-900 absolute top-0 left-0 bg-gradient-to-b from-gray-900 via-gray-900 to-purple-800 bottom-0 leading-5 h-full w-full overflow-hidden">
        <div className="relative">
          <a href="/">
            <h1 className="text-white text-lg"> Home</h1>
          </a>
        </div>
        <div>
          <div className="relative  min-h-screen  sm:flex sm:flex-row  justify-center bg-transparent rounded-3xl shadow-xl">
            <div
              className={`flex-col flex  self-center ${padding} sm:max-w-4xl xl:max-w-md  z-10`}
            ></div>
            {children}
          </div>
        </div>
      </div>
    </>
  );
};

export default MembershipBg;
