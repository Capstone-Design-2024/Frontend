import React, { useEffect, useState } from "react";
import MainPage from "./pages/MainPage";
import LogInPage from "./pages/LogInPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignUpPage from "./pages/SignUpPage";
import WalletCreationPage from "./pages/WalletCreationPage";
import { useSelector, useDispatch } from "react-redux";
import { loginSuccess, logoutSuccess } from "./actions/authActions";
import ProjectsPage from "./pages/ProjectsPage";
import SignUpSucceedPage from "./pages/SignUpSucceedPage";
import ManageProject from "./components/project/ManageProject";
import ProjectDetailPage from "./pages/ProjectDetailPage";
import BillingPage from "./pages/BillingPage";
import CartPage from "./pages/CartPage";

const Router = () => {
  const [loading, setLoading] = useState(true);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      dispatch(loginSuccess());
    } else {
      dispatch(logoutSuccess());
    }
    setLoading(false);
  }, [dispatch]);

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/fe/" element={<MainPage isLoggedIn={isLoggedIn} />} />
        <Route path="/fe/login" element={<LogInPage />} />
        <Route path="/fe/signup" element={<SignUpPage />} />
        <Route path="/fe/signupsucceed" element={<SignUpSucceedPage />} />
        <Route
          path="/fe/myprojects"
          element={<ProjectsPage isLoggedIn={isLoggedIn} />}
        />
        <Route
          path="/fe/createproject/:projectId"
          element={<ManageProject />}
        />
        <Route path="/fe/createwallet" element={<WalletCreationPage />} />
        <Route
          path="/fe/detail"
          element={<ProjectDetailPage isLoggedIn={isLoggedIn} />}
        />
        <Route path="/fe/billing" element={<BillingPage />} />
        <Route path="/fe/cart" element={<CartPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
