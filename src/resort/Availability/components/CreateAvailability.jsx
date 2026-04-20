import { useRoom } from "../../providers/RoomProvider";

import initialRoomAvailabilityValues from "../helpers/initialValues/initialRoomAvailabilityValues";

import normalizeRoomAvailabilityValues from "../helpers/normalization/normalizeRoomAvailabilityValues";
import AvailabilityBar from "./AvailabilityBar";

function CreateAvailability() {
  const { handleGetRoomsAvailability } = useRoom();
  const handleSearchSubmit = (data) => {
    const dataForServer = normalizeRoomAvailabilityValues(data);
    const { checkIn, checkOut, roomType, guestsCount } = dataForServer;
    handleGetRoomsAvailability({ checkIn, checkOut, roomType, guestsCount });
    console.log("Searching for rooms with these params:", dataForServer);
  };
  return (
    <>
      <AvailabilityBar
        initialRoomAvailabilityValues={initialRoomAvailabilityValues}
        handleSubmitForm={handleSearchSubmit}
      />
    </>
  );
}

export default CreateAvailability;
