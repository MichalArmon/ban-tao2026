import Joi from "joi";

const registerSchema = {
  email: Joi.string().required().email({ tlds: false }),
  password: Joi.string()
    .required()
    .regex(
      /((?=.*\d{1})(?=.*[A-Z]{1})(?=.*[a-z]{1})(?=.*[!@#$%^&*-]{1}).{7,20})/,
    )
    .messages({
      "string.pattern.base": "wrong password format",
    }),
  firstName: Joi.string().min(2).max(10),

  lastName: Joi.string().min(2).max(10),

  phone: Joi.string()
    .regex(/0[0-9]{1,2}-?\s?[0-9]{3}\s?[0-9]{4}/)
    .required()
    .messages({
      "string.pattern.base": "wrong phone format",
    }),
  birthDate: Joi.date().iso().max("now").required().messages({
    "date.format": "wrong date format, use YYYY-MM-DD",
    "date.max": "birth date cannot be in the future",
    "any.required": "birth date is required",
  }),
};

export default registerSchema;
