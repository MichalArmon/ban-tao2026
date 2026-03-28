import Joi from "joi";

const workshopSchema = {
  title: Joi.string().required().min(2).messages({
    "string.min": "Treatment title must be at least 2 characters long",
    "any.required": "Title is required",
    "string.empty": "Title cannot be empty",
  }),
  slug: Joi.string().required().messages({
    "any.required": "Slug is required",
    "string.empty": "Slug cannot be empty",
  }),
  blurb: Joi.string().required().max(500).messages({
    "string.max": "Blurb cannot exceed 500 characters",
    "any.required": "Blurb is required",
    "string.empty": "Blurb cannot be empty",
  }),
  description: Joi.string().required().max(1000).messages({
    "string.max": "Description cannot exceed 1000 characters",
    "any.required": "Description is required",
    "string.empty": "Description cannot be empty",
  }),
  bullets: Joi.array().items(Joi.string()).optional(),
  tags: Joi.array().items(Joi.string()).optional(),
  price: Joi.number().required().min(0).messages({
    "number.min": "Price cannot be negative",
    "any.required": "Price is required",
  }),
  currency: Joi.string().required().messages({
    "any.required": "Currency is required",
    "string.empty": "Currency cannot be empty",
  }),
  heroPublicId: Joi.string().required().messages({
    "any.required": "Hero image public ID is required",
    "string.empty": "Hero image public ID cannot be empty",
  }),

  heroUrl: Joi.string().uri().required().messages({
    "string.uri": "Please enter a valid image URL",
    "any.required": "Hero image URL is required",
    "string.empty": "Hero image URL cannot be empty",
  }),
  heroAlt: Joi.string().required().messages({
    "any.required": "Alt text is required for the hero image",
    "string.empty": "Alt text cannot be empty",
  }),
  gallery: Joi.array()
    .items(
      Joi.object({
        publicId: Joi.string(),
        url: Joi.string().uri().messages({
          "string.uri": "Please enter a valid URL for the gallery image",
        }),
        alt: Joi.string().allow("").optional(),
      }),
    )
    .optional(),
  isActive: Joi.boolean().required(),

  instructor: Joi.string().allow("").optional(),
  duration: Joi.number().required().min(1).messages({
    "number.min": "Duration must be at least 1 minute",
    "any.required": "Duration is required",
  }),

  level: Joi.string().allow("").optional(),

  isPrivate: Joi.boolean().required(),
  isClosed: Joi.boolean().required(),

  contraindications: Joi.array().items(Joi.string()).optional(),
};

export default workshopSchema;
