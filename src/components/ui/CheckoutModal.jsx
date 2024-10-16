import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Button,
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
  const [purchaseLoading, setPurchaseLoading] = useState(false); // State to track loading during purchase
  const handleQuantityChange = (e) => setQuantity(e.target.value);
  const token = localStorage.getItem("token");

  const getPrKey = () => localStorage.getItem("private_key");

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
            error,
          );
        });
    }
  }, [open]);

  const handleSuccessOpen = async () => {
    setPurchaseLoading(true); // Set loading to true when purchase starts
    try {
      const erc20Contract = await ERC20Contract.getInstance();
      const projectEntity = await erc20Contract.projects(project.projectId);
      console.log(projectEntity);
      const result = await erc20Contract.buyProject(
        getPrKey(),
        project.projectId,
        project.price,
      );
      console.log(result);
      setShowSuccess(true); // Show the success dialog
    } catch (error) {
      console.error("Error during purchase:", error);
    } finally {
      setPurchaseLoading(false); // Stop loading when the process is done
      handler(); // Close the checkout modal after purchase
    }
  };

  return (
    <>
      <Dialog open={open} handler={handler} size="sm" className="bg-white/90">
        <DialogHeader className="px-10 pt-10 text-center">
          <Typography variant="h4">Checkout</Typography>
        </DialogHeader>
        <DialogBody className="px-10">
          <div className="flex w-full justify-start">
            <img
              src={project.thumbnail ? project.thumbnail : logo}
              alt="Thumbnail"
              className="h-96 w-full rounded-md object-contain"
            />
          </div>
          <div>
            <Typography variant="h4" className="mt-2 text-gray-800">
              {project.title ? project.title : "Test Product"}
            </Typography>
            <Typography variant="small" className="font-medium text-purple-700">
              by {project.makerName ? project.makerName : "test account"}
            </Typography>
          </div>
          <div className="flex flex-col items-center">
            <div className="text-center"></div>
            <div className="mt-4 flex w-full justify-between">
              <Typography
                variant="paragraph"
                className="font-semibold text-gray-800"
              >
                Quantity
              </Typography>
              <select
                value={quantity}
                onChange={handleQuantityChange}
                className="h-9 rounded border border-gray-300 p-2"
              >
                {[1, 2, 3, 4, 5].map((q) => (
                  <option key={q} value={q}>
                    {q}
                  </option>
                ))}
              </select>
            </div>
            <div className="mt-2 flex w-full items-center justify-between">
              <Typography
                variant="paragraph"
                className="font-semibold text-gray-800"
              >
                Item Cost
              </Typography>
              <Typography variant="small" color="blue-gray">
                {project.price ? project.price : 99.99} PNP
              </Typography>
            </div>
            <div className="mt-2 flex w-full items-center justify-between">
              <Typography
                variant="paragraph"
                className="font-semibold text-gray-800"
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
            <div className="mt-2 flex w-full items-center justify-between">
              <Typography
                variant="paragraph"
                className="font-semibold text-gray-800"
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
            disabled={purchaseLoading} // Disable button during loading
          >
            <Typography
              variant="small"
              className="font-medium !normal-case text-purple-700"
            >
              {purchaseLoading ? "Processing..." : "Confirm"}{" "}
            </Typography>
          </Button>
        </DialogFooter>
      </Dialog>

      <CheckoutSuccessDialog
        open={purchaseLoading}
        success={showSuccess}
        handler={() => setShowSuccess(false)}
        loading={purchaseLoading} // Pass loading state
      />
    </>
  );
}
