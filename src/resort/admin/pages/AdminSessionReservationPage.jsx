import {
  Typography,
  Fab,
  Dialog,
  DialogContent,
  DialogTitle,
  Box,
  AppBar,
  Toolbar,
} from "@mui/material";
import { Add } from "@mui/icons-material";
import { useState } from "react";
import { useSessionReservation } from "../../providers/SessionReservationProvider";

import SessionReservationsDataList from "../components/sessionReservations/SessionReservationsDataList";
import CreateSessionReservation from "../components/sessionReservations/CreateSessionReservation";

function AdminSessionReservationsPage() {
  const { isDialogOpen, setIsDialogOpen, setSessionReservation } =
    useSessionReservation();
  return (
    <Box sx={{ position: "relative", minHeight: "80vh" }}>
      <Fab
        sx={{ position: "fixed", bottom: 20, right: 20 }}
        color="primary"
        onClick={() => {
          setSessionReservation(null);
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
        <DialogTitle>Create New Session Reservation</DialogTitle>
        <DialogContent dividers>
          <CreateSessionReservation />
        </DialogContent>
      </Dialog>
      <SessionReservationsDataList />
    </Box>
  );
}

export default AdminSessionReservationsPage;
