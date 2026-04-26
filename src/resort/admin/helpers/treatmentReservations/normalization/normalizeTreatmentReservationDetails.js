function normalizeTreatmentReservation(values) {
  const treatmentReservationDetailsForServer = {
    treatmentId: values.treatmentId,
    userId: values.userId,
    date: values.date,
    startTime: values.startTime,

    guestsCount: values.guestsCount,
    status: values.status,

    treatmentParticipantDetails: {
      pressureLevels: values.pressureLevels,
      medicalConditionsOptions: values.medicalConditionsOptions,
      extraSpaOptions: values.extraSpaOptions,

      specialRequests: values.specialRequests,
    },
  };
  return treatmentReservationDetailsForServer;
}

export default normalizeTreatmentReservation;
