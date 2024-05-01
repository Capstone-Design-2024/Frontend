import {
  Dialog,
  DialogHeader,
  IconButton,
  Typography,
} from "@material-tailwind/react";
import React from "react";
import AccordionCustomIcon from "../ui/AccordianCustomIcon";

const ProjectCategory = ({ open, handler }) => {
  return (
    <Dialog open={open} handler={handler} size="md">
      <DialogHeader className="justify-between">
        <Typography variant="h4">Project Category</Typography>
        <IconButton
          color="blue-gray"
          size="sm"
          variant="text"
          onClick={handler}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="black"
            strokeWidth={2}
            className="h-7 w-7"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </IconButton>
      </DialogHeader>
      <AccordionCustomIcon />
    </Dialog>
  );
};

export default ProjectCategory;
