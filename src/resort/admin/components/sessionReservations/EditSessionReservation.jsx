import { useEffect } from "react";
import { useSessionReservation } from "../../../providers/SessionReservationProvider";

import SessionReservationForm from "./SessionReservationForm";
import { Typography } from "@mui/material";
import initialEditSessionReservationDetailsValues from "../../helpers/sessionReservations/initialValues/fullSessionReservations/initialEditValuesSessionReservationDetails";

function EditSessionReservation({
  sessionReservationSelected,
  setIsDialogOpen,
}) {
  const {
    handleGetSessionReservation,
    handleEditSessionReservation,
    sessionReservation,
  } = useSessionReservation();
  useEffect(() => {
    if (sessionReservationSelected) {
      handleGetSessionReservation(sessionReservationSelected);
      console.log(sessionReservation);
    }
  }, [sessionReservationSelected]);

  if (
    !sessionReservation ||
    sessionReservation._id !== sessionReservationSelected
  ) {
    return (
      <Typography sx={{ p: 4, textAlign: "center" }}>Loading...</Typography>
    );
  }

  const handleSaveAndCloseEdit = async (formData) => {
    try {
      await handleEditSessionReservation(sessionReservationSelected, formData);
      setIsDialogOpen(false);
    } catch (error) {
      console.error("Error saving SessionReservation:", error);
    }
  };

  return (
    <>
      <SessionReservationForm
        isEditMode={true}
        key={sessionReservation._id}
        initialSessionReservationValues={initialEditSessionReservationDetailsValues(
          sessionReservation,
        )}
        handleSubmitForm={handleSaveAndCloseEdit}
      />
    </>
  );
}

export default EditSessionReservation;
