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
  const { project } = location.state || {};

  const [isFocused, setIsFocused] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [tradingType, setTradingType] = useState("Place " + type);
  const [lowestAsk, setLowestAsk] = useState();
  const [lowestBid, setLowestBid] = useState();
  const [lowestAuctionId, setLowestAuctionId] = useState({
    lowestBidAuctionId: "",
    lowestAskAuctionId: "",
  });
  const [isSuccessDialogOpen, setisSuccessDialogOpen] = useState(false);
  const [openTradingSuccessDialog, setOpenTradingSuccessDialog] =
    useState(false);

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
        },
      );
      if (response.data) {
        const bidItems = response.data.data.filter(
          (item) => item.type === "BID",
        );
        const bidPrices = bidItems.map((item) => item.priceForAuction);

        const lowestBidPrice =
          bidPrices.length > 0 ? Math.min(...bidPrices) : null;
        setLowestBid(lowestBidPrice);

        if (lowestBidPrice !== null) {
          const lowestBidItem = bidItems.find(
            (item) => item.priceForAuction === lowestBidPrice,
          );
          setLowestAuctionId((prevId) => ({
            ...prevId,
            lowestBidAuctionId: lowestBidItem ? lowestBidItem.auctionId : null,
          }));
        }
        console.log(lowestAuctionId);

        const askItems = response.data.data.filter(
          (item) => item.type === "ASK",
        );
        const askPrices = askItems.map((item) => item.priceForAuction);

        const lowestAskPrice =
          askPrices.length > 0 ? Math.min(...askPrices) : null;
        setLowestAsk(lowestAskPrice);

        if (lowestAskPrice !== null) {
          const lowestAskItem = askItems.find(
            (item) => item.priceForAuction === lowestAskPrice,
          );
          setLowestAuctionId((prevId) => ({
            ...prevId,
            lowestAskAuctionId: lowestAskItem ? lowestAskItem.auctionId : null,
          }));
        }
      }
    } catch (error) {
      console.log("Error fetching auction data:", error);
    }
  }, [project.projectId, type]);

  useEffect(() => {
    console.log("Updated lowestAuctionId:", lowestAuctionId);
  }, [lowestAuctionId]);

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

  const handleTradingDialogOpen = () => {
    setOpenTradingSuccessDialog((origin) => !origin);
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

  const buyOrSellTicket = async () => {
    let url;
    let auctionId;
    if (tradingType === "Buy Now") {
      url = `${API.PURCHASEBID}`;
      auctionId = lowestAuctionId.lowestBidAuctionId;
    } else {
      url = `${API.PURCHASEASK}`;
      auctionId = lowestAuctionId.lowestAskAuctionId;
    }
    const token = localStorage.getItem("token");
    const data = { auctionId: auctionId };
    console.log(data);

    try {
      await axios.post(url, data, {
        "Content-Type": "application/json",
        headers: { Authorization: `Bearer ${token}` },
      });
      setOpenTradingSuccessDialog(true);
    } catch (error) {
      console.log(`Error progressing ${tradingType}: `, error);
    }
  };

  const handleDialogClose = () => {
    setSuccess(false);
  };

  return (
    <>
      <StickyNavbar isLoggedIn={isLoggedIn}>
        <div className="my-6 flex justify-center bg-white">
          <Typography variant="h4">Place {type}</Typography>
        </div>
        <div className="flex justify-center bg-gray-100 py-10">
          <div className="w-1/2 rounded-md bg-white p-6">
            <div className="flex justify-start">
              <div className="mr-6 flex justify-center rounded-md bg-gray-100 p-2">
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
            <div className="mt-3 flex flex-col">
              <div className="flex justify-center">
                <div className="flex w-1/2 justify-center border-r-[1px]">
                  <div className="my-5">
                    <Typography>Lowest Bid</Typography>
                    <Typography className="flex justify-center">
                      {lowestBid ? lowestBid.toLocaleString() + " PNP" : "-"}
                    </Typography>
                  </div>
                </div>
                <div className="flex w-1/2 justify-center">
                  <div className="my-5">
                    <Typography>Lowest Ask</Typography>
                    <Typography className="flex justify-center">
                      {lowestAsk ? lowestAsk.toLocaleString() + " PNP" : "-"}
                    </Typography>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-1 rounded-3xl border border-gray-100 bg-gray-50 p-1">
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
            <div className="flex w-full items-center space-x-2">
              {tradingType.includes("Place") ? (
                <input
                  variant="static"
                  type="text"
                  className="w-full border-0 text-right text-lg focus:outline-none focus:ring-0"
                  placeholder="Your Price"
                  value={inputValue}
                  onChange={handleChange}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                />
              ) : (
                <Typography className="w-full border-0 text-right text-lg font-medium focus:outline-none focus:ring-0">
                  {type === "Bid"
                    ? lowestBid.toLocaleString()
                    : lowestAsk.toLocaleString()}
                </Typography>
              )}
              <Typography className="text-lg font-semibold">PNP</Typography>
            </div>
            {tradingType.includes("Place") ? (
              <hr
                className={`mb-6 mt-2 transition-colors duration-200 ${
                  isFocused ? "border-black" : "border-gray-200"
                }`}
              />
            ) : (
              <hr className="mb-6 mt-2 transition-colors duration-200" />
            )}
            <Button
              size="lg"
              className="w-full bg-purple-700 hover:bg-purple-600"
              onClick={() => {
                if (!tradingType.includes("Place")) {
                  buyOrSellTicket();
                } else {
                  placePrice(type);
                }
              }}
              disabled={tradingType.includes("Place") & !inputValue && true}
            >
              <Typography variant="h6" className="!normal-case">
                {tradingType.includes("Place")
                  ? `Place ${type}`
                  : `${type === "Bid" ? "Buy" : "Sell"}`}
              </Typography>
            </Button>
          </div>
        </div>
        <div className="mx-40 mt-6 px-4">
          <FooterWithLogo />
        </div>
      </StickyNavbar>
      {isSuccessDialogOpen ? (
        <CheckoutSuccessDialog
          handler={handleDialogOpen}
          success={isSuccessDialogOpen}
          from={type}
        />
      ) : null}
      {openTradingSuccessDialog ? (
        <CheckoutSuccessDialog
          handler={handleTradingDialogOpen}
          success={openTradingSuccessDialog}
          from={"traded"}
        />
      ) : null}
    </>
  );
};

export default AskAndBidPage;
