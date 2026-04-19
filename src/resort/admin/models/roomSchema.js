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
  heroUrl: Joi.string().uri().required().messages({
    "string.uri": "Please enter a valid image URL",
    "any.required": "Hero image URL is required",
    "string.empty": "Hero image URL cannot be empty",
  }),
  heroAlt: Joi.string().required().messages({
    "any.required": "Alt text is required for the hero image",
    "string.empty": "Alt text cannot be empty",
  }),
  heroPublicId: Joi.string().required().messages({
    "any.required": "Hero image public ID is required",
    "string.empty": "Hero image public ID cannot be empty",
  }),
  gallery: Joi.array()
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
  isActive: Joi.boolean().required(),
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

  stock: Joi.number().required().min(0).messages({
    "number.min": "Stock cannot be negative",
    "any.required": "Stock is required",
  }),
  roomType: Joi.string()
    .valid("Single", "Double", "Suite", "Shared", "Studio")
    .required()
    .messages({
      "any.only": "Invalid room type",
      "any.required": "Room type is required",
    }),
  view: Joi.string()
    .valid("Sea", "Pool", "Garden", "Mountain", "None")
    .required()
    .messages({
      "any.only": "Invalid room type",
      "any.required": "Room type is required",
    }),
};

export default roomSchema;
