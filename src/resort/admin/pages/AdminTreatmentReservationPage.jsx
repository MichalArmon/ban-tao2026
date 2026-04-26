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
import { useTreatmentReservation } from "../../providers/TreatmentReservationProvider";

import TreatmentReservationsDataList from "../components/treatmentReservations/TreatmentReservationsDataList";
import CreateTreatmentReservation from "../components/treatmentReservations/CreateTreatmentReservation";

function AdminTreatmentReservationsPage() {
  const { isDialogOpen, setIsDialogOpen, setTreatmentReservation } =
    useTreatmentReservation();
  return (
    <Box sx={{ position: "relative", minHeight: "80vh" }}>
      <Fab
        sx={{ position: "fixed", bottom: 20, right: 20 }}
        color="primary"
        onClick={() => {
          setTreatmentReservation(null);
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
        <DialogTitle>Create New Treatment Reservation</DialogTitle>
        <DialogContent dividers>
          <CreateTreatmentReservation />
        </DialogContent>
      </Dialog>
      <TreatmentReservationsDataList />
    </Box>
  );
}

export default AdminTreatmentReservationsPage;
