import React, { useEffect, useState } from "react";
import MainPage from "./pages/MainPage";
import LogInPage from "./pages/LogInPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignUpPage from "./pages/SignUpPage";
import WalletCreationPage from "./pages/WalletCreationPage";
import { useSelector, useDispatch } from "react-redux";
import { loginSuccess, logoutSuccess } from "./actions/authActions";
import MyProjectsPage from "./pages/MyProjectsPage";
import SignUpSucceedPage from "./pages/SignUpSucceedPage";
import ManageProject from "./components/createProject/ManageProject";
import ProjectDetailPage from "./pages/ProjectDetailPage";
import CartPage from "./pages/CartPage";
import ProjectsListPage from "./pages/ProjectsListPage";
import TicketTransactionPage from "./pages/TicketTransactionPage";
import AskAndBidPage from "./pages/AskAndBidPage";

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
        <Route path="/" element={<MainPage isLoggedIn={isLoggedIn} />} />
        <Route path="/login" element={<LogInPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/signupsucceed" element={<SignUpSucceedPage />} />
        <Route
          path="/myprojects"
          element={<MyProjectsPage isLoggedIn={isLoggedIn} />}
        />
        <Route path="/createproject/:projectId" element={<ManageProject />} />
        <Route path="/createwallet" element={<WalletCreationPage />} />
        <Route
          path="/detail/:projectId"
          element={<ProjectDetailPage isLoggedIn={isLoggedIn} />}
        />
        <Route path="/cart" element={<CartPage isLoggedIn={isLoggedIn} />} />
        <Route
          path="/projectslist"
          element={<ProjectsListPage isLoggedIn={isLoggedIn} />}
        />
        <Route
          path="/ticket/:projectId"
          element={<TicketTransactionPage isLoggedIn={isLoggedIn} />}
        />
        <Route
          path="/ask/:projectId"
          element={<AskAndBidPage isLoggedIn={isLoggedIn} />}
        />
        <Route
          path="/bid/:projectId"
          element={<AskAndBidPage isLoggedIn={isLoggedIn} />}
        />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
