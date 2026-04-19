import { useOrder } from "../../../providers/OrderProvider";
import { useRoomReservation } from "../../../providers/RoomReservationProvider";
import initialOrderValues from "../../helpers/orders/initialValues/initialOrderValues";
import OrderForm from "./OrderForm";

function CreateOrder() {
  const { handleSubmitCreateOrder } = useOrder();
  const { handleEditExtraPreferencesDetails } = useRoomReservation();

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
      console.error("Error saving Order:", error);
    }
  };
  return (
    <OrderForm
      initialOrderValues={initialOrderValues}
      handleSubmitForm={handleSaveAndCloseEdit}
    />
  );
}

export default CreateOrder;
