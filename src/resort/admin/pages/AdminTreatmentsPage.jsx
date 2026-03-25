import { Add } from "@mui/icons-material";
import { useTreatment } from "../../providers/TreatmentProvider";
import CreateTreatment from "../components/treatments/CreateTreatment";
import TreatmentsDataList from "../components/treatments/TreatmentsDataList";
import {
  Typography,
  Fab,
  Dialog,
  DialogContent,
  DialogTitle,
  Box,
} from "@mui/material";

function AdminTreatmentsPage() {
  const { isDialogOpen, setIsDialogOpen, setTreatment } = useTreatment();
  return (
    <Box sx={{ position: "relative", minHeight: "80vh" }}>
      <Fab
        sx={{ position: "fixed", bottom: 20, right: 20 }}
        color="primary"
        onClick={() => {
          setTreatment(null);
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
        maxWidth="lg"
      >
        <DialogTitle>Create New Treatment</DialogTitle>
        <DialogContent dividers>
          <CreateTreatment />
        </DialogContent>
      </Dialog>
      <TreatmentsDataList />
    </Box>
  );
}

export default AdminTreatmentsPage;
