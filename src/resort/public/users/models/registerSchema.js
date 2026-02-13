import Joi from "joi";

const registerSchema = {
  first: Joi.string().min(2).max(10),
  middle: Joi.string().min(2).max(10).allow(""),
  last: Joi.string().min(2).max(10),

  phone: Joi.string()
    .regex(/0[0-9]{1,2}-?\s?[0-9]{3}\s?[0-9]{4}/)
    .required()
    .messages({
      "string.pattern.base": "wrong phone format",
    }),
  email: Joi.string().required().email({ tlds: false }),
  password: Joi.string()
    .required()
    .regex(
      /((?=.*\d{1})(?=.*[A-Z]{1})(?=.*[a-z]{1})(?=.*[!@#$%^&*-]{1}).{7,20})/,
    )
    .messages({
      "string.pattern.base": "wrong password format",
    }),

  url: Joi.allow(""),
  alt: Joi.allow(""),

  state: Joi.allow(""),
  country: Joi.string().min(2).max(10),
  city: Joi.string().min(2).max(10),
  street: Joi.string().required(),
  houseNumber: Joi.string().required().max(256),
  zip: Joi.string().required().min(2).max(256),

  isBusiness: true,
};

export default registerSchema;
