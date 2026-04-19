function normalizeRoomReservation(values) {
  const roomReservationDetailsForServer = {
    roomId: values.sessionId,
    userId: values.userId,
    checkIn: values.checkIn,
    checkOut: values.checkOut,

    guestsCount: values.guestsCount,
    status: values.status,

    extraPreferences: {
      mealPlan: values.mealPlan,
      rentScooter: values.rentScooter,
      shuttleFromFerry: values.shuttleFromFerry,

      specialRequests: values.specialRequests,
    },
  };
  return roomReservationDetailsForServer;
}

export default normalizeRoomReservation;
