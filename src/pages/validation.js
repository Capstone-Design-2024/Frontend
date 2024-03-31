export const validation = (input, formtype) => {
  switch (formtype) {
    case "firstName":
      return { validity: input.length >= 1 };
    case "lastName":
      return { validity: input.length >= 1 };
    case "email":
      const regex = /^[A-Za-z0-9_\.\-]+@[A-Za-z0-9\-]+\.[A-za-z0-9\-]+/;
      return { validity: regex.test(input) };
    case "confirmPassword":
      return {
        validity:
          input ===
          document.querySelector('input[placeholder="Password"]').value,
      };
    default:
      return false;
  }
};

export const passwordValidation = (input, validationType) => {
  switch (validationType) {
    case "passwordLength":
      return input.length >= 8;
    case "passwordRegex":
      const specialCharRegex = /[!@#\$%\^&\*]/;
      return specialCharRegex.test(input);
  }
};
