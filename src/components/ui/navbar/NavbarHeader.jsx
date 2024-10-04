import React from "react";
import {
  Navbar,
  IconButton,
  Collapse,
  Typography,
} from "@material-tailwind/react";
import NavList from "./NavList";
import SearchBar from "./SearchBar";
import AuthButtons from "./AuthButton";
import logo from "../../../assets/itemizeLogo.png";

export default function NavbarHeader({
  openNav,
  setOpenNav,
  handleOpen,
  handleSignOut,
  isLoggedIn,
  debouncedNavigate,
}) {
  return (
    <Navbar className="sticky top-0 z-30 h-max max-w-full rounded-none !bg-white px-6 py-2 shadow-none lg:px-4 lg:py-4">
      <div className="flex items-center justify-between gap-x-10 text-blue-gray-900 lg:mx-64">
        <div
          className={`${isLoggedIn ? "w-1/2" : "w-7/12"} flex items-center justify-start space-x-10`}
        >
          <a
            href="/"
            className="mr-5 flex items-center justify-start space-x-4"
          >
            <img src={logo} className="h-8 w-8" />
            <Typography className="font-ubuntu mr-8 text-2xl font-bold">
              itemize
            </Typography>
          </a>
          <SearchBar visibility={false} />
        </div>
        <div className="flex items-center gap-5">
          <div className="hidden lg:block">
            <NavList isLoggedIn={isLoggedIn} />
          </div>
          <AuthButtons
            isLoggedIn={isLoggedIn}
            handleOpen={handleOpen}
            handleSignOut={handleSignOut}
            debouncedNavigate={debouncedNavigate}
          />
          <IconButton
            variant="text"
            className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
            ripple={false}
            onClick={() => setOpenNav(!openNav)}
          >
            {openNav ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                className="h-6 w-6"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </IconButton>
        </div>
      </div>
      <Collapse open={openNav}>
        <div className="flex justify-center">
          <NavList />
        </div>
        <AuthButtons
          isLoggedIn={isLoggedIn}
          handleOpen={handleOpen}
          handleSignOut={handleSignOut}
          debouncedNavigate={debouncedNavigate}
          isMobile
        />
      </Collapse>
    </Navbar>
  );
}
