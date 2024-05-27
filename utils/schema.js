const yup = require("yup");

const password_regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]+$/;

const registerSchema = yup.object({
  username: yup
    .string()
    .min(4, "Username must be at least 4 characters")
    .required("Username is required."),
  email: yup.string().email("Invalid email").required("Email is required."),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .matches(
      password_regex,
      "Password must contain at least one uppercase letter, one lowercase letter, and one number."
    )
    .required("Password is required."),
});

const loginSchema = yup.object({
  email: yup.string().email("Invalid email").required("Email is required."),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .matches(
      password_regex,
      "Password must contain at least one uppercase letter, one lowercase letter, and one number."
    )
    .required("Password is required."),
});

module.exports = { registerSchema, loginSchema };
