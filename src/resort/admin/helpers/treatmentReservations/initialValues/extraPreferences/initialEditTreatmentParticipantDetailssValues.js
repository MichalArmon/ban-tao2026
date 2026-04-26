export default function initialEditTreatmentParticipantDetailsValues(
  treatmentParticipantDetails,
) {
  const initialEditTreatmentParticipantDetailsValuesOBJ = {
    pressureLevels: treatmentParticipantDetails?.pressureLevels || "",
    focusAreasOptions: treatmentParticipantDetails?.focusAreasOptions || "",
    medicalConditionsOptions:
      treatmentParticipantDetails?.medicalConditionsOptions || "",
    extraSpaOptions: treatmentParticipantDetails?.extraSpaOptions || "",
    instructorNotes: treatmentParticipantDetails?.instructorNotes || "",

    status: treatmentParticipantDetails?.status,
  };

  return initialEditTreatmentParticipantDetailsValuesOBJ;
}
