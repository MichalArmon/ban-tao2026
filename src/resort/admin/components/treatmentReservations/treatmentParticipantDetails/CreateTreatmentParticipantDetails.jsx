import { useTreatmentReservation } from "../../../../providers/TreatmentReservationProvider";
import initialTreatmentParticipantDetailsValues from "../../../helpers/treatmentReservations/initialValues/treatmentParticipantDetails/initialTreatmentParticipantDetailsValues";

import TreatmentParticipantDetailsForm from "./TreatmentParticipantDetailsForm";

function CreateTreatmentParticipantDetails() {
  const { handleEditExtraPreferencesDetails } = useTreatmentReservation();

  const handleSaveAndCloseEdit = async (formData) => {
    try {
      const reservationId = sessionStorage.getItem(
        "currentTreatmentReservationId",
      );
      const reservationAfterUpdate = await handleEditExtraPreferencesDetails(
        reservationId,
        {
          ...formData,
          status: "confirmed",
        },
      );

      if (!reservationAfterUpdate) {
        return (
          <Box bgcolor="red" height="1300">
            sfsfsfs
          </Box>
        );
      }

      return reservationAfterUpdate;
    } catch (error) {
      console.error("Error saving ExtraPreferences:", error);
    }
  };
  return (
    <TreatmentParticipantDetailsForm
      initialTreatmentReservationValues={
        initialTreatmentParticipantDetailsValues
      }
      handleSubmitForm={handleSaveAndCloseEdit}
    />
  );
}

export default CreateTreatmentParticipantDetails;
