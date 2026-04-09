export default function initialEditOrderValues(order) {
  const initialEditOrderValuesOBG = {
    userId: order._id,
    roomReservationId: order.roomReservations[0],

    boardType: order.boardType,
    rentScooter: order.rentScooter,
    shuttleFromFerry: order.shuttleFromFerry,

    specialRequests: order.specialRequests,

    totalPrice: order.totalPrice,
  };

  return initialEditOrderValuesOBG;
}
