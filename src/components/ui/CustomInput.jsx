import React from "react";
import ExceptionCheck from "../ExceptionCheck";

const CustomInput = ({
  type,
  placeholder,
  onChange,
  validity,
  passwordValidity,
  message,
  page,
}) => {
  return (
    <div className={placeholder === "First Name" ? "mr-2" : undefined}>
      <input
        className={`w-full text-sm  px-4 py-3 bg-gray-200 focus:bg-gray-100 border  border-gray-200 rounded-lg focus:outline-none focus:border-purple-400`}
        type={type}
        placeholder={placeholder}
        onChange={onChange}
      ></input>

      {page !== "Log In" && placeholder === "Password" ? (
        <>
          <ExceptionCheck
            text={"Password must contain at least 8 character"}
            validity={passwordValidity.passwordLength}
          />
          <ExceptionCheck
            text={"Password must contain @, !, #...etc."}
            validity={passwordValidity.passwordRegex}
          />
        </>
      ) : (
        validity === false && (
          <p className="text-sm text-red-600 ml-2 ">{message}</p>
        )
      )}
    </div>
  );
};

export default CustomInput;
