import React from "react";
import {
  Dialog,
  DialogHeader,
  DialogBody,
  Spinner,
  Button,
  Typography,
} from "@material-tailwind/react";

const ChargeDialog = ({
  open,
  handleDialogToggle,
  chargeBalance,
  loading,
  freeChargeLeft,
}) => (
  <Dialog
    open={open}
    handler={() => handleDialogToggle("open")}
    size="xs"
    className="p-4"
  >
    <DialogHeader className="flex justify-center">
      Do you want to charge token?
    </DialogHeader>
    <Typography className="flex justify-center px-2 font-medium text-gray-700">
      {loading ? "Charging..." : `Free charge left: ${freeChargeLeft}`}
    </Typography>
    <DialogBody className="p-2">
      {loading ? (
        <div className="mt-2 flex justify-center">
          <Spinner color="purple" className="h-10 w-10" />
        </div>
      ) : (
        <div className="flex justify-between space-x-2">
          <Button
            className="h-10 w-full rounded-lg bg-purple-700 px-3 text-sm !normal-case text-white hover:bg-purple-500"
            onClick={chargeBalance}
          >
            Yes
          </Button>
          <Button
            className="h-10 w-full rounded-lg bg-purple-700 px-3 text-sm !normal-case text-white hover:bg-purple-500"
            onClick={() => handleDialogToggle("open")}
          >
            No
          </Button>
        </div>
      )}
    </DialogBody>
  </Dialog>
);

export default ChargeDialog;
