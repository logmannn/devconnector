const Validator = require("validator");
const isEmpty = require("./is-empty");
const isFalseOrEmpty = require("./is-false-or-empty");

module.exports = function validateExperienceInput(data) {
  let errors = {};

  data.title = !isEmpty(data.title) ? data.title : "";
  data.company = !isEmpty(data.company) ? data.company : "";
  data.from = !isEmpty(data.from) ? data.from : "";

  if (Validator.isEmpty(data.title)) {
    errors.title = "Job title field is required";
  }

  if (Validator.isEmpty(data.company)) {
    errors.company = "Company field is required";
  }

  if (Validator.isEmpty(data.from)) {
    errors.from = "From date field is required";
  }

  if (isFalseOrEmpty(data.current) && isFalseOrEmpty(data.to)) {
    errors.current = "Please specify an end date or if current job";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
