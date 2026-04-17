import Joi from "joi";

const participantDetailsSchema = {
  level: Joi.string()
    .valid("beginner", "intermediate", "advanced")
    .allow("")
    .messages({
      "any.only": "Level must be beginner, intermediate, or advanced",
      "string.empty": "Level cannot be empty",
    }),

  goals: Joi.array().items(Joi.string().trim()).messages({
    "array.base": "Goals must be an array of strings",
  }),

  injuriesNotes: Joi.string().allow("").trim(),

  extras: Joi.array().items(Joi.string().trim()).messages({
    "array.base": "Extras must be an array of strings",
  }),

  instructorNotes: Joi.string().allow("").trim(),
};

export default participantDetailsSchema;
