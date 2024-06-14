import { Button, Dialog, DialogBody } from "@material-tailwind/react";
import React from "react";
import NFTTicket from "../ticket/NFTTicket";
import { useNavigate } from "react-router-dom";

const SuccessDialog = ({ isOpen, handler, project }) => {
  const navigate = useNavigate();
  return (
    <Dialog open={isOpen} handler={handler}>
      <DialogBody>
        <div>
          <NFTTicket project={project} />
          <Button onClick={() => navigate("/fe/myprojects")}>
            Go my project
          </Button>
        </div>
      </DialogBody>
    </Dialog>
  );
};

export default SuccessDialog;
