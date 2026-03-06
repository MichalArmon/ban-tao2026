import Joi from "joi";

const roomSchema = {
  title: Joi.string().required().min(2).messages({
    "string.min": "Room title must be at least 2 characters long",
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
  features: Joi.array().items(Joi.string()).required().messages({
    "any.required": "At least one feature is required",
  }),
  maxGuests: Joi.number().required().min(1).messages({
    "number.min": "Must be at least for 1 guest",
    "any.required": "Max guests field is required",
  }),
  sizeM2: Joi.number().required().min(1).messages({
    "number.min": "Size must be at least 1 sq meter",
    "any.required": "Room size is required",
  }),
  bedType: Joi.string().required().messages({
    "any.required": "Bed type is required",
    "string.empty": "Bed type cannot be empty",
  }),
  priceBase: Joi.number().required().min(0).messages({
    "number.min": "Price cannot be negative",
    "any.required": "Base price is required",
  }),
  currency: Joi.string().required().messages({
    "any.required": "Currency is required",
    "string.empty": "Currency cannot be empty",
  }),
  stock: Joi.number().required().min(0).messages({
    "number.min": "Stock cannot be negative",
    "any.required": "Stock is required",
  }),
  active: Joi.boolean().required(),
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
  images: Joi.array()
    .items(
      Joi.object({
        publicId: Joi.string().required(),
        url: Joi.string().uri().required().messages({
          "string.uri": "Please enter a valid URL for the gallery image",
        }),
        alt: Joi.string().allow("").optional(),
      }),
    )
    .optional(),
};

export default roomSchema;
