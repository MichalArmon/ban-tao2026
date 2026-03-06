import { useRoom } from "../../../providers/RoomProvider";
import initialRoomValues from "../../helpers/rooms/initialValues/initialRoomValues";
import RoomForm from "./RoomForm";

function CreateRoom() {
  const { handleSubmitCreateRoom } = useRoom();
  return (
    <>
      <RoomForm
        initialRoomValues={initialRoomValues}
        handleSubmitForm={handleSubmitCreateRoom}
      />
    </>
  );
}

export default CreateRoom;
