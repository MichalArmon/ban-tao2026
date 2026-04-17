function normalizeSessionReservation(values) {
  const sessionReservationDetailsForServer = {
    sessionId: values.sessionId,
    userId: values.userId,
    guestsCount: values.guestsCount,
    expiresAt: values.expiresAt,

    participantDetails: {
      level: values.level,
      goals: values.goals,
      injuriesNotes: values.injuriesNotes,
      extras: values.extras,
      instructorNotes: values.instructorNotes,
    },
  };
  return sessionReservationDetailsForServer;
}

export default normalizeSessionReservation;
