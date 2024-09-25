import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Button,
  Input,
  Typography,
} from "@material-tailwind/react";
import CheckoutSuccessDialog from "./CheckoutSuccessDialog";
import axios from "axios";
import { API } from "../../config";
import logo from "../../assets/itemizeLogo.png";
import ERC20Contract from "../../contract/ERC20Contract";

export default function CheckoutDialog({ open, handler, project }) {
  const [quantity, setQuantity] = useState(1);
  const [walletAddress, setWalletAddress] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const handleQuantityChange = (e) => setQuantity(e.target.value);
  const handleWalletAddressChange = (e) => setWalletAddress(e.target.value);
  const token = localStorage.getItem("token");

  const getPrKey = () => localStorage.getItem("private_key");
  // const storedPassword = useMemo(() => localStorage.getItem("pw"), []);

  useEffect(() => {
    if (open) {
      axios
        .get(`${API.GETWALLETADDRESS}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          setWalletAddress(response.data.existingWallet.wallet_address);
          console.log(response.data.existingWallet.wallet_address);
        })
        .catch((error) => {
          console.error(
            "There was an error fetching the wallet address!",
            error
          );
        });
    }
  }, [open]);

  const handleSuccessOpen = async () => {
    console.log("handleSuccessOpen");
    const erc20Contract = await ERC20Contract.getInstance();
    console.log("wait for contract");

    const project = await erc20Contract.projects(2); // mapping을 배열처럼 사용
    console.log(project);
    const result = await erc20Contract.buyProject(
      getPrKey(),
      project.projectId,
      project.price
    );
    console.log(result);
    handler();
    setShowSuccess(true);
  };

  return (
    <>
      <Dialog open={open} handler={handler} size="sm" className=" bg-white/90">
        <DialogHeader className="text-center px-10 pt-10">
          <Typography variant="h4">Checkout</Typography>
        </DialogHeader>
        <DialogBody className="px-10 ">
          <div className="flex justify-start w-full">
            <img
              src={project.thumbnail ? project.thumbnail : logo}
              alt="Thumbnail"
              className="h-96 w-full object-contain rounded-md"
            />
          </div>
          <div>
            <Typography variant="h4" className="text-gray-800 mt-2">
              {project.title ? project.title : "Test Product"}
            </Typography>
            <Typography variant="small" className="font-medium text-purple-700">
              by {project.makerName ? project.makerName : "test account"}
            </Typography>
          </div>
          <div className="flex flex-col items-center">
            <div className="text-center"></div>
            <div className="w-full mt-4 flex justify-between">
              <Typography
                variant="paragraph"
                className="text-gray-800 font-semibold"
              >
                Quantity
              </Typography>
              <select
                value={quantity}
                onChange={handleQuantityChange}
                className="border border-gray-300 rounded p-2 h-9"
              >
                {[1, 2, 3, 4, 5].map((q) => (
                  <option key={q} value={q}>
                    {q}
                  </option>
                ))}
              </select>
            </div>
            <div className="w-full flex justify-between items-center mt-2">
              <Typography
                variant="paragraph"
                className="text-gray-800 font-semibold"
              >
                Item Cost
              </Typography>
              <Typography variant="small" color="blue-gray">
                {project.price ? project.price : 99.99} PNP
              </Typography>
            </div>
            <div className="w-full flex justify-between items-center mt-2">
              <Typography
                variant="paragraph"
                className="text-gray-800 font-semibold"
              >
                From
              </Typography>
              <Typography variant="small" color="blue-gray">
                {walletAddress
                  ? walletAddress
                  : "A94A8FE5CCB19BA61C4C0873D391E987982FBBD3"}
              </Typography>
            </div>
            <hr className="mt-2 w-full bg-gray-600"></hr>
            <div className="w-full flex justify-between items-center mt-2">
              <Typography
                variant="paragraph"
                className="text-gray-800 font-semibold"
              >
                Total
              </Typography>
              <Typography variant="small" color="blue-gray">
                {project.price ? quantity * project.price : quantity * 99.99}{" "}
                PNP
              </Typography>
            </div>
          </div>
        </DialogBody>
        <DialogFooter className="flex justify-between pb-10">
          <Button
            variant="text"
            color="red"
            onClick={handler}
            className="mr-1 !normal-case"
          >
            <Typography variant="small" className="font-medium">
              Cancel
            </Typography>
          </Button>
          <Button
            variant="text"
            onClick={handleSuccessOpen}
            className="hover:bg-blue-gray-100"
          >
            <Typography
              variant="small"
              className="font-medium !normal-case text-purple-700"
            >
              Confirm
            </Typography>
          </Button>
        </DialogFooter>
      </Dialog>
      <CheckoutSuccessDialog
        open={showSuccess}
        handler={() => setShowSuccess(false)}
      />
    </>
  );
}
