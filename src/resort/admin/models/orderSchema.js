import Joi from "joi";

const orderSchema = {
  userId: Joi.string().allow(""),
  roomReservationId: Joi.string().allow(""),

  boardType: Joi.string().required(),
  rentScooter: Joi.boolean(),
  shuttleFromFerry: Joi.boolean(),

  specialRequests: Joi.string().allow(""),
  totalPrice: Joi.number(),
};
export default orderSchema;
