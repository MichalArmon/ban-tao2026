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

  // אובייקט פנימי - ממש כמו במבנה הנתונים שלך
  participantDetails: Joi.object({
    // מניחה שרמה היא לא חובה, לכן מרשים מחרוזת ריקה
    level: Joi.string().allow("").messages({
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

    specialRequests: Joi.string().allow("").messages({
      "string.base": "בקשות מיוחדות חייבות להיות טקסט",
    }),
  }),
};

export default sessionReservationValidationSchema;
