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
import { useRoomReservation } from "../../providers/RoomReservationProvider";

import RoomReservationsDataList from "../components/roomReservations/RoomReservationsDataList";
import CreateRoomReservation from "../components/roomReservations/CreateRoomReservation";

function AdminRoomReservationsPage() {
  const { isDialogOpen, setIsDialogOpen, setRoomReservation } =
    useRoomReservation();
  return (
    <Box sx={{ position: "relative", minHeight: "80vh" }}>
      <Fab
        sx={{ position: "fixed", bottom: 20, right: 20 }}
        color="primary"
        onClick={() => {
          setRoomReservation(null);
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
        <DialogTitle>Create New RoomReservation</DialogTitle>
        <DialogContent dividers>
          <CreateRoomReservation />
        </DialogContent>
      </Dialog>
      <RoomReservationsDataList />
    </Box>
  );
}

export default AdminRoomReservationsPage;
