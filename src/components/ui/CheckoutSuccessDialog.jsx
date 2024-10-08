import React from "react";
import {
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Button,
  Typography,
} from "@material-tailwind/react";
import SuccessAnimation from "./animation/SuccessAnimation";

export default function CheckoutSuccessDialog({ open, handler, from }) {
  const description =
    "Your price was successfully " + (from === "Bid" ? "bided" : "asked");
  return (
    <Dialog
      open={open}
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
  );
}
