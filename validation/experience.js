const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateExperienceInput(data) {
  let errors = {};

  data.company = !isEmpty(data.company) ? data.company : "";
  data.title = !isEmpty(data.title) ? data.title : "";
  data.from = !isEmpty(data.from) ? data.from : "";

  let [title, company, location, from, to, description, current] = [];
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

  if (Validator.isEmpty(data.title)) {
    title = "Job title field is required";
  }
  if (!Validator.isLength(data.title, { max: 100 })) {
    title = "Title field must be less than 100 characters";
  }

  if (Validator.isEmpty(data.company)) {
    company = "Company field is required";
  }
  if (!Validator.isLength(data.company, { max: 100 })) {
    company = "Company field must be less than 100 characters";
  }

  if (!Validator.isLength(data.location, { max: 100 })) {
    location = "Location field must be less than 100 characters";
  }

  if (Validator.isEmpty(data.from)) {
    from = "From date field is required";
  }

  if (!Validator.isLength(data.description, { max: 100 })) {
    description = "Description field must be less than 100 characters";
  }

  if (id) {
    if (title || company || location || from || to || description || current) {
      errors = {
        [id]: {
          title,
          company,
          location,
          from,
          to,
          description,
          current
        }
      };
    }
  } else {
    if (title || company || location || from || to || description || current) {
      errors = {
        title,
        company,
        location,
        from,
        to,
        description,
        current
      };
    }
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
