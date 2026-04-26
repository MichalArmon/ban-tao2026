export default function initialEditTreatmentReservationValues(reservation) {
  const initialTreatmentReservationValuesOBJ = {
    // --- פרטי החדר והלקוח ---
    treatmentId: reservation?.treatmentId || "",
    userId: reservation?.userId || "",

    // --- תאריכים והרכב (עם חיתוך של התאריך כדי שיתאים לאינפוט תאריך) ---
    date: reservation?.date ? reservation.date.split("T")[0] : "",
    startTime: reservation?.startTime
      ? reservation.startTime.split("T")[0]
      : "",
    guestsCount: reservation?.guestsCount || 1, // דיפולט של לפחות אורח אחד
    durationAtBooking: reservation?.durationAtBooking || 0,
    priceAtBooking: reservation?.priceAtBooking || 0,
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

  return initialTreatmentReservationValuesOBJ;
}
