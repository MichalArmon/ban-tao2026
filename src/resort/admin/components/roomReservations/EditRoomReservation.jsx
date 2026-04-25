import { useEffect } from "react";
import { useRoomReservation } from "../../../providers/RoomReservationProvider";

import RoomReservationForm from "./RoomReservationForm";
import { Typography } from "@mui/material";
import initialEditRoomReservationValues from "../../helpers/roomReservations/initialValues/fullRoomReservations/initialEditRoomReservationValues";

function EditRoomReservation({ roomReservationSelected, setIsDialogOpen }) {
  const {
    handleGetRoomReservation,
    handleEditRoomReservation,
    roomReservation,
  } = useRoomReservation();
  useEffect(() => {
    if (roomReservationSelected) {
      handleGetRoomReservation(roomReservationSelected);
    }
  }, [roomReservationSelected]);
  console.log(roomReservation);

  if (!roomReservation || roomReservation._id !== roomReservationSelected) {
    return (
      <Typography sx={{ p: 4, textAlign: "center" }}>Loading...</Typography>
    );
  }

  const handleSaveAndCloseEdit = async (formData) => {
    try {
      await handleEditRoomReservation(roomReservationSelected, formData);
      setIsDialogOpen(false);
    } catch (error) {
      console.error("Error saving RoomReservation:", error);
    }
  };

  return (
    <>
      <RoomReservationForm
        isEditMode={true}
        key={roomReservation._id}
        initialRoomReservationValues={initialEditRoomReservationValues(
          roomReservation,
        )}
        handleSubmitForm={handleSaveAndCloseEdit}
      />
    </>
  );
}

export default EditRoomReservation;
