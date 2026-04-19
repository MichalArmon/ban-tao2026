export default function initialEditRoomReservationValues(reservation) {
  const initialRoomReservationValuesOBJ = {
    // --- פרטי החדר והלקוח ---
    roomId: reservation?.roomId || "",
    userId: reservation?.userId || "",

    // --- תאריכים והרכב (עם חיתוך של התאריך כדי שיתאים לאינפוט תאריך) ---
    checkIn: reservation?.checkIn ? reservation.checkIn.split("T")[0] : "",
    checkOut: reservation?.checkOut ? reservation.checkOut.split("T")[0] : "",
    guestsCount: reservation?.guestsCount || 1, // דיפולט של לפחות אורח אחד

    // --- סטטוס ותפוגה ---
    status: reservation?.status || "pending",
    expiresAt: reservation?.expiresAt
      ? reservation.expiresAt.split("T")[0]
      : "",

    // --- התוספות ---
    extraPreferences: {
      mealPlan: reservation?.extraPreferences?.mealPlan || "",
      rentScooter: reservation?.extraPreferences?.rentScooter || false,
      shuttleFromFerry:
        reservation?.extraPreferences?.shuttleFromFerry || false,
      specialRequests: reservation?.extraPreferences?.specialRequests || "",
    },
  };

  return initialRoomReservationValuesOBJ;
}
