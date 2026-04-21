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

import sessionReservationsDataList from "../components/sessionReservations/sessionReservationsDataList";
CreateSe;
import { useSessionReservation } from "../../providers/SessionReservationProvider";

function AdminsessionReservationsPage() {
  const { isDialogOpen, setIsDialogOpen, setsessionReservation } =
    usesessionReservation();
  return (
    <Box sx={{ position: "relative", minHeight: "80vh" }}>
      <Fab
        sx={{ position: "fixed", bottom: 20, right: 20 }}
        color="primary"
        onClick={() => {
          setsessionReservation(null);
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
        maxWidth="xl"
      >
        <DialogTitle>Create New session Reservation</DialogTitle>
        <DialogContent dividers>
          <CreatesessionReservation />
        </DialogContent>
      </Dialog>
      <sessionReservationsDataList />
    </Box>
  );
}

export default AdminsessionReservationsPage;
