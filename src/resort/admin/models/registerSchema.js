import Joi from "joi";

const registerSchema = {
  firstName: Joi.string().required().min(2).messages({
    "string.min": "First name must be at least 2 characters long",
    "any.required": "First name is required",
    "string.empty": "First name cannot be empty",
  }),
  lastName: Joi.string().required().min(2).messages({
    "string.min": "Last name must be at least 2 characters long",
    "any.required": "Last name is required",
    "string.empty": "Last name cannot be empty",
  }),
  email: Joi.string()
    .required()
    .email({ tlds: { allow: false } })
    .messages({
      "string.email": "Please enter a valid email address",
      "any.required": "Email is required",
      "string.empty": "Email cannot be empty",
    }),
  password: Joi.string().required().min(6).messages({
    "string.min": "Password must be at least 6 characters long",
    "any.required": "Password is required",
    "string.empty": "Password cannot be empty",
  }),
  phone: Joi.string().required().min(9).max(15).messages({
    "string.min": "Please enter a valid phone number",
    "string.max": "Phone number is too long",
    "any.required": "Phone number is required",
    "string.empty": "Phone number cannot be empty",
  }),

  dietaryRestrictions: Joi.string().optional().allow("").messages({
    "string.base": "Dietary restrictions must be a text",
  }),
  birthDate: Joi.date().required(),
};

export default registerSchema;
