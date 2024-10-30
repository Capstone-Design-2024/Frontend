import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../actions/authActions";
import CustomInput from "../components/ui/CustomInput";
import Card from "../components/ui/Card";
import MembershipBg from "../components/ui/MembershipBg";
import axios from "axios";
import { API } from "../config";
import { Button, Typography } from "@material-tailwind/react";

const LogInPage = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [logInErrorMessage, setLogInErrorMessage] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const requiredFields = [
    { type: "email", placeholder: "Email", formType: "email" },
    { type: "password", placeholder: "Password", formType: "password" },
  ];

  const handleInputChange = (e, formType) => {
    e.preventDefault();
    const { value } = e.target;
    setForm((prevForm) => ({ ...prevForm, [formType]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      email: form.email,
      password: form.password,
    };
    try {
      const response = await axios.post(`${API.SIGNIN}`, data, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200) {
        const token = response.data.data.accessToken;
        localStorage.setItem("token", token);
        localStorage.setItem("email", form.email);
        localStorage.setItem("pw", form.password);
        try {
          const walletResponse = await axios.get(`${API.GETWALLETADDRESS}`, {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          });
          console.log(walletResponse);
          dispatch(loginSuccess());
          navigate("/");
        } catch (error) {
          navigate("/createwallet");
          console.error("User doesn't have wallet", error);
        }
      } else {
        console.error("Sign in failed");
      }
    } catch (error) {
      console.error("Error occurred during log in:", error);
      if (error.response.data.statusCode === 404) {
        setLogInErrorMessage("Please enter valid log in information");
        console.log("Please enter valid log in information");
      }
    }
  };
  return (
    <div className="flex justify-between">
      <div className="w-1/2">
        <MembershipBg></MembershipBg>
      </div>
      <div className="flex w-1/2 items-center justify-center">
        <Card
          title={"Log In"}
          width={"w-96"}
          msg={logInErrorMessage && logInErrorMessage}
        >
          {/* {logInErrorMessage && (
            <Typography className="text-md font-normal text-red-700">
              {logInErrorMessage}
            </Typography>
          )} */}
          <form className="space-y-4" onSubmit={handleSubmit}>
            {requiredFields.map((field, index) => (
              <CustomInput
                key={index}
                type={field.type}
                placeholder={field.placeholder}
                value={form.field}
                onChange={(e) => handleInputChange(e, field.formType)}
                page="Log In"
              />
            ))}
            <div className="flex items-center justify-between">
              <div className="text-sm">
                <a href="#" className="text-purple-700 hover:text-purple-600">
                  Forgot your password?
                </a>
              </div>
            </div>
            <div className="shadow-lg">
              <Button
                variant="text"
                type="submit"
                className="text-md w-full rounded-lg bg-purple-700 p-3 font-semibold !normal-case text-white hover:bg-purple-600"
              >
                Log In
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default LogInPage;
