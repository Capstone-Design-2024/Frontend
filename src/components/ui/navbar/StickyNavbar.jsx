import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import NavbarHeader from "./NavbarHeader";
import WalletModal from "../../wallet/WalletModal";
import { useDispatch } from "react-redux";
import { logoutSuccess } from "../../../actions/authActions";
import { API } from "../../../config";
import axios from "axios";
import ERC20Contract from "../../../contract/ERC20Contract";
import { CategoryBar } from "../CategoryBar";
import { debounce } from "lodash";

export default function StickyNavbar({ children, isLoggedIn }) {
  const [openNav, setOpenNav] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [walletAddress, setWalletAddress] = useState(null);
  const [balance, setBalance] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleOpen = useCallback(() => {
    setOpenModal((cur) => !cur); // Only toggle the modal state here
  }, []);

  useEffect(() => {
    const fetchWalletDetails = async () => {
      if (openModal) {
        try {
          setLoading(true);
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
        } catch (error) {
          console.error("Error fetching data:", error);
          setOpenModal(false); // Close the modal if there's an error
          navigate("/login");
        } finally {
          setLoading(false);
        }
      }
    };

    fetchWalletDetails();
  }, [openModal, navigate]);

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

  const handleSignOut = useCallback(() => {
    localStorage.removeItem("token");
    dispatch(logoutSuccess());
    navigate("/");
  }, [dispatch, navigate]);

  useEffect(() => {
    const handleResize = () => window.innerWidth >= 960 && setOpenNav(false);
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const debouncedNavigate = useCallback(
    debounce((path) => navigate(path), 300),
    [navigate]
  );

  return (
    <div className="grid min-h-[140px] w-full overflow-x-scroll rounded-lg p-6 lg:overflow-visible">
      <div className="-m-6 max-h-screen overflow-scroll">
        <NavbarHeader
          openNav={openNav}
          setOpenNav={setOpenNav}
          handleOpen={handleOpen}
          handleSignOut={handleSignOut}
          isLoggedIn={isLoggedIn}
          debouncedNavigate={debouncedNavigate}
        />
        <CategoryBar />
        {children}
        <WalletModal
          open={openModal}
          handleOpen={handleOpen}
          address={walletAddress}
          initialBalance={balance}
          loading={loading}
        />
      </div>
    </div>
  );
}
