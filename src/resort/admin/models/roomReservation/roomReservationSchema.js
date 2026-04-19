import Joi from "joi";

const roomReservationSchema = {
  // --- פרטי החדר והלקוח ---
  roomId: Joi.string().required().messages({
    "string.empty": "Please select a room",
    "any.required": "Room selection is required",
  }),

  userId: Joi.string().required().messages({
    "string.empty": "Please select a user",
    "any.required": "User selection is required",
  }),

  // --- תאריכים והרכב ---
  checkIn: Joi.date().iso().required().messages({
    "date.format": "Please select a valid check-in date",
    "any.required": "Check-in date is required",
  }),

  checkOut: Joi.date().iso().greater(Joi.ref("checkIn")).required().messages({
    "date.greater": "Check-out date must be after check-in date",
    "date.format": "Please select a valid check-out date",
    "any.required": "Check-out date is required",
  }),

  guestsCount: Joi.number().integer().min(1).required().messages({
    "number.base": "Guests count must be a number",
    "number.min": "At least 1 guest is required",
    "any.required": "Guests count is required",
  }),

  // --- סטטוס ותפוגה (לאדמין יש שליטה מלאה על זה) ---
  status: Joi.string()
    .valid("pending", "confirmed", "cancelled")
    .required()
    .messages({
      "any.only": "Status must be pending, confirmed, or cancelled",
      "any.required": "Status is required",
    }),

  expiresAt: Joi.date().iso().optional().messages({
    "date.format": "Expiration date must be a valid date format",
  }),

  // --- התוספות (Extra Preferences) ---
  // עטוף באובייקט כי ככה זה שמור במודל שלך
  extraPreferences: Joi.object({
    mealPlan: Joi.string()
      .valid("Breakfast only", "Half board", "Full board")
      .required()
      .messages({
        "any.only":
          "Meal plan must be Breakfast only, Half board, or Full board",
        "any.required": "Please select a meal plan",
        "string.empty": "Meal plan cannot be empty",
      }),

    rentScooter: Joi.boolean().messages({
      "boolean.base": "Rent a scooter must be a yes/no value",
    }),

    shuttleFromFerry: Joi.boolean().messages({
      "boolean.base": "Shuttle must be a yes/no value",
    }),

    specialRequests: Joi.string().allow("").trim().messages({
      "string.base": "Special requests must be text",
    }),
  }).optional(),
};

export default roomReservationSchema;
