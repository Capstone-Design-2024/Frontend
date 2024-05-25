import React from "react";
import {
  Dialog,
  DialogHeader,
  DialogBody,
  Typography,
  IconButton,
  Input,
  Tooltip,
} from "@material-tailwind/react";

const PrivateKeyDialog = ({
  open,
  handleDialogToggle,
  validatePassword,
  showPrivateKey,
  prKey,
  isCopied,
  copyToClipboard,
  password,
  setPassword,
  passwordError,
}) => (
  <Dialog open={open} handler={() => handleDialogToggle("pkOpen")} size="sm">
    <div className="p-4">
      <DialogHeader>
        Please enter your password to see your private key
      </DialogHeader>
      {showPrivateKey && (
        <div className="flex justify-between">
          <div className="px-4">
            <Typography>Your private key is: </Typography>
            <Typography variant="small" className="text-purple-700">
              {prKey}
            </Typography>
          </div>
          <Tooltip
            content={isCopied ? "Copied" : "Copy address"}
            className="z-[10001] bg-purple-700"
          >
            <IconButton
              variant="text"
              onClick={() => copyToClipboard(prKey)}
              onMouseLeave={() => setIsCopied(false)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="#6c2dc7"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 0 1-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 0 1 1.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 0 0-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 0 1-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 0 0-3.375-3.375h-1.5a1.125 1.125 0 0 1-1.125-1.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H9.75"
                />
              </svg>
            </IconButton>
          </Tooltip>
        </div>
      )}
      <div className="p-3">
        <Input
          label="Password"
          type="password"
          size="md"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {passwordError && (
          <Typography variant="small" color="red" className="mt-2">
            {passwordError}
          </Typography>
        )}
      </div>
    </div>
    <div className="flex justify-center">
      <DialogBody className="p-2">
        <div className="flex space-x-2">
          <button
            className="bg-purple-700 hover:bg-purple-500 rounded-lg px-3 text-white text-sm w-16 h-10"
            onClick={validatePassword}
          >
            Show
          </button>
          <button
            className="bg-white hover:bg-red-600 text-red-600 border border-red-600 rounded-lg px-3 hover:text-white text-sm w-16 h-10"
            onClick={() => handleDialogToggle("pkOpen")}
          >
            Cancel
          </button>
        </div>
      </DialogBody>
    </div>
  </Dialog>
);

export default PrivateKeyDialog;
