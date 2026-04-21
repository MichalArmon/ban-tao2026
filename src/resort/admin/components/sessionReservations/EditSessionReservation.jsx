import { useEffect } from "react";
import { useSessionReservation } from "../../../providers/SessionReservationProvider";

import SessionReservationForm from "./SessionReservationForm";
import { Typography } from "@mui/material";
import initialEditSessionReservationDetailsValues from "../../helpers/sessionReservations/initialValues/fullSessionReservations/initialEditValuesSessionReservationDetails";
initialEditSessionReservationDetailsValues;

function EditSessionReservation({
  SessionReservationSelected,
  setIsDialogOpen,
}) {
  const {
    handleGetSessionReservation,
    handleSubmitEditSessionReservation,
    SessionReservation,
  } = useSessionReservation();
  useEffect(() => {
    if (SessionReservationSelected) {
      handleGetSessionReservation(SessionReservationSelected);
    }
  }, [SessionReservationSelected]);
  console.log(SessionReservation);

  if (
    !SessionReservation ||
    SessionReservation._id !== SessionReservationSelected
  ) {
    return (
      <Typography sx={{ p: 4, textAlign: "center" }}>Loading...</Typography>
    );
  }

  const handleSaveAndCloseEdit = async (formData) => {
    try {
      await handleSubmitEditSessionReservation(
        SessionReservationSelected,
        formData,
      );
      setIsDialogOpen(false);
    } catch (error) {
      console.error("Error saving SessionReservation:", error);
    }
  };

  return (
    <>
      <SessionReservationForm
        isEditMode={true}
        key={SessionReservation._id}
        initialSessionReservationValues={initialEditSessionReservationValues(
          SessionReservation,
        )}
        handleSubmitForm={handleSaveAndCloseEdit}
      />
    </>
  );
}

export default EditSessionReservation;
