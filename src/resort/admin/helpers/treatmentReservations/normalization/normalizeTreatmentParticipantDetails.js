function normalizeTreatmentParticipantDetails(values) {
  const treatmentParticipantDetailsForServer = {
    pressureLevels: values.pressureLevels,
    focusAreasOptions: values.focusAreasOptions,
    medicalConditionsOptions: values.medicalConditionsOptions,

    extraSpaOptions: values.extraSpaOptions,
    specialRequests: values.specialRequests,
    status: values.status,
  };
  return treatmentParticipantDetailsForServer;
}

export default normalizeTreatmentParticipantDetails;
