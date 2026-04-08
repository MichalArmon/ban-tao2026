import { Box, Typography } from "@mui/material";
import { useRoom } from "../../providers/RoomProvider";
import RoomAvailabilityCard from "./RoomAvailabilityCard";

function RoomsAvailabilityList() {
  const { filteredRooms } = useRoom();
  if (!filteredRooms || filteredRooms.length === 0) {
    return (
      <Typography variant="h6" sx={{ textAlign: "center", mt: 4 }}>
        No rooms available for these dates.
      </Typography>
    );
  }

  return (
    <Box>
      {filteredRooms.map((room) => (
        <RoomAvailabilityCard room={room} />
      ))}
    </Box>
  );
}

export default RoomsAvailabilityList;
