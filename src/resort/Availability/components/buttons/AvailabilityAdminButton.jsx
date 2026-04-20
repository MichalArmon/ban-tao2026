import { Button } from "@mui/material";

import { useRoom } from "../../../providers/RoomProvider";

function AvailabilityAdminButton({ room }) {
  const { SetRoom } = useRoom();

  return (
    <Button
      onClick={() => {
        SetRoom(room);
        console.log("room:", room);
      }}
      variant="contained"
      color="primary"
      size="large"
      sx={{ fontWeight: "bold", px: 4 }}
    >
      set room
    </Button>
  );
}

export default AvailabilityAdminButton;
