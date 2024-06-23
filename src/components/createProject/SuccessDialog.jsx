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

const SuccessDialog = ({ isOpen, handler, project, isLoading }) => {
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
            <Typography>Your ticket has been created!</Typography>
            <NFTTicket project={project} />
            <Button
              className="!normal-case"
              onClick={() => navigate("/myprojects")}
            >
              Go my project
            </Button>
          </div>
        )}
      </DialogBody>
    </Dialog>
  );
};

export default SuccessDialog;
