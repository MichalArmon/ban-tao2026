export default function initialEditOrderValues(order) {
  const initialEditOrderValuesOBG = {
    userId: order._id,
    roomReservationId: order.roomReservations[0],

    totalPrice: order.totalPrice,
  };

  return initialEditOrderValuesOBG;
}
