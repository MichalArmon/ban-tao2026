export default function initialEditSessionReservationDetailsValues(
  reservation,
) {
  const initialEditSessionReservationDetailsValuesOBJ = {
    userId: reservation?.userId || "",
    sessionId: reservation?.sessionId || "",
    // --- התוספות ---

    participantDetails: {
      level: reservation?.participantDetails?.level || "",
      goals: reservation?.participantDetails?.goals || [],
      injuriesNotes: reservation?.participantDetails?.injuriesNotes || "",
      specialRequests: reservation?.participantDetails?.specialRequests || "",
    },
  };

  return initialEditSessionReservationDetailsValuesOBJ;
}
