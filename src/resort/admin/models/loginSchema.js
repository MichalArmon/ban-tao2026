import Joi from "joi";
const loginSchema = {
  email: Joi.string()
    .required()
    .email({ tlds: { allow: false } })
    .messages({
      "string.email": "Please enter a valid email address",
      "any.required": "Email is required",
      "string.empty": "Email cannot be empty",
    }),
  password: Joi.string().required().messages({
    "any.required": "Password is required",
    "string.empty": "Password cannot be empty",
  }),
};

export default loginSchema;
