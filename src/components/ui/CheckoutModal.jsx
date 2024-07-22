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
import axios from "axios";
import { API } from "../../config";

export default function CheckoutDialog({ open, handler, project }) {
  const [quantity, setQuantity] = useState(1);
  const [walletAddress, setWalletAddress] = useState("");
  const [loading, setLoading] = useState(false);

  const handleQuantityChange = (e) => setQuantity(e.target.value);
  const handleWalletAddressChange = (e) => setWalletAddress(e.target.value);
  const token = localStorage.getItem("token");

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

  return (
    <Dialog open={open} handler={handler} size="sm" className="p-6 bg-white/90">
      <DialogHeader className="text-center">
        <Typography variant="h4">Checkout</Typography>
      </DialogHeader>
      <DialogBody>
        <div className="flex justify-start w-full">
          <img
            src={project.thumbnail}
            alt="Thumbnail"
            className="h-96 w-full object-cover rounded-md"
          />
        </div>
        <div>
          <Typography variant="h4" className="text-gray-800 mt-2">
            {project.title}
          </Typography>
          <Typography variant="small" className="font-medium text-purple-700">
            by {project.makerName}
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
              {quantity * project.price} PNP
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
              {walletAddress}
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
              {quantity * project.price} PNP
            </Typography>
          </div>
        </div>
      </DialogBody>
      <DialogFooter className="flex justify-between">
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
          onClick={handler}
          className="hover:bg-blue-gray-50"
        >
          <Typography
            variant="small"
            className="font-medium !normal-case text-black"
          >
            Confirm
          </Typography>
        </Button>
      </DialogFooter>
    </Dialog>
  );
}
