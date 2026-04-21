// initialSessionReservationValues.js

export default function initialEditSessionReservationDetailsValues(
  reservation,
) {
  return {
    userId: reservation?.userId || "",
    sessionId: reservation?.sessionId || "",
    participantDetails: {
      // הערה קטנה: שמתי לב שהמפתח הוא level אבל משכת נתונים מ-mealPlan.
      // אם זו טעות, תשני את mealPlan ל-level גם בצד ימין.
      level: reservation?.participantDetails?.level || "",
      goals: reservation?.participantDetails?.goals || [],
      injuriesNotes: reservation?.participantDetails?.injuriesNotes || "",
      specialRequests: reservation?.participantDetails?.specialRequests || "",
    },
  };
}
