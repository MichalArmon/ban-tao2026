function normalizeSessionReservation(values) {
  const sessionReservationDetailsForServer = {
    sessionId: values.sessionId,
    userId: values.userId,
    guestsCount: Number(values.guestsCount),
    expiresAt: values.expiresAt || null,
    status: values.status || "pending",

    participantDetails: {
      level: values.participantDetails?.level || null,
      goals: values.participantDetails?.goals || [],
      injuriesNotes: values.participantDetails?.injuriesNotes || "",
      extras: values.participantDetails?.extras || [],
      instructorNotes: values.participantDetails?.instructorNotes || "",
    },
  };

  return sessionReservationDetailsForServer;
}

export default normalizeSessionReservation;
