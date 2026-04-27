import Joi from "joi";

const treatmentReservationValidationSchema = {
  // שדות חובה - אי אפשר לשלוח את הטופס בלעדיהם
  userId: Joi.string().required().messages({
    "string.empty": "חובה להזין מזהה משתמש",
    "any.required": "שדה משתמש הוא שדה חובה",
  }),

  treatmentId: Joi.string().required().messages({
    "string.empty": "חובה להזין מזהה סשן",
    "any.required": "שדה סשן הוא שדה חובה",
  }),
  guestsCount: Joi.number().integer().min(1).required().messages({
    "number.base": "Guests count must be a number",
    "number.min": "At least 1 guest is required",
    "any.required": "Guests count is required",
  }),
  // --- סטטוס ותפוגה (לאדמין יש שליטה מלאה על זה) ---
  status: Joi.string()
    .valid("pending", "confirmed", "cancelled")
    .default("pending")
    .required()
    .messages({
      "any.only": "Status must be pending, confirmed, or cancelled",
      "any.required": "Status is required",
    }),

  expiresAt: Joi.date().iso().allow("", null).optional().messages({
    "date.format": "Expiration date must be a valid date format",
  }),
  date: Joi.alternatives()
    .try(Joi.date(), Joi.string())
    .allow("", null)
    .required(),
  startTime: Joi.string().allow("", null).required(),
  durationAtBooking: Joi.number().allow("", null).optional(),
  priceAtBooking: Joi.number().allow("", null).optional(),
  // אובייקט פנימי - ממש כמו במבנה הנתונים שלך
  treatmentParticipantDetails: Joi.object({
    pressureLevels: Joi.string().allow(null, "").messages({
      "string.base": "רמה חייבת להיות טקסט",
    }),

    focusAreasOptions: Joi.string().allow("").messages({
      "string.base": "הערות פציעה חייבות להיות טקסט",
    }),

    medicalConditionsOptions: Joi.string().allow("").messages({
      "string.base": "הערות פציעה חייבות להיות טקסט",
    }),
    extraSpaOptions: Joi.string().allow("").messages({
      "string.base": "הערות פציעה חייבות להיות טקסט",
    }),
    specialRequests: Joi.string().allow("").messages({
      "string.base": "הערות פציעה חייבות להיות טקסט",
    }),
  }),
};

export default treatmentReservationValidationSchema;
