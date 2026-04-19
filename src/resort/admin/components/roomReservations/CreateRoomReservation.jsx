import { useRoomReservation } from "../../../providers/RoomReservationProvider";
import initialRoomReservationValues from "../../helpers/roomReservations/initialValues/fullRoomReservations/initialRoomReservationValues";

initialRoomReservationValues;
import RoomReservationForm from "./RoomReservationForm";
function CreateRoomReservation() {
  const { handleSubmitCreateRoomReservation } = useRoomReservation();

  return (
    <RoomReservationForm
      isEditMode={false}
      initialRoomReservationValues={initialRoomReservationValues}
      handleSubmitForm={handleSubmitCreateRoomReservation}
    />
  );
}

export default CreateRoomReservation;
