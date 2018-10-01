const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateExperienceInput(data) {
  let errors = {};

  data.school = !isEmpty(data.school) ? data.school : "";
  data.degree = !isEmpty(data.degree) ? data.degree : "";
  data.from = !isEmpty(data.from) ? data.from : "";

  let [
    degree,
    school,
    newlocation,
    from,
    to,
    description,
    current,
    fieldofstudy
  ] = [];
  let id = data.id;

  let fromTest = new Date(data.from.replace("T00:00:00.000Z", ""));

  if (data.to) {
    let toTest = new Date(data.to.replace("T00:00:00.000Z", ""));

    if (!data.current) {
      if (fromTest > toTest) {
        to = "From field must be before To field";
      }
      if (toTest > new Date()) {
        to = "To field must not be in the future";
      }
    }
  }

  if (fromTest > new Date()) {
    from = "From field must not be in the future";
  }

  if (Validator.isEmpty(data.degree)) {
    degree = "Degree field is required";
  }
  if (!Validator.isLength(data.degree, { max: 100 })) {
    degree = "Title field must be less than 100 characters";
  }

  if (Validator.isEmpty(data.school)) {
    school = "School field is required";
  }
  if (!Validator.isLength(data.school, { max: 100 })) {
    school = "School field must be less than 100 characters";
  }

  if (!Validator.isLength(data.newlocation, { max: 100 })) {
    newlocation = "Location field must be less than 100 characters";
  }

  if (!Validator.isLength(data.newlocation, { max: 100 })) {
    fieldofstudy = "Field of Study field must be less than 100 characters";
  }

  if (Validator.isEmpty(data.from)) {
    from = "From date field is required";
  }

  if (!Validator.isLength(data.description, { max: 100 })) {
    description = "Description field must be less than 100 characters";
  }

  if (id) {
    if (
      degree ||
      school ||
      newlocation ||
      from ||
      to ||
      description ||
      current ||
      fieldofstudy
    ) {
      errors = {
        [id]: {
          degree,
          school,
          newlocation,
          from,
          to,
          description,
          current,
          fieldofstudy
        }
      };
    }
  } else {
    if (
      degree ||
      school ||
      newlocation ||
      from ||
      to ||
      description ||
      current ||
      fieldofstudy
    ) {
      errors = {
        degree,
        school,
        newlocation,
        from,
        to,
        description,
        current,
        fieldofstudy
      };
    }
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
