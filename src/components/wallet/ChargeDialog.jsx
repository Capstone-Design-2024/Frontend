import React from "react";
import {
  Dialog,
  DialogHeader,
  DialogBody,
  Spinner,
} from "@material-tailwind/react";

const ChargeDialog = ({
  open,
  handleDialogToggle,
  chargeBalance,
  loading,
  freeChargeLeft,
}) => (
  <Dialog open={open} handler={() => handleDialogToggle("open")} size="xs">
    <DialogHeader className="p-2 justify-center">
      Do you want to get token?
    </DialogHeader>
    <div className="flex justify-center">
      <DialogBody className="p-2">
        <p className="justify-center px-2">
          {loading ? "Charging..." : `Free charge left: ${freeChargeLeft}`}
        </p>
        <div className="flex space-x-2 justify-center">
          {loading ? (
            <div className="mt-2">
              <Spinner color="purple" className="h-10 w-10" />
            </div>
          ) : (
            <>
              <button
                className="bg-purple-700 hover:bg-purple-500 rounded-lg px-3 text-white text-sm w-16 h-10"
                onClick={chargeBalance}
              >
                Yes
              </button>
              <button
                className="bg-purple-700 hover:bg-purple-500 rounded-lg px-3 text-white text-sm w-16 h-10"
                onClick={() => handleDialogToggle("open")}
              >
                Cancel
              </button>
            </>
          )}
        </div>
      </DialogBody>
    </div>
  </Dialog>
);

export default ChargeDialog;
