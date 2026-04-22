// initialSessionReservationValues.js

export default function initialEditSessionReservationDetailsValues(
  reservation,
) {
  return {
    userId: reservation?.userId || "",
    sessionId: reservation?.sessionId || "",
    guestsCount: reservation?.guestsCount || 1,
    status: reservation?.status || "pending",

    participantDetails: {
      // הערה קטנה: שמתי לב שהמפתח הוא level אבל משכת נתונים מ-mealPlan.
      // אם זו טעות, תשני את mealPlan ל-level גם בצד ימין.
      level: reservation?.participantDetails?.level || "beginner",
      goals: reservation?.participantDetails?.goals || [],
      injuriesNotes: reservation?.participantDetails?.injuriesNotes || "",
    },
  };
}
