const validate = (value) => {
  const errors = {};
  const regex =
    /^[-!#$%&'*+0-9=?A-Z^_a-z{|}~](\.?[-!#$%&'*+0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/;
  if (!value.fullName) {
    errors.fullName = "Name is required";
  }
  if (!value.email) {
    errors.email = "Email is required";
  } else if (!regex.test(value.email)) {
    errors.email = "Invalid format";
  }
  if (!value.message) {
    errors.message = "Message is required";
  }
  return errors;
};

export default validate;
