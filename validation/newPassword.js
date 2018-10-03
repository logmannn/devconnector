const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateNewPasswordInput(data) {
  let errors = {};

  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";

  if (!Validator.isEmail(data.email)) {
    errors.email = "Email is invalid";
  }

  if (Validator.isEmpty(data.email)) {
    errors.email = "Email field is required";
  }

  if (!Validator.isLength(data.email, { min: 2, max: 30 })) {
    errors.email = "Entered email is incorrect";
  }

  if (Validator.isEmpty(data.password)) {
    errors.password = "Password field is required";
  }

  if (!Validator.isLength(data.password, { min: 2, max: 30 })) {
    errors.password = "Password is incorrect";
  }

  data.newpassword = !isEmpty(data.newpassword) ? data.newpassword : "";
  data.confirmNewPassword = !isEmpty(data.confirmNewPassword)
    ? data.confirmNewPassword
    : "";

  if (!Validator.isLength(data.newpassword, { min: 6, max: 30 })) {
    errors.newpassword = "Password must be between 6 and 30 characters";
  }

  if (Validator.isEmpty(data.newpassword)) {
    errors.newpassword = "Password field is required";
  }

  if (Validator.isEmpty(data.confirmNewPassword)) {
    errors.confirmNewPassword = "Confirm Password field is required";
  } else {
    if (!Validator.equals(data.newpassword, data.confirmNewPassword)) {
      errors.confirmNewPassword = "Passwords must match";
    }
  }
  if (!Validator.isLength(data.confirmNewPassword, { min: 6, max: 30 })) {
    errors.confirmNewPassword =
      "Confirm Password field must be between 6 and 30 characters";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
