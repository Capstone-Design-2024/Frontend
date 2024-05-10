import React from "react";
import {
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";

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

export default function AccordionCustomStyles() {
  const [open, setOpen] = React.useState(1);

  const handleOpen = (value) => setOpen(open === value ? 0 : value);

  return (
    <>
      <Accordion
        open={open === 1}
        icon={<Icon id={1} open={open} />}
        className="mb-2 rounded-lg border border-blue-gray-100 px-4"
      >
        <AccordionHeader
          onClick={() => handleOpen(1)}
          className={`border-b-0 transition-colors text-base ${
            open === 1 ? "text-deep-purple-400 hover:!text-deep-purple-700" : ""
          }`}
        >
          What is Mnemonic phrases?
        </AccordionHeader>
        <AccordionBody className="pt-0 text-base font-normal">
          A mnemonic phrase is a sequence of random words used in cryptocurrency
          wallets and other applications that deal with private keys or
          sensitive data.
        </AccordionBody>
      </Accordion>
      <Accordion
        open={open === 2}
        icon={<Icon id={2} open={open} />}
        className="mb-2 rounded-lg border border-blue-gray-100 px-4"
      >
        <AccordionHeader
          onClick={() => handleOpen(2)}
          className={`border-b-0 transition-colors text-base ${
            open === 2 ? "text-deep-purple-400 hover:!text-deep-purple-700" : ""
          }`}
        >
          Why should Mnemonic phrase be kept safe?
        </AccordionHeader>
        <AccordionBody className="pt-0 text-base  font-normal">
          The mnemonic phrase (seed words) must be kept safe because it acts as
          the master key to access and control the cryptocurrency funds stored
          in the associated wallet.
        </AccordionBody>
      </Accordion>
      <Accordion
        open={open === 3}
        icon={<Icon id={3} open={open} />}
        className="rounded-lg border border-blue-gray-100 px-4"
      >
        <AccordionHeader
          onClick={() => handleOpen(3)}
          className={`border-b-0 transition-colors text-base ${
            open === 3 ? "text-deep-purple-400 hover:!text-deep-purple-700" : ""
          }`}
        >
          How to keep mnemonic phrases safe?
        </AccordionHeader>
        <AccordionBody className="pt-0 text-base font-normal">
          Here are some recommended ways to securely keep and store your
          mnemonic phrase:
          <ol>
            <li>1. Write it down manually</li>
            <li>2. Memorize the phrase</li>
          </ol>
        </AccordionBody>
      </Accordion>
    </>
  );
}
