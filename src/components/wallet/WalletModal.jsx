import { React, useState, useEffect } from "react";
import { Dialog } from "@material-tailwind/react";

import WalletMain from "./WalletMain";
import WalletSwap from "./WalletSwap";

export default function WalletModal({ open, handleOpen }) {
  const [page, setPage] = useState(0);
  useEffect(() => {
    if (open === false) {
      setPage(0);
    }
  }, [open]);

  return (
    <>
      <Dialog
        size="xs"
        open={open}
        handler={handleOpen}
        className="h-3/5 p-4 bg-gradient-to-b from-gray-900 via-gray-900 to-purple-800 min-w-1/2"
      >
        {page === 0 && <WalletMain setPage={setPage} />}
        {page === 1 && <WalletSwap setPage={setPage} />}
      </Dialog>
    </>
  );
}
