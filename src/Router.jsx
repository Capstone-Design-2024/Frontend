import React, { useEffect, useState } from "react";
import MainPage from "./pages/MainPage";
import LogInPage from "./pages/LogInPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignUpPage from "./pages/SignUpPage";
import WalletCreationPage from "./pages/WalletCreationPage";
import { useSelector, useDispatch } from "react-redux";
import { loginSuccess, logoutSuccess } from "./actions/authActions";
import CreateProjectPage from "./pages/CreateProjectPage";
import ProjectsPage from "./pages/ProjectsPage";
import SignUpSucceedPage from "./pages/SignUpSucceedPage";

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
          path="/projects"
          element={<ProjectsPage isLoggedIn={isLoggedIn} />}
        />
        <Route path="/createProject" element={<CreateProjectPage />} />
        <Route path="/createwallet" element={<WalletCreationPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
