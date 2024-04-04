import React from "react";
import { useNavigate } from "react-router-dom";
import CustomInput from "../components/ui/CustomInput";
import Card from "../components/ui/Card";
import MembershipBg from "../components/ui/MembershipBg";

const LogInPage = () => {
  const requiredFields = [
    { type: "text", placeholder: "Email" },
    { type: "password", placeholder: "Password" },
  ];
  const navigate = useNavigate();
  return (
    <MembershipBg type={"Log In"}>
      <Card title={"Log In"} width={"w-96"}>
        <form className="space-y-4">
          {requiredFields.map((field, index) => (
            <CustomInput
              key={index}
              type={field.type}
              placeholder={field.placeholder}
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
              onClick={() => navigate("/")}
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
