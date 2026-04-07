import Joi from "joi";
const availabilitySchema = {
  checkIn: Joi.object().required().label("Check-in Date"),
  checkOut: Joi.object().required().label("Check-out Date"),
  guestsCount: Joi.number().min(1).max(10).required().label("Guests"),
  roomType: Joi.string().required().label("Room Type"),
};
export default availabilitySchema;
