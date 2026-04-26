import Joi from "joi";

const participantDetailsSchema = {
  pressureLevels: Joi.string()
    .valid("beginner", "intermediate", "advanced")
    .allow("")
    .messages({
      "any.only": "Level must be beginner, intermediate, or advanced",
      "string.empty": "Level cannot be empty",
    }),

  focusAreasOptions: Joi.string().allow("").trim(),

  medicalConditionsOptions: Joi.array().items(Joi.string().trim()).messages({
    "array.base": "Extras must be an array of strings",
  }),
  extraSpaOptions: Joi.array().items(Joi.string().trim()).messages({
    "array.base": "Extras must be an array of strings",
  }),
  status: Joi.string()
    .valid("pending", "confirmed", "cancelled")
    .default("pending")
    .required()
    .messages({
      "any.only": "Status must be pending, confirmed, or cancelled",
      "any.required": "Status is required",
    }),

  instructorNotes: Joi.string().allow("").trim(),
};

export default participantDetailsSchema;
