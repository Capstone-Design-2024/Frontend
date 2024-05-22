import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import {
  Navbar,
  Collapse,
  Typography,
  Button,
  IconButton,
  Input,
} from "@material-tailwind/react";
import WalletModal from "../wallet/WalletModal";
import mainlogo from "../../assets/itemizeLogo.png";
import logoWithName from "../../assets/LogoWithName.png";
import { useDispatch } from "react-redux";
import { logoutSuccess } from "../../actions/authActions";
import { API } from "../../config";
import axios from "axios";
import ERC20Contract from "../../contract/ERC20Contract";
import { CategoryBar } from "./CategoryBar";

export default function StickyNavbar({ children, isLoggedIn }) {
  const [openNav, setOpenNav] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [walletAddress, setWalletAddress] = useState(null);
  const [balance, setBalance] = useState(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleOpen = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`${API.GETWALLETADDRESS}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const address = response.data.existingWallet.wallet_address;
      setWalletAddress(address);
      await getBalance(address);
      setOpenModal((cur) => !cur);
    } catch (error) {
      console.error("Error fetching data:", error);
      navigate("/login");
    } finally {
    }
  };

  const handleSignOut = () => {
    localStorage.removeItem("token");
    dispatch(logoutSuccess());
    navigate("/");
  };

  useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false)
    );
  }, []);

  const getBalance = useCallback(async (address) => {
    if (!address) {
      console.error("Invalid wallet address");
      return;
    }
    try {
      const erc20Contract = await ERC20Contract.getInstance();
      const result = await erc20Contract.balanceOf(address);
      setBalance(result.toString());
    } catch (error) {
      console.error("Failed to get balance:", error);
    }
  }, []);

  const navContent = ["Account", "Cart", "My Projects"];

  const navList = (
    <ul className="mt-2 mb-4 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
      {navContent.map((content, index) => (
        <Typography
          key={index}
          as="li"
          variant="small"
          color="blue-gray"
          className="p-1 font-normal hover:text-black focus:text-black text-gray-600"
        >
          {content !== "My Projects" ? (
            <a href="#" className="flex items-center">
              {content}
            </a>
          ) : (
            <a href="/projects" className="flex items-center">
              {content}
            </a>
          )}
        </Typography>
      ))}
    </ul>
  );

  return (
    <div className="-m-6 max-h-screen overflow-scroll">
      <Navbar className="sticky top-0 z-30 h-max max-w-full rounded-none px-4 py-2 lg:px-8 lg:py-4 shadow-none">
        <div className="flex items-center justify-between text-blue-gray-900 lg:mx-40 ">
          <div className="flex">
            <a href="/">
              <img
                src={logoWithName}
                alt="main-logo"
                className="mx-5 min-w-10"
                style={{ width: "150px" }}
              />
            </a>
          </div>
          <div className="hidden items-center gap-x-2 lg:flex">
            <div className="relative flex w-full gap-2 md:w-max">
              <Input
                type="search"
                placeholder="Search projects, creators and categories"
                containerProps={{
                  className: "min-w-[288px] w-[650px]",
                }}
                className="pl-9 !border !border-gray-300 bg-white text-gray-900 shadow-lg shadow-gray-900/5 ring-4 ring-transparent placeholder:text-gray-500 placeholder:opacity-100 focus:!border-gray-900 focus:!border-t-gray-900 focus:ring-gray-900/10"
                labelProps={{
                  className: "hidden",
                }}
              />
              <div className="!absolute left-3 top-[13px]">
                <svg
                  width="13"
                  height="14"
                  viewBox="0 0 14 15"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M9.97811 7.95252C10.2126 7.38634 10.3333 6.7795 10.3333 6.16667C10.3333 4.92899 9.84167 3.742 8.9665 2.86683C8.09133 1.99167 6.90434 1.5 5.66667 1.5C4.42899 1.5 3.242 1.99167 2.36683 2.86683C1.49167 3.742 1 4.92899 1 6.16667C1 6.7795 1.12071 7.38634 1.35523 7.95252C1.58975 8.51871 1.93349 9.03316 2.36683 9.4665C2.80018 9.89984 3.31462 10.2436 3.88081 10.4781C4.447 10.7126 5.05383 10.8333 5.66667 10.8333C6.2795 10.8333 6.88634 10.7126 7.45252 10.4781C8.01871 10.2436 8.53316 9.89984 8.9665 9.4665C9.39984 9.03316 9.74358 8.51871 9.97811 7.95252Z"
                    fill="none"
                  />
                  <path
                    d="M13 13.5L9 9.5M10.3333 6.16667C10.3333 6.7795 10.2126 7.38634 9.97811 7.95252C9.74358 8.51871 9.39984 9.03316 8.9665 9.4665C8.53316 9.89984 8.01871 10.2436 7.45252 10.4781C6.88634 10.7126 6.2795 10.8333 5.66667 10.8333C5.05383 10.8333 4.447 10.7126 3.88081 10.4781C3.31462 10.2436 2.80018 9.89984 2.36683 9.4665C1.93349 9.03316 1.58975 8.51871 1.35523 7.95252C1.12071 7.38634 1 6.7795 1 6.16667C1 4.92899 1.49167 3.742 2.36683 2.86683C3.242 1.99167 4.42899 1.5 5.66667 1.5C6.90434 1.5 8.09133 1.99167 8.9665 2.86683C9.84167 3.742 10.3333 4.92899 10.3333 6.16667Z"
                    stroke="#000000"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden lg:block">{navList}</div>
            <div className="flex items-center gap-x-1">
              {isLoggedIn ? (
                <>
                  <Button
                    variant="text"
                    size="md"
                    className="!normal-case hidden lg:inline-block border shadow-lg shadow-gray-900/5"
                    onClick={handleOpen}
                  >
                    <span>Wallet</span>
                  </Button>
                  <Button
                    variant="text"
                    size="md"
                    className="hidden !normal-case lg:inline-block border shadow-lg shadow-gray-900/5"
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
                    className="shadow-lg shadow-gray-900/5 hidden !normal-case lg:inline-block border"
                    onClick={() => navigate("/login")}
                  >
                    <span>Log In</span>
                  </Button>
                  <Button
                    variant="text"
                    size="md"
                    className="hidden !normal-case lg:inline-block border shadow-lg shadow-gray-900/5 "
                    onClick={() => navigate("/signup")}
                  >
                    <span>Sign Up</span>
                  </Button>
                </>
              )}
            </div>
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
          {navList}

          <div className="flex items-center gap-x-1">
            <Button
              fullWidth
              variant="text"
              size="sm"
              className="!normal-case"
              onClick={() => navigate("/login")}
            >
              <span>Log In</span>
            </Button>
            <Button
              fullWidth
              variant="gradient"
              size="sm"
              className="!normal-case"
              onClick={() => navigate("/signup")}
            >
              <span>Sign Up</span>
            </Button>
          </div>
        </Collapse>
      </Navbar>

      {children}
      <WalletModal
        open={openModal}
        handleOpen={handleOpen}
        address={walletAddress}
        initialBalance={balance}
      />
    </div>
  );
}
