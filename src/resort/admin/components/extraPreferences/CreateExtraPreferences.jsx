import { useNavigate } from "react-router-dom";

import { useRoomReservation } from "../../../providers/RoomReservationProvider";
import { useSnackBar } from "../../../providers/SnackBarProvider";
import { ROUTES } from "../../../../routes/routerDict";

import initialExtraPreferencesValues from "../../helpers/roomReservations/initialValues/extraPreferences/initialExtraPreferencesValues";
import ExtraPreferencesForm from "./ExtraPreferencesForm";

function CreateExtraPreferences() {
  const { handleEditExtraPreferencesDetails } = useRoomReservation();
  const { setSnack } = useSnackBar();
  const navigate = useNavigate();

  const handleSaveAndCloseEdit = async (formData) => {
    const reservationId = sessionStorage.getItem("currentRoomReservationId");

    if (!reservationId) {
      setSnack("error", "Reservation ID was not found.");
      return;
    }

    try {
      const reservationAfterUpdate = await handleEditExtraPreferencesDetails(
        reservationId,
        {
          ...formData,
          status: "confirmed",
        },
      );

      if (!reservationAfterUpdate) {
        setSnack("error", "Could not confirm your reservation.");
        return;
      }

      setSnack("success", "Your reservation has been confirmed!");

      navigate(ROUTES.thankYou, {
        state: {
          reservation: reservationAfterUpdate,
        },
      });
    } catch (error) {
      console.error("Reservation confirmation failed:", error);
      setSnack("error", "Something went wrong. Please try again.");
    }
  };

  return (
    <ExtraPreferencesForm
      initialExtraPreferencesValues={initialExtraPreferencesValues}
      handleSubmitForm={handleSaveAndCloseEdit}
    />
  );
}

export default CreateExtraPreferences;
