import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../actions/authActions";
import CustomInput from "../components/ui/CustomInput";
import Card from "../components/ui/Card";
import MembershipBg from "../components/ui/MembershipBg";
import axios from "axios";
import { API } from "../config";

const LogInPage = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
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
        localStorage.setItem("pw", form.password);
        console.log(localStorage.getItem("pw"));
        try {
          const walletResponse = await axios.get(`${API.GETWALLETADDRESS}`, {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          });
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
      console.error("Error occurred during sign in:", error);
    }
  };
  return (
    <MembershipBg type={"Log In"}>
      <Card title={"Log In"} width={"w-96"}>
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
            <div className="text-sm ">
              <a href="#" className="text-purple-700 hover:text-purple-600">
                Forgot your password?
              </a>
            </div>
          </div>
          <div>
            <button
              type="submit"
              className="w-full flex justify-center bg-purple-800  hover:bg-purple-700 text-gray-100 p-3  rounded-lg tracking-wide font-semibold  cursor-pointer transition ease-in duration-500"
            >
              Log In
            </button>
          </div>
        </form>
      </Card>
    </MembershipBg>
  );
};

export default LogInPage;
