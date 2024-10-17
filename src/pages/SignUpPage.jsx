import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CustomInput from "../components/ui/CustomInput";
import Card from "../components/ui/Card";
import MembershipBg from "../components/ui/MembershipBg";
import { validation, passwordValidation } from "./validation";
import { API } from "../config.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

const SignUpPage = () => {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    address: "",
    agreeTerm: false,
  });

  const [formValidity, setFormValidity] = useState({
    firstName: undefined,
    lastName: undefined,
    email: undefined,
    password: undefined,
    confirmPassword: undefined,
    agreeTerm: undefined,
  });

  const [passwordValidity, setPasswordValidity] = useState({
    passwordLength: false,
    passwordRegex: false,
  });

  const [isButtonActive, setIsButtonActive] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorFeedback, setErrorFeedback] = useState("");

  const requiredFields = [
    { type: "email", placeholder: "Email", formType: "email" },
    { type: "password", placeholder: "Password", formType: "password" },
    {
      type: "password",
      placeholder: "Confirm Password",
      formType: "confirmPassword",
    },
  ];
  const firstLastName = [
    { type: "text", placeholder: "First Name", formType: "firstName" },
    { type: "text", placeholder: "Last Name", formType: "lastName" },
  ];

  const handleInputChange = (e, formType) => {
    e.preventDefault();
    const { value } = e.target;
    setForm((prevForm) => ({ ...prevForm, [formType]: value }));
    setErrorFeedback("");

    if (formType === "password") {
      const newPasswordValidity = {
        passwordLength: passwordValidation(value, "passwordLength"),
        passwordRegex: passwordValidation(value, "passwordRegex"),
      };
      setPasswordValidity(newPasswordValidity);

      setFormValidity((prevValidity) => ({
        ...prevValidity,
        password:
          newPasswordValidity.passwordLength &&
          newPasswordValidity.passwordRegex,
      }));
    } else {
      setFormValidity((prevValidity) => ({
        ...prevValidity,
        [formType]: validation(value, formType).validity,
      }));
    }
  };

  useEffect(() => {
    setIsButtonActive(
      formValidity.firstName &&
        formValidity.lastName &&
        formValidity.email &&
        formValidity.password &&
        form.confirmPassword === form.password &&
        formValidity.agreeTerm,
    );
  }, [formValidity, form.confirmPassword, form.password]);

  const handleCheckboxChange = (e) => {
    const { checked } = e.target;
    setForm((prevForm) => ({ ...prevForm, agreeTerm: checked }));
    setFormValidity((prevValidity) => ({
      ...prevValidity,
      agreeTerm: checked,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isButtonActive) return;
    setIsLoading(true);
    setErrorFeedback("");
    try {
      const response = await fetch(`${API.SIGNUP}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: form.email,
          password: form.password,
          role: "USER",
          name: form.lastName + form.firstName,
          address: form.address,
        }),
      });
      console.log("signup", response);
      const data = await response.json();
      if (response.ok) {
        console.log("Success:", data);
        navigate("/signupsucceed");
      } else {
        console.error("Error:", data);
        setErrorFeedback(
          data.message || "An error occurred. Please try again.",
        );
      }
    } catch (error) {
      console.error("Error:", error);
      setErrorFeedback("A network error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const navigate = useNavigate();

  return (
    <div className="flex justify-between">
      <div className="w-1/2">
        <MembershipBg />
      </div>
      <div className="flex w-1/2 items-center justify-center">
        <Card title={"Sign Up"}>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex justify-between">
              {firstLastName.map((name) => (
                <div className="w-1/2" key={name.placeholder}>
                  <CustomInput
                    type={name.type}
                    placeholder={name.placeholder}
                    value={form.name}
                    onChange={(e) => handleInputChange(e, name.formType)}
                    validity={formValidity[name.formType]}
                    message={
                      formValidity[name.formType]
                        ? ""
                        : `Invalid ${name.placeholder}.`
                    }
                  />
                </div>
              ))}
            </div>
            {requiredFields.map((field) => (
              <CustomInput
                key={field.placeholder}
                type={field.type}
                placeholder={field.placeholder}
                value={form.field}
                onChange={(e) => handleInputChange(e, field.formType)}
                validity={formValidity[field.formType]}
                passwordValidity={
                  field.formType === "password" ? passwordValidity : undefined
                }
                message={
                  formValidity[field.formType]
                    ? ""
                    : field.formType === "confirmPassword"
                      ? "Please provide same input as your password"
                      : `Please provide valid ${field.placeholder.toLowerCase()}.`
                }
              />
            ))}
            <CustomInput
              type="text"
              placeholder="Address (Optional)"
              value={form.address}
              onChange={(e) => handleInputChange(e, "address")}
            />
            <div className="mt-2 flex items-center">
              <input
                type="checkbox"
                id="terms"
                name="terms"
                className="h-4 w-4 rounded border-gray-700 text-purple-600 focus:ring-purple-400"
                checked={form.agreeTerm}
                onChange={handleCheckboxChange}
              />
              <label htmlFor="terms" className="ml-2 text-sm text-gray-700">
                I agree to the terms and conditions
              </label>
            </div>
            {errorFeedback && (
              <div className="mt-2 text-center text-sm text-red-600">
                {errorFeedback}
              </div>
            )}
            <div>
              <button
                type="submit"
                className={`flex w-full justify-center ${
                  isButtonActive
                    ? "bg-purple-800 text-gray-100 hover:bg-purple-700"
                    : "bg-purple-300 text-gray-100"
                } rounded-lg p-3 font-semibold tracking-wide transition duration-500 ease-in ${
                  isLoading ? "cursor-not-allowed opacity-50" : ""
                }`}
                disabled={!isButtonActive || isLoading}
              >
                {isLoading ? (
                  <>
                    <FontAwesomeIcon icon={faSpinner} spin className="mr-2" />{" "}
                    Loading...
                  </>
                ) : (
                  "Continue to sign up"
                )}
              </button>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default SignUpPage;
