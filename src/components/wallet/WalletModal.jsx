import { React, useState, useEffect } from "react";
import { Dialog } from "@material-tailwind/react";

import WalletMain from "./WalletMain";
import WalletSwap from "./WalletSwap";

export default function WalletModal({
  open,
  handleOpen,
  address,
  initialBalance,
}) {
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
        className="h-4/6 w-[500px] bg-white/70 backdrop-blur-lg z-40 shadow-lg"
      >
        {page === 0 && (
          <WalletMain
            setPage={setPage}
            address={address}
            initialBalance={initialBalance}
          />
        )}
        {page === 1 && <WalletSwap setPage={setPage} />}
      </Dialog>
    </>
  );
}
