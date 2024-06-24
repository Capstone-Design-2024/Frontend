import {
  Button,
  Dialog,
  DialogBody,
  Typography,
} from "@material-tailwind/react";
import React from "react";
import NFTTicket from "../ticket/NFTTicket";
import { useNavigate } from "react-router-dom";
import "./SuccessDialog.css";

const SuccessDialog = ({
  isOpen,
  handler,
  project,
  isLoading,
  fromManageProject,
}) => {
  const navigate = useNavigate();
  return (
    <Dialog open={isOpen} handler={handler} size="xs">
      <DialogBody>
        {isLoading ? (
          <div className="flex justify-center items-center">
            <div className="loader"></div>
            <span>Loading...</span>
          </div>
        ) : (
          <div className="flex flex-col items-center">
            <Typography variant="h6" className="text-black">
              Your ticket has been created!
            </Typography>
            <NFTTicket
              project={project}
              fromManageProject={fromManageProject}
            />
            <Button
              className="!normal-case bg-white border border-gray-300 text-gray-700 hover:bg-gray-100"
              onClick={() => navigate("/myprojects")}
            >
              Go My Project
            </Button>
          </div>
        )}
      </DialogBody>
    </Dialog>
  );
};

export default SuccessDialog;
