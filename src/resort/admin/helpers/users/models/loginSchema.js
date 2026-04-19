import Joi from "joi";

const logInSchema = {
  email: Joi.string().required().email({ tlds: false }),
  password: Joi.string()
    .required()
    .min(7) // במקום ה-Regex, פשוט דורשים לפחות 7 תווים
    .messages({
      "string.min": "הסיסמה חייבת להכיל לפחות 7 תווים",
    }),
};

export default logInSchema;
