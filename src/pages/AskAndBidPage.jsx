import React, { useState, useEffect, useCallback } from "react";
import { useLocation } from "react-router-dom";
import { Typography, Button } from "@material-tailwind/react";
import StickyNavbar from "../components/ui/navbar/StickyNavbar";
import FooterWithLogo from "../components/ui/FooterWithLogo";
import logo from "../assets/itemizeLogo.png";
import CustomButton from "../components/ui/CustomButton";
import { API } from "../config";
import axios from "axios";
import CheckoutSuccessDialog from "../components/ui/CheckoutSuccessDialog";

const AskAndBidPage = ({ isLoggedIn, type }) => {
  const location = useLocation();
  const { project } = location.state;

  const [isFocused, setIsFocused] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [tradingType, setTradingType] = useState("Place " + type);
  const [lowestAsk, setLowestAsk] = useState();
  const [lowestBid, setLowestBid] = useState();
  const [isSuccessDialogOpen, setisSuccessDialogOpen] = useState(false);

  const fetchAuctionData = useCallback(async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get(
        `${API.GETAUCTION}/${project.projectId}`,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.data) {
        const bidPrices = response.data.data
          .filter((item) => item.type === "BID")
          .map((item) => item.priceForAuction);

        const lowestBidPrice =
          bidPrices.length > 0 ? Math.min(...bidPrices) : null;
        setLowestBid(lowestBidPrice);

        const askPrices = response.data.data
          .filter((item) => item.type === "ASK")
          .map((item) => item.priceForAuction);

        const lowestAskPrice =
          askPrices.length > 0 ? Math.min(...askPrices) : null;
        setLowestAsk(lowestAskPrice);
      }
    } catch (error) {
      console.log("Error fetching auction data:", error);
    }
  }, [project.projectId, type]);

  useEffect(() => {
    fetchAuctionData();
  }, [fetchAuctionData]);

  const handleChange = (e) => {
    const value = e.target.value.replace(/,/g, "");
    if (!isNaN(value) && value !== "") {
      setInputValue(Number(value).toLocaleString());
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

  const handleDialogOpen = () => {
    setisSuccessDialogOpen((origin) => !origin);
  };

  const placePrice = async (auctionType) => {
    const price = Number(inputValue.replace(/,/g, ""));
    const data = {
      price: price,
      type: auctionType.toUpperCase(),
      projectId: project.projectId,
    };
    const token = localStorage.getItem("token");
    try {
      const response = await axios.post(`${API.CREATEAUCTION}`, data, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      setisSuccessDialogOpen(true);
      fetchAuctionData();
    } catch (error) {
      console.log("Error:", error);
    }
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
                    {project ? project.makerName : "Creater Name"}
                  </Typography>
                </div>
                <div className="flex justify-start">
                  <Typography className="font-normal">To&nbsp;</Typography>
                  <Typography className="font-normal text-deep-purple-600">
                    {localStorage.getItem("email")
                      ? localStorage.getItem("email")
                      : "My Name"}
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
                    <Typography className="flex justify-center">
                      {lowestBid ? lowestBid.toLocaleString() + " PNP" : "-"}
                    </Typography>
                  </div>
                </div>
                <div className="w-1/2 flex justify-center">
                  <div className="my-5">
                    <Typography>Lowest Ask</Typography>
                    <Typography className="flex justify-center">
                      {lowestAsk ? lowestAsk.toLocaleString() + " PNP" : "-"}
                    </Typography>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 border border-gray-100 rounded-3xl p-1 mt-4 grid grid-cols-2 gap-1">
              <CustomButton
                label={`Place ${type}`}
                active={tradingType === `Place ${type}`}
                onClick={() => setTradingType(`Place ${type}`)}
                type={type}
                availability={1}
              />
              <CustomButton
                label={type === "Bid" ? "Buy Now" : "Sell Now"}
                active={
                  tradingType === (type === "Bid" ? "Buy Now" : "Sell Now")
                }
                onClick={() =>
                  setTradingType(type === "Bid" ? "Buy Now" : "Sell Now")
                }
                type={type}
                availability={type === "Bid" ? lowestBid : lowestAsk}
              />
            </div>
            <div className="mt-6">
              <Typography className="font-bold">
                {tradingType.includes("Place")
                  ? "Name Your Price"
                  : "Price Now"}
              </Typography>
            </div>
            <div className="flex items-center space-x-2 w-full">
              {tradingType.includes("Place") ? (
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
              ) : (
                <Typography className="text-lg font-medium border-0 focus:outline-none focus:ring-0 text-right w-full">
                  {type === "Bid"
                    ? lowestBid.toLocaleString()
                    : lowestAsk.toLocaleString()}
                </Typography>
              )}
              <Typography className="text-lg font-semibold">PNP</Typography>
            </div>
            {tradingType.includes("Place") ? (
              <hr
                className={`mt-2 mb-6 transition-colors duration-200 ${
                  isFocused ? "border-black" : "border-gray-200"
                }`}
              />
            ) : (
              <hr className="mt-2 mb-6 transition-colors duration-200" />
            )}
            <Button
              size="lg"
              className="w-full bg-purple-700 hover:bg-purple-600"
              onClick={() => {
                if (!tradingType.includes("Place")) {
                  console.log("Buy or SEll");
                } else {
                  placePrice(type);
                }
              }}
              disabled={tradingType.includes("Place") & !inputValue && true}
            >
              <Typography variant="h6" className="!normal-case ">
                {tradingType.includes("Place")
                  ? `Place ${type}`
                  : `${type === "Bid" ? "Buy" : "Sell"}`}
              </Typography>
            </Button>
          </div>
        </div>
        <div className="mt-6 mx-40 px-4 ">
          <FooterWithLogo />
        </div>
      </StickyNavbar>
      {isSuccessDialogOpen && (
        <CheckoutSuccessDialog
          open={isSuccessDialogOpen}
          handler={handleDialogOpen}
          from={type}
        />
      )}
    </>
  );
};

export default AskAndBidPage;
