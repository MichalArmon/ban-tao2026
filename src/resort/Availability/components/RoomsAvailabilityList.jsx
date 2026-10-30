import { Box, Typography } from "@mui/material";
import { useRoom } from "../../providers/RoomProvider";
import RoomAvailabilityCard from "./RoomAvailabilityCard";

function RoomsAvailabilityList() {
  const { filteredRooms } = useRoom();

  if (!filteredRooms || filteredRooms.length === 0) {
    return (
      <Typography
        variant="body1"
        sx={{
          textAlign: "center",
          mt: 4,
          color: "text.secondary",
        }}
      >
        No rooms available for these dates.
      </Typography>
    );
  }

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        gap: 3,
        boxSizing: "border-box",
      }}
    >
      {filteredRooms.map((room) => (
        <RoomAvailabilityCard key={room._id} room={room} />
      ))}
    </Box>
  );
}

export default RoomsAvailabilityList;
