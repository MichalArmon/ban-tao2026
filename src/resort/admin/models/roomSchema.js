import Joi from "joi";

const roomSchema = {
  // נתונים רגילים
  title: Joi.string().required().min(2).messages({
    "string.min": "שם החדר חייב להכיל לפחות 2 תווים",
    "any.required": "שדה זה הוא חובה",
  }),
  slug: Joi.string().required(),
  blurb: Joi.string().required().max(500), // מגביל את התיאור הקצר ל-500 תווים
  features: Joi.array().items(Joi.string()).required(), // מוודא שזה מערך של מחרוזות
  maxGuests: Joi.number().required().min(1), // אי אפשר חדר ל-0 אנשים
  sizeM2: Joi.number().required().min(1),
  bedType: Joi.string().required(),
  priceBase: Joi.number().required().min(0), // מחיר לא יכול להיות שלילי
  currency: Joi.string().required(),
  stock: Joi.number().required().min(0),
  active: Joi.boolean().required(),

  // תמונת Hero (השדות השטוחים)
  heroPublicId: Joi.string().required(),
  heroUrl: Joi.string().uri().required().messages({
    "string.uri": "יש להזין כתובת אינטרנט (URL) תקינה לתמונה",
  }),
  heroAlt: Joi.string().required(),

  // גלריית תמונות (מערך של אובייקטים)
  images: Joi.array()
    .items(
      Joi.object({
        publicId: Joi.string().required(),
        url: Joi.string().uri().required(),
        alt: Joi.string().allow("").optional(), // מאפשר להשאיר את ה-alt ריק
      }),
    )
    .optional(), // המערך כולו הוא אופציונלי (מותר ליצור חדר בלי גלריה)
};

export default roomSchema;
