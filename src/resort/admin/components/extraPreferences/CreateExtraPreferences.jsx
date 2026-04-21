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
      if (!reservationAfterUpdate) {
        return (
          <Box bgcolor="red" height="1300">
            sfsfsfs
          </Box>
        );
      }
      const dataReadyForOrder = {
        userId: reservationAfterUpdate.userId,
        studioReservations: [reservationAfterUpdate._id],
        totalPrice: 1000,
      };
      console.log("dataReadyForOrder:", dataReadyForOrder);
      const newOrder = await handleSubmitCreateOrder(dataReadyForOrder);
      return newOrder;
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
