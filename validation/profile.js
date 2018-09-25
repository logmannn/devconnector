const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateProfileInput(data) {
  let errors = {};

  data.handle = !isEmpty(data.handle) ? data.handle : "";
  data.status = !isEmpty(data.status) ? data.status : "";
  data.skills = !isEmpty(data.skills) ? data.skills : "";

  if (!Validator.isLength(data.handle, { min: 2, max: 40 })) {
    errors.handle = "Handle needs to be between 2 and 40 characters";
  }
  if (Validator.isEmpty(data.handle)) {
    errors.handle = "Profile handle is required";
  }

  if (!Validator.isLength(data.status, { max: 100 })) {
    errors.status = "Status field must be less than 100 characters";
  }
  if (Validator.isEmpty(data.status)) {
    errors.status = "Status field is required";
  }

  if (!Validator.isLength(data.skills, { max: 500 })) {
    errors.skills = "Skills field must be less than 300 characters";
  }
  if (Validator.isEmpty(data.skills)) {
    errors.skills = "Skills field is required";
  }

  if (!Validator.isLength(data.website, { max: 100 })) {
    errors.website = "Website field must be less than 100 characters";
  }
  if (!isEmpty(data.website)) {
    if (!Validator.isURL(data.website)) {
      errors.website = "Not a valid URL";
    }
  }

  if (!Validator.isLength(data.youtube, { max: 100 })) {
    errors.youtube = "Youtube field must be less than 100 characters";
  }
  if (!isEmpty(data.youtube)) {
    if (!Validator.isURL(data.youtube)) {
      errors.youtube = "Not a valid URL";
    }
  }

  if (!Validator.isLength(data.twitter, { max: 100 })) {
    errors.twitter = "Twitter field must be less than 100 characters";
  }
  if (!isEmpty(data.twitter)) {
    if (!Validator.isURL(data.twitter)) {
      errors.twitter = "Not a valid URL";
    }
  }

  if (!Validator.isLength(data.facebook, { max: 100 })) {
    errors.facebook = "Facebook field must be less than 100 characters";
  }
  if (!isEmpty(data.facebook)) {
    if (!Validator.isURL(data.facebook)) {
      errors.facebook = "Not a valid URL";
    }
  }

  if (!Validator.isLength(data.linkedin, { max: 100 })) {
    errors.linkedin = "Linkedin field must be less than 100 characters";
  }
  if (!isEmpty(data.linkedin)) {
    if (!Validator.isURL(data.linkedin)) {
      errors.linkedin = "Not a valid URL";
    }
  }

  if (!Validator.isLength(data.instagram, { max: 100 })) {
    errors.instagram = "Instagram field must be less than 100 characters";
  }
  if (!isEmpty(data.instagram)) {
    if (!Validator.isURL(data.instagram)) {
      errors.instagram = "Not a valid URL";
    }
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
