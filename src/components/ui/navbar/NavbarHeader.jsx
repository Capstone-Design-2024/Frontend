import React, { useState, useEffect, useCallback } from "react";
import { Navbar, IconButton, Collapse } from "@material-tailwind/react";
import NavList from "./NavList";
import SearchBar from "./SearchBar";
import AuthButtons from "./AuthButton";
import logoWithName from "../../../assets/LogoWithName.png";

export default function NavbarHeader({
  openNav,
  setOpenNav,
  handleOpen,
  handleSignOut,
  isLoggedIn,
  debouncedNavigate,
}) {
  return (
    <Navbar className="sticky top-0 z-30 h-max max-w-full rounded-none px-4 py-2 lg:px-8 lg:py-4 shadow-none">
      <div className="flex items-center justify-between text-blue-gray-900 lg:mx-40 ">
        <div className="flex">
          <a href="/fe/">
            <img
              src={logoWithName}
              alt="main-logo"
              className="mx-5 min-w-[150px]"
              style={{ width: "150px" }}
            />
          </a>
        </div>
        <SearchBar visibility={false} />
        <div className="flex items-center gap-4">
          <div className="hidden lg:block">
            <NavList />
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
        <div className="mt-4">
          <SearchBar visibility={true} />
        </div>
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
