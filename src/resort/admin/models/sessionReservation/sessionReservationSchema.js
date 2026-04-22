// sessionReservationSchema.js
import Joi from "joi";

const sessionReservationValidationSchema = {
  // שדות חובה - אי אפשר לשלוח את הטופס בלעדיהם
  userId: Joi.string().required().messages({
    "string.empty": "חובה להזין מזהה משתמש",
    "any.required": "שדה משתמש הוא שדה חובה",
  }),

  sessionId: Joi.string().required().messages({
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

  // אובייקט פנימי - ממש כמו במבנה הנתונים שלך
  participantDetails: Joi.object({
    // מניחה שרמה היא לא חובה, לכן מרשים מחרוזת ריקה
    level: Joi.string().allow(null, "").messages({
      "string.base": "רמה חייבת להיות טקסט",
    }),

    // רשימה של מחרוזות (מערך)
    goals: Joi.array().items(Joi.string()).messages({
      "array.base": "מטרות צריכות להיות רשימה",
    }),

    // שדות רשות - מרשים מחרוזת ריקה כדי שהטופס לא יקרוס אם המשתמש לא כתב כלום
    injuriesNotes: Joi.string().allow("").messages({
      "string.base": "הערות פציעה חייבות להיות טקסט",
    }),
  }),
};

export default sessionReservationValidationSchema;
