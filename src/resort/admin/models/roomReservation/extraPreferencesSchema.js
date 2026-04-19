import Joi from "joi";

const extraPreferencesSchema = {
  mealPlan: Joi.string()
    .valid("Breakfast only", "Half board", "Full board")
    .required()
    .messages({
      "any.only": "Meal plan must be Breakfast only, Half board, or Full board",
      "any.required": "Please select a meal plan",
      "string.empty": "Meal plan cannot be empty",
    }),

  rentScooter: Joi.boolean().messages({
    "boolean.base": "Rent a scooter must be a boolean value (true/false)",
  }),

  shuttleFromFerry: Joi.boolean().messages({
    "boolean.base": "Shuttle must be a boolean value (true/false)",
  }),

  specialRequests: Joi.string().allow("").trim().messages({
    "string.base": "Special requests must be text",
  }),
};

export default extraPreferencesSchema;
