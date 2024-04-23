import React from "react";
import {
  Input,
  DialogHeader,
  DialogBody,
  Typography,
  Button,
} from "@material-tailwind/react";

const WalletSwap = ({ setPage }) => {
  return (
    <>
      <DialogHeader className="p-3">
        <Input color="white" label="Account" size="lg" />
      </DialogHeader>
      <DialogBody className="p-3">
        <div>
          <div className="flex justify-between rounded-md border border-white p-3 mb-2">
            <Typography variant="h6">Asset</Typography>
            <Typography variant="h6">1232134</Typography>
          </div>
          <div className="flex justify-between rounded-md border border-white p-3 mb-2">
            <Typography variant="h6">Network</Typography>
            <Typography variant="h6">1232134</Typography>
          </div>
          <div className="flex justify-between rounded-md border border-white p-3 mb-2">
            <Typography variant="h6">Send</Typography>
            <Typography variant="h6">1232134</Typography>
          </div>
          <div className="flex justify-between rounded-md border border-white p-3 mb-2">
            <Typography variant="h6">Estimated Fee</Typography>
            <Typography variant="h6">1232134</Typography>
          </div>
        </div>
      </DialogBody>
      <div className="flex justify-between p-3 ">
        <Button
          onClick={() => setPage(0)}
          className="rounded-md border border-white bg-transparent hover:bg-white hover:text-purple-700"
          size="md"
        >
          Back
        </Button>
        <Button
          className="bg-white rounded-md text-purple-700 border border-white"
          size="md"
        >
          Confirm
        </Button>
      </div>
    </>
  );
};

export default WalletSwap;
