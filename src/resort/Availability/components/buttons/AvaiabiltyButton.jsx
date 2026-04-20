import { Button } from "@mui/material";
import { useRoomReservation } from "../../../providers/RoomReservationProvider";
import { useNavigate } from "react-router-dom";
import { useRoom } from "../../../providers/RoomProvider";
import { useState } from "react";
import { useUser } from "../../../providers/UserProvider";

function AvailabilityButton({ room }) {
  const { handleCreateRoomReservation } = useRoomReservation();
  const { checkIn, checkOut, guestsCount } = useRoom();
  const { user } = useUser();

  if (!room) return null;
  const reservation = {
    userId: user?._id,
    roomId: room._id,
    checkIn: checkIn,
    checkOut: checkOut,
    guestsCount: guestsCount,
  };

  const navigate = useNavigate();
  const handleBooking = async () => {
    await handleCreateRoomReservation(reservation);
    console.log("reservation:", reservation);
    navigate(`/resort/rooms/${room._id}/order`);
  };
  return (
    <Button
      onClick={handleBooking}
      variant="contained"
      color="primary"
      size="large"
      sx={{ fontWeight: "bold", px: 4 }}
    >
      Book
    </Button>
  );
}

export default AvailabilityButton;
