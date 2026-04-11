import SessionsDataList from "../components/sessions/SessionsDataList";
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
import { useSession } from "../../providers/SessionProvider";
import CreateSession from "../components/sessions/CreateSession";

function AdminSessionsPage() {
  const { isDialogOpen, setIsDialogOpen, setSession } = useSession();
  return (
    <Box sx={{ position: "relative", minHeight: "80vh" }}>
      <Fab
        sx={{ position: "fixed", bottom: 20, right: 20 }}
        color="primary"
        onClick={() => {
          setSession(null);
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
        <DialogTitle>Create New Session</DialogTitle>
        <DialogContent dividers>
          <CreateSession />
        </DialogContent>
      </Dialog>
      <SessionsDataList />
    </Box>
  );
}

export default AdminSessionsPage;
