import RoomsDataList from "../components/rooms/RoomsDataList";
import {
  Typography,
  Fab,
  Dialog,
  DialogContent,
  DialogTitle,
  Box,
} from "@mui/material";
import { Add } from "@mui/icons-material";
import { useState } from "react";
import { useRoom } from "../../providers/RoomProvider";
import CreateRoom from "../components/rooms/CreateRoom";

function CreateRoomPage() {
  const { isDialogOpen, setIsDialogOpen, setRoom } = useRoom();
  return (
    <Box sx={{ position: "relative", minHeight: "80vh" }}>
      <Fab
        sx={{ position: "fixed", bottom: 20, right: 20 }}
        color="primary"
        onClick={() => {
          setRoom(null);
          setIsDialogOpen(true);
        }}
      >
        <Add />
      </Fab>
      <Dialog
        open={isDialogOpen}
        onClose={() => {
          setIsDialogOpen(false);
        }}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>Create New Room</DialogTitle>
        <DialogContent dividers>
          <CreateRoom />
        </DialogContent>
      </Dialog>
      <RoomsDataList />
    </Box>
  );
}

export default CreateRoomPage;
