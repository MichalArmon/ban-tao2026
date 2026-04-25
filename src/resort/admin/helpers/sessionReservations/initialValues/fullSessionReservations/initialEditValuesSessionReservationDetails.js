export default function initialEditSessionReservationDetailsValues(
  reservation,
) {
  const initialEditSessionReservationDetailsValuesOBJ = {
    userId: reservation?.userId || "",
    sessionId: reservation?.sessionId || "",
    guestsCount: reservation?.guestsCount || "",
    // --- התוספות ---

    participantDetails: {
      level: reservation?.participantDetails?.level || "",
      goals: reservation?.participantDetails?.goals || [],
      injuriesNotes: reservation?.participantDetails?.injuriesNotes || "",
    },
  };

  return initialEditSessionReservationDetailsValuesOBJ;
}
