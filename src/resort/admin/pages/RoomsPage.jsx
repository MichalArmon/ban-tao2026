import CreateRoomForm from "../components/CreateRoomForm";
import RoomsDataList from "../components/RoomsDataList";
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

function CreateRoomPage() {
  const { isDialogOpen, setIsDialogOpen } = useRoom();
  return (
    <Box sx={{ position: "relative", minHeight: "80vh" }}>
      <Fab
        sx={{ position: "fixed", bottom: 20, right: 20 }}
        color="primary"
        onClick={() => {
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
          <CreateRoomForm />
        </DialogContent>
      </Dialog>
      <RoomsDataList />
    </Box>
  );
}

export default CreateRoomPage;
