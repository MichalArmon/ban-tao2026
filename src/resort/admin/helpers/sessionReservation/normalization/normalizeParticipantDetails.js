function normalizeParticipantDetails(values) {
  return {
    participantDetails: {
      level: values.level,
      goals: values.goals,
      injuriesNotes: values.injuriesNotes,
      extras: values.extras,
      instructorNotes: values.instructorNotes,
    },
  };
}

export default normalizeParticipantDetails;
