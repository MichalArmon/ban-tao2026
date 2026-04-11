import Joi from "joi";

const sessionSchema = {
  // נתונים משותפים לשני הסוגים
  workshopId: Joi.string().required().messages({
    "any.required": "Workshop ID is required",
    "string.empty": "Workshop ID cannot be empty",
  }),
  location: Joi.string().required().messages({
    "any.required": "Location is required",
    "string.empty": "Location cannot be empty",
  }),
  maxCapacity: Joi.number().required().min(1).messages({
    "number.min": "Capacity must be at least 1 person",
    "any.required": "Capacity is required",
  }),
  hour: Joi.string()
    .pattern(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/)
    .required()
    .messages({
      "string.pattern.base": "Hour must be in HH:MM format",
      "any.required": "Hour is required",
    }),

  // לשימוש בסשן בודד (Single)
  startTime: Joi.date().iso().optional().messages({
    "date.format": "Please enter a valid date",
  }),

  // לשימוש ביצירה חזרתית (Recursive)
  startDate: Joi.date().iso().optional(),
  endDate: Joi.date().iso().greater(Joi.ref("startDate")).optional().messages({
    "date.greater": "End date must be after the start date",
  }),
  daysOfWeek: Joi.array()
    .items(Joi.number().min(0).max(6))
    .unique()
    .optional()
    .messages({
      "array.unique": "Each day can only appear once",
    }),

  // שדות אופציונליים נוספים אם תרצי
  status: Joi.string()
    .valid("scheduled", "cancelled", "completed")
    .default("scheduled"),
  enrolledUsers: Joi.array().items(Joi.string()).default([]),
};

export default sessionSchema;
