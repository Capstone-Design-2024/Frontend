import { React, useState, useEffect } from "react";
import { Dialog } from "@material-tailwind/react";

import WalletMain from "./WalletMain";
import WalletSwap from "./WalletSwap";

export default function WalletModal({ open, handleOpen, address }) {
  const [page, setPage] = useState(0);
  useEffect(() => {
    if (open === false) {
      setPage(0);
    }
  }, [open]);

  return (
    <>
      <Dialog
        size="sm"
        open={open}
        handler={handleOpen}
        className="h-3/5 w-[500px] p-4 bg-gradient-to-b from-gray-900 via-gray-900 to-purple-800 z-40"
      >
        {page === 0 && <WalletMain setPage={setPage} address={address} />}
        {page === 1 && <WalletSwap setPage={setPage} />}
      </Dialog>
    </>
  );
}
