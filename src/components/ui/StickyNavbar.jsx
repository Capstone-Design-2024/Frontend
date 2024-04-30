import React, { useState, useEffect } from "react";
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
import { useDispatch } from "react-redux";
import { logoutSuccess } from "../../actions/authActions";
import { API } from "../../config";
import axios from "axios";

export default function StickyNavbar({ children, isLoggedIn }) {
  const [openNav, setOpenNav] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [walletAddress, setWalletAddress] = useState();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleOpen = async () => {
    setOpenModal((cur) => !cur);
    try {
      const token = localStorage.getItem("token");
      const walletAddress = await axios.get(`${API.GETWALLETADDRESS}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      setWalletAddress(walletAddress.data.existingWallet.wallet_address);
    } catch (error) {
      console.error("Error fetching data:", error);
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

  const navContent = ["Account", "Cart"];

  const navList = (
    <ul className="mt-2 mb-4 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
      {navContent.map((content, index) => (
        <Typography
          key={index}
          as="li"
          variant="small"
          color="blue-gray"
          className="p-1 font-normal hover:text-purple-600 focus:text-purple-600"
        >
          <a href="#" className="flex items-center">
            {content}
          </a>
        </Typography>
      ))}
    </ul>
  );

  return (
    <div className="-m-6 max-h-screen w-[calc(100%+48px)] overflow-scroll">
      <Navbar className="sticky top-0 z-10 h-max max-w-full rounded-none px-4 py-2 lg:px-8 lg:py-4">
        <div className="flex items-center justify-between text-blue-gray-900 lg:mx-40 ">
          <div className="flex">
            <a href="/">
              <img
                src={mainlogo}
                alt="main-logo"
                className="mx-5 min-w-20"
                style={{ width: "100px" }}
              />
            </a>
            <div className="hidden items-center gap-x-2 lg:flex">
              <div className="relative flex w-full gap-2 md:w-max">
                <Input
                  type="search"
                  placeholder="Search"
                  containerProps={{
                    className: "min-w-[288px]",
                  }}
                  className=" !border-t-blue-gray-300 pl-9 placeholder:text-blue-gray-300 focus:!border-blue-gray-300"
                  labelProps={{
                    className: "before:content-none after:content-none",
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
                      stroke="#C2C2C2"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </div>
              <Button
                size="md"
                className="rounded-lg bg-purple-700 text-white hover:text-purple-800 hover:bg-transparent border border-purple-800"
              >
                Search
              </Button>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="hidden lg:block">{navList}</div>
            <div className="flex items-center gap-x-1">
              <Button
                variant="text"
                size="md"
                className="hidden lg:inline-block border border-purple-800 hover:bg-purple-700 text-purple-800 hover:text-white"
                onClick={handleOpen}
              >
                <span>Wallet</span>
              </Button>
              {isLoggedIn ? (
                <>
                  <Button
                    variant="text"
                    size="md"
                    className="hidden lg:inline-block border border-purple-800 hover:bg-purple-700 text-purple-800 hover:text-white"
                    onClick={() => navigate("/createProject")}
                  >
                    <span>Create</span>
                  </Button>
                  <Button
                    variant="text"
                    size="md"
                    className="hidden lg:inline-block border border-purple-800 hover:bg-purple-700 text-purple-800 hover:text-white"
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
                    className="hidden lg:inline-block border border-purple-800 hover:bg-purple-700 text-purple-800 hover:text-white"
                    onClick={() => navigate("/login")}
                  >
                    <span>Log In</span>
                  </Button>
                  <Button
                    variant="text"
                    size="md"
                    className="hidden lg:inline-block bg-purple-700 text-white hover:text-purple-800 hover:bg-transparent border border-purple-800"
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
              className=""
              onClick={() => navigate("/login")}
            >
              <span>Log In</span>
            </Button>
            <Button
              fullWidth
              variant="gradient"
              size="sm"
              className=""
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
      />
    </div>
  );
}
