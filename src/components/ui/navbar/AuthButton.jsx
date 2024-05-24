import React from "react";
import { Button } from "@material-tailwind/react";

export default function AuthButtons({
  isLoggedIn,
  handleOpen,
  handleSignOut,
  debouncedNavigate,
  isMobile = false,
}) {
  return (
    <div
      className={`flex items-center gap-x-1 ${
        isMobile ? "w-full flex-col gap-y-2" : "gap-4"
      }`}
    >
      {isLoggedIn ? (
        <>
          <Button
            variant="text"
            size="md"
            className={`!normal-case lg:inline-block border shadow-lg shadow-gray-900/5 ${
              isMobile ? "w-full" : "hidden"
            }`}
            onClick={handleOpen}
          >
            <span>Wallet</span>
          </Button>
          <Button
            variant="text"
            size="md"
            className={`!normal-case lg:inline-block border shadow-lg shadow-gray-900/5 ${
              isMobile ? "w-full" : "hidden"
            }`}
            onClick={handleSignOut}
          >
            <span>Sign Out</span>
          </Button>
        </>
      ) : (
        <>
          <Button
            variant="text"
            size="md"
            className={`shadow-lg shadow-gray-900/5 lg:inline-block border ${
              isMobile ? "w-full" : "hidden"
            }`}
            onClick={() => debouncedNavigate("/login")}
          >
            <span>Log In</span>
          </Button>
          <Button
            variant="text"
            size="md"
            className={`lg:inline-block border shadow-lg shadow-gray-900/5 ${
              isMobile ? "w-full" : "hidden"
            }`}
            onClick={() => debouncedNavigate("/signup")}
          >
            <span>Sign Up</span>
          </Button>
        </>
      )}
    </div>
  );
}
