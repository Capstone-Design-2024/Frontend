import React from "react";
import mainlogo from "../../assets/itemizeLogo.png";

const MembershipBg = ({ children, type, padding }) => {
  var sentence = "Welcome back";
  if (type !== "Log In") {
    sentence = "Get your account free";
  }
  return (
    <>
      <div className="bg-purple-900 top-0 left-0 bg-gradient-to-b from-gray-900 via-gray-900 to-purple-800 bottom-0 leading-5 h-100vh w-full overflow-hidden ">
        <div>
          <div className="items-center relative min-h-screen sm:flex sm:flex-row justify-center bg-transparent rounded-3xl shadow-xl">
            <div>
              <a className="flex justify-center" href="/">
                <img src={mainlogo} alt="home logo" className="w-20 mb-8" />
              </a>
              <div
                className={`flex-col flex self-center ${padding} sm:max-w-4xl xl:max-w-md  z-10`}
              >
                {children}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MembershipBg;
