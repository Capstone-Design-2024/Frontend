import React, { useState } from "react";
import { Button, Input, Typography } from "@material-tailwind/react";
import StickyNavbar from "../components/ui/navbar/StickyNavbar";
import FooterWithLogo from "../components/ui/FooterWithLogo";
import logo from "../assets/itemizeLogo.png";
import { useLocation, useNavigate } from "react-router-dom";

const AskAndBidPage = ({ project, isLoggedIn, type }) => {
  const [isFocused, setIsFocused] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const handleChange = (e) => {
    const value = e.target.value.replace(/,/g, ""); // 쉼표 제거
    if (!isNaN(value) && value !== "") {
      setInputValue(Number(value).toLocaleString()); // 1000단위로 쉼표 추가
    } else {
      setInputValue("");
    }
  };

  const handleFocus = (e) => {
    e.target.placeholder = "";
    setIsFocused(true);
  };

  const handleBlur = (e) => {
    e.target.placeholder = "Your Price";
    setIsFocused(false);
  };

  return (
    <>
      <StickyNavbar isLoggedIn={isLoggedIn}>
        <div className="flex justify-center bg-white my-6">
          <Typography variant="h4">Place {type}</Typography>
        </div>
        <div className="bg-gray-100 flex justify-center py-10">
          <div className="bg-white w-1/2 rounded-md p-6">
            <div className="flex justify-start">
              <div className="bg-gray-100 flex justify-center p-2 rounded-md mr-6">
                <img
                  src={project ? project.thumbnail : logo}
                  alt="Product"
                  className="h-[80px] rounded-lg object-scale-down"
                />
              </div>
              <div>
                <Typography className="font-bold">NFT ID</Typography>
                <Typography className="font-medium">
                  {project ? project.title : "Project Title"}
                </Typography>
                <div className="flex justify-start">
                  <Typography className="font-normal">By&nbsp;</Typography>
                  <Typography className="font-normal text-deep-purple-600">
                    {project ? project.creater : "Creater Name"}
                  </Typography>
                </div>
                <div className="flex justify-start">
                  <Typography className="font-normal">To&nbsp;</Typography>
                  <Typography className="font-normal text-deep-purple-600">
                    {project ? project.creater : "Buyer Address"}
                  </Typography>
                </div>
              </div>
            </div>
            <hr className="mt-6" />
            <div className="flex flex-col mt-3">
              <div className="flex justify-center">
                <div className="w-1/2 flex justify-center border-r-[1px]">
                  <div className="my-5">
                    <Typography>Lowest Bid</Typography>
                    <Typography className="flex justify-center">-</Typography>
                  </div>
                </div>

                <div className="w-1/2 flex justify-center">
                  <div className="my-5">
                    <Typography>Lowest Ask</Typography>
                    <Typography className="flex justify-center">-</Typography>
                  </div>
                </div>
              </div>
            </div>
            <hr className="mt-3" />
            <div className="mt-6">
              <Typography className="font-bold">Name Your Price</Typography>
            </div>
            <div className="flex items-center space-x-2 w-full">
              <input
                variant="static"
                type="text"
                className="text-lg border-0 focus:outline-none focus:ring-0 text-right w-full"
                placeholder="Your Price"
                value={inputValue}
                onChange={handleChange}
                onFocus={handleFocus}
                onBlur={handleBlur}
              />

              <Typography className="text-lg font-semibold">PNP</Typography>
            </div>
            <hr
              className={`mt-2 mb-6 transition-colors duration-200 ${
                isFocused ? "border-black" : "border-gray-200"
              }`}
            />
            <Button
              size="lg"
              className="w-full bg-purple-700 hover:bg-purple-600"
            >
              <Typography variant="h6" className="!normal-case ">
                Place {type}
              </Typography>
            </Button>
          </div>
        </div>
        <div className="mt-6 mx-40 px-4 ">
          <FooterWithLogo />
        </div>
      </StickyNavbar>
    </>
  );
};

export default AskAndBidPage;
