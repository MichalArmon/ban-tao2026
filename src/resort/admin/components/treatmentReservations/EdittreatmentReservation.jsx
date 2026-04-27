import { useEffect } from "react";
import { useTreatmentReservation } from "../../../providers/TreatmentReservationProvider";

import TreatmentReservationForm from "./TreatmentReservationForm";
import { Typography } from "@mui/material";
import initialEditTreatmentReservationValues from "../../helpers/treatmentReservations/initialValues/fullTreatmentReservations/initialEditTreatmentReservationValues";

function EditTreatmentReservation({
  treatmentReservationSelected,
  setIsDialogOpen,
}) {
  const {
    handleGetTreatmentReservation,
    handleEditTreatmentReservation,
    treatmentReservation,
  } = useTreatmentReservation();
  useEffect(() => {
    if (treatmentReservationSelected) {
      handleGetTreatmentReservation(treatmentReservationSelected);
    }
  }, [treatmentReservationSelected]);
  console.log(treatmentReservation);

  if (
    !treatmentReservation ||
    treatmentReservation._id !== treatmentReservationSelected
  ) {
    return (
      <Typography sx={{ p: 4, textAlign: "center" }}>Loading...</Typography>
    );
  }

  const handleSaveAndCloseEdit = async (formData) => {
    try {
      await handleEditTreatmentReservation(
        treatmentReservationSelected,
        formData,
      );
      setIsDialogOpen(false);
    } catch (error) {
      console.error("Error saving TreatmentReservation:", error);
    }
  };

  return (
    <>
      <TreatmentReservationForm
        isEditMode={true}
        key={treatmentReservation._id}
        initialTreatmentReservationValues={initialEditTreatmentReservationValues(
          treatmentReservation,
        )}
        handleSubmitForm={handleSaveAndCloseEdit}
      />
    </>
  );
}

export default EditTreatmentReservation;
