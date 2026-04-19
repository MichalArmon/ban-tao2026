const initialRoomReservationValues = {
  // --- פרטי החדר והלקוח ---
  roomId: "",
  userId: "",

  // --- תאריכים והרכב (עם חיתוך של התאריך כדי שיתאים לאינפוט תאריך) ---
  checkIn: "",
  checkOut: "",
  guestsCount: 1,

  // --- סטטוס ותפוגה ---
  status: "pending",
  expiresAt: "",

  extraPreferences: {
    mealPlan: "",
    rentScooter: false,
    shuttleFromFerry: false,
    specialRequests: "",
  },
};

export default initialRoomReservationValues;
