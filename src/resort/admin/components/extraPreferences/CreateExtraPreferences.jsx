import { useOrder } from "../../../providers/OrderProvider";
import { useRoomReservation } from "../../../providers/RoomReservationProvider";
import initialExtraPreferencesValues from "../../helpers/roomReservations/initialValues/extraPreferences/initialExtraPreferencesValues";
import ExtraPreferencesForm from "./ExtraPreferencesForm";

function CreateExtraPreferences() {
  const { handleEditExtraPreferencesDetails } = useRoomReservation();
  const { handleSubmitCreateOrder } = useOrder();

  const handleSaveAndCloseEdit = async (formData) => {
    try {
      const reservationId = sessionStorage.getItem("currentRoomReservationId");
      const reservationAfterUpdate = await handleEditExtraPreferencesDetails(
        reservationId,
        formData,
      );
      await handleSubmitCreateOrder(reservationAfterUpdate);
      if (!reservationAfterUpdate) {
        return (
          <Box bgcolor="red" height="1300">
            sfsfsfs
          </Box>
        );
      }
    } catch (error) {
      console.error("Error saving ExtraPreferences:", error);
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
