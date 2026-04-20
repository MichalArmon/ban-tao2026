import Joi from "joi";

const orderSchema = {
  userId: Joi.string().allow(""),
  roomReservationId: Joi.string().allow(""),

  totalPrice: Joi.number(),
};
export default orderSchema;
