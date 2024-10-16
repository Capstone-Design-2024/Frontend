import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Button,
  Typography,
} from "@material-tailwind/react";
import { ClipLoader } from "react-spinners"; // Import spinner
import SuccessAnimation from "./animation/SuccessAnimation";

export default function CheckoutSuccessDialog({
  open,
  handler,
  success,
  from,
  loading,
}) {
  const description =
    "Your price was successfully " + (from === "Bid" ? "bided" : "asked");

  return (
    <>
      {loading && (
        <Dialog
          open={loading}
          handler={handler}
          size="xs"
          className="bg-green-50 py-10"
        >
          <div className="flex flex-col items-center justify-center">
            <ClipLoader color="#4A90E2" size={50} />
            <Typography variant="small" className="mt-4 text-gray-800">
              Processing your purchase...
            </Typography>
          </div>
        </Dialog>
      )}{" "}
      {success && (
        <Dialog
          open={success}
          handler={handler}
          size="xs"
          className="bg-green-50 py-10"
        >
          <SuccessAnimation />
          <DialogHeader className="flex justify-center">
            <Typography variant="h4" className="text-purple-600">
              Thank You!
            </Typography>
          </DialogHeader>
          <div className="flex justify-center">
            <Typography variant="paragraph" className="text-gray-800">
              {from
                ? description
                : "Your purchase has been successfully completed."}
            </Typography>
          </div>
          <div className="mx-10 flex justify-center pt-4">
            <Button
              variant="text"
              size="sm"
              className="w-full bg-purple-700 hover:bg-purple-600"
              onClick={handler}
            >
              <Typography
                variant="small"
                className="font-medium !normal-case text-white"
              >
                Ok!
              </Typography>
            </Button>
          </div>
        </Dialog>
      )}
    </>
  );
}
