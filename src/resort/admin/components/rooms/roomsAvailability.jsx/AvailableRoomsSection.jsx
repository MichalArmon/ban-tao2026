import { useEffect, use } from "react";
import { Box, Typography, Paper, Button, Grid } from "@mui/material";
import { useRoom } from "../../../../providers/RoomProvider";

function AvailableRoomsSection({
  checkIn,
  checkOut,
  roomType,
  guestsCount,
  selectedRoomId,
  onSelectRoom,
  error,
}) {
  const { filteredRooms, handleGetRoomsAvailability } = useRoom();

  useEffect(() => {
    if (checkIn && checkOut && roomType && guestsCount) {
      handleGetRoomsAvailability({
        checkIn,
        checkOut,
        roomType,
        guestsCount,
      });
    }
  }, [checkIn, checkOut, roomType, guestsCount, handleGetRoomsAvailability]);

  return (
    <Paper elevation={2} sx={{ p: 3 }}>
      <Typography variant="h6" gutterBottom>
        Available Rooms
      </Typography>

      {!checkIn || !checkOut ? (
        <Typography color="text.secondary">
          Select check-in and check-out dates first
        </Typography>
      ) : (
        <Grid container spacing={2}>
          {filteredRooms?.map((room) => (
            <Grid size={{ xs: 12, md: 6 }} key={room._id}>
              <Paper
                variant={selectedRoomId === room._id ? "outlined" : "elevation"}
                sx={{
                  p: 2,
                  border:
                    selectedRoomId === room._id
                      ? "2px solid"
                      : "1px solid transparent",
                }}
              >
                <Typography variant="subtitle1">{room.title}</Typography>
                <Typography variant="body2">
                  {room.price} {room.currency}
                </Typography>

                <Button
                  sx={{ mt: 1 }}
                  variant={
                    selectedRoomId === room._id ? "contained" : "outlined"
                  }
                  onClick={() => onSelectRoom(room)}
                >
                  {selectedRoomId === room._id ? "Selected" : "Select"}
                </Button>
              </Paper>
            </Grid>
          ))}
        </Grid>
      )}

      {error && (
        <Typography color="error" sx={{ mt: 1 }}>
          {error}
        </Typography>
      )}
    </Paper>
  );
}

export default AvailableRoomsSection;
