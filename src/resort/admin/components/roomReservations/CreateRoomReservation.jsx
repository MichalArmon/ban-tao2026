import { useRoomReservation } from "../../../providers/RoomReservationProvider";
import initialRoomReservationValues from "../../helpers/roomReservations/initialValues/fullRoomReservations/initialRoomReservationValues";

initialRoomReservationValues;
import RoomReservationForm from "./RoomReservationForm";
function CreateRoomReservation() {
  const { handleCreateRoomReservation } = useRoomReservation();

  return (
    <RoomReservationForm
      isEditMode={false}
      initialRoomReservationValues={initialRoomReservationValues}
      handleSubmitForm={handleCreateRoomReservation}
    />
  );
}

export default CreateRoomReservation;
