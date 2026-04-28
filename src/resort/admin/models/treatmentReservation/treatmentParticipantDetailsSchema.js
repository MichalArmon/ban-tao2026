import Joi from "joi";

const treatmentParticipantDetailsSchema = {
  pressureLevels: Joi.string().allow(null, ""),

  focusAreasOptions: Joi.array().items(Joi.string()).default([]),

  medicalConditionsOptions: Joi.string().allow(null, ""),
  extraSpaOptions: Joi.array().items(Joi.string()).default([]),
  status: Joi.string()
    .valid("pending", "confirmed", "cancelled")
    .default("pending")
    .required()
    .messages({
      "any.only": "Status must be pending, confirmed, or cancelled",
      "any.required": "Status is required",
    }),

  specialRequests: Joi.string().allow("").trim(),
};

export default treatmentParticipantDetailsSchema;
