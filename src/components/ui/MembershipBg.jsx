import React from "react";
import mainlogo from "../../assets/itemizeLogo.png";
import { Typography } from "@material-tailwind/react";

const MembershipBg = () => {
  return (
    <>
      <div className="h-lvh w-full overflow-hidden bg-gradient-to-br from-purple-100 via-pink-400 to-purple-600 p-16 leading-5">
        <a className="flex items-center justify-start space-x-4" href="/">
          <img src={mainlogo} alt="home logo" className="w-10" />
          <Typography className="mr-8 font-ubuntu text-3xl font-bold">
            itemize
          </Typography>
        </a>
        <div className="fixed bottom-0 mb-10 text-center text-white">
          <Typography className="font-ubuntu text-2xl font-normal">
            "Empowering Innovative Ideas Worldwide"
          </Typography>
        </div>
      </div>
    </>
  );
};

export default MembershipBg;
