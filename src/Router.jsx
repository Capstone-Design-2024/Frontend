import React from "react";
import MainPage from "./pages/MainPage";
import LogInPage from "./pages/LogInPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignUpPage from "./pages/SignUpPage";
import WalletCreationPage from "./pages/WalletCreationPage";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/login" element={<LogInPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="createwallet" element={<WalletCreationPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
