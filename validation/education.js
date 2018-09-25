const Validator = require("validator");
const isEmpty = require("./is-empty");
const isFalseOrEmpty = require("./is-false-or-empty");

module.exports = function validateExperienceInput(data) {
  let errors = {};

  data.school = !isEmpty(data.school) ? data.school : "";
  data.degree = !isEmpty(data.degree) ? data.degree : "";
  data.fieldofstudy = !isEmpty(data.fieldofstudy) ? data.fieldofstudy : "";
  data.from = !isEmpty(data.from) ? data.from : "";

  if (!Validator.isLength(data.school, { max: 100 })) {
    errors.school = "School field must be less than 100 characters";
  }
  if (Validator.isEmpty(data.school)) {
    errors.school = "School field is required";
  }

  if (!Validator.isLength(data.degree, { max: 100 })) {
    errors.degree = "Degree field must be less than 100 characters";
  }
  if (Validator.isEmpty(data.degree)) {
    errors.degree = "Degree field is required";
  }

  if (!Validator.isLength(data.from, { max: 100 })) {
    errors.from = "From field must be less than 100 characters";
  }
  if (Validator.isEmpty(data.from)) {
    errors.from = "From date field is required";
  }

  if (!Validator.isLength(data.fieldofstudy, { max: 100 })) {
    errors.fieldofstudy =
      "Field of study field must be less than 100 characters";
  }
  if (Validator.isEmpty(data.fieldofstudy)) {
    errors.fieldofstudy = "Field of study field is required";
  }

  if (isFalseOrEmpty(data.current) && isFalseOrEmpty(data.to)) {
    errors.current = "Please specify an end date or if current";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
