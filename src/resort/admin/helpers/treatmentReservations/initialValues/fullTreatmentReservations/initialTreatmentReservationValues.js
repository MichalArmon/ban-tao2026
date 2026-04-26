const initialTreatmentReservationValues = {
  // --- פרטי החדר והלקוח ---
  treatmentId: "",
  userId: "",

  // --- תאריכים והרכב (עם חיתוך של התאריך כדי שיתאים לאינפוט תאריך) ---
  date: "",
  startTime: "",
  guestsCount: 1,

  // --- סטטוס ותפוגה ---
  status: "pending",
  expiresAt: "",

  durationAtBooking: 0,
  priceAtBooking: 0,

  treatmentParticipantDetails: {
    focusAreasOptions: "",
    medicalConditionsOptions: "",
    extraSpaOptions: "",
    specialRequests: "",
  },
};

export default initialTreatmentReservationValues;
