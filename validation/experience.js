const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateExperienceInput(data) {
  let errors = {};

  data.company = !isEmpty(data.company) ? data.company : "";
  data.title = !isEmpty(data.title) ? data.title : "";
  data.from = !isEmpty(data.from) ? data.from : "";

  if (Validator.isEmpty(data.title)) {
    errors.title = "Job title field is required";
  }
  if (!Validator.isLength(data.title, { max: 100 })) {
    errors.title = "Title field must be less than 100 characters";
  }

  if (Validator.isEmpty(data.company)) {
    errors.company = "Company field is required";
  }
  if (!Validator.isLength(data.company, { max: 100 })) {
    errors.company = "Company field must be less than 100 characters";
  }

  if (!Validator.isLength(data.location, { max: 100 })) {
    errors.location = "Location field must be less than 100 characters";
  }

  if (Validator.isEmpty(data.from)) {
    errors.from = "From date field is required";
  }

  if (!Validator.isLength(data.description, { max: 100 })) {
    errors.description = "Description field must be less than 100 characters";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
