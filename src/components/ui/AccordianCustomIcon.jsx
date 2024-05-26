import React, { useState } from "react";
import {
  Accordion,
  AccordionHeader,
  AccordionBody,
  List,
  ListItem,
} from "@material-tailwind/react";
import category from "../createProject/projectCategory";

function Icon({ id, open }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={2}
      stroke="currentColor"
      className={`${
        id === open ? "rotate-180" : ""
      } h-5 w-5 transition-transform`}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M19.5 8.25l-7.5 7.5-7.5-7.5"
      />
    </svg>
  );
}

export default function AccordionCustomIcon({ setCategory }) {
  const [open, setOpen] = useState(0);

  const handleOpen = (value) => setOpen(open === value ? 0 : value);

  return (
    <>
      {category.map((title, index) => (
        <Accordion
          key={index}
          open={open === index + 1}
          icon={<Icon id={index + 1} open={open} />}
        >
          <AccordionHeader
            onClick={() => handleOpen(index + 1)}
            className={`px-4 ${index === category.length - 1 && "border-b-0"}`}
          >
            {Object.keys(title)}
          </AccordionHeader>
          {Object.values(title).map((item, pos) => (
            <AccordionBody className="px-4 bg-gray-50" key={pos}>
              <List>
                {item.map((cat, tmp) => (
                  <ListItem
                    key={tmp}
                    onClick={() =>
                      setCategory(`${Object.keys(title)} > ${cat}`)
                    }
                  >
                    {cat}
                  </ListItem>
                ))}
              </List>
            </AccordionBody>
          ))}
        </Accordion>
      ))}
    </>
  );
}
