import { Add } from "@mui/icons-material";
import { useWorkshop } from "../../providers/WorkshopProvider";
import CreateWorkshop from "../components/workshops/CreateWorkshop";
import WorkshopsDataList from "../components/workshops/WorkshopsDataList";
import {
  Typography,
  Fab,
  Dialog,
  DialogContent,
  DialogTitle,
  Box,
} from "@mui/material";

function AdminWorkshopsPage() {
  const { isDialogOpen, setIsDialogOpen, setWorkshop } = useWorkshop();
  return (
    <Box sx={{ position: "relative", minHeight: "80vh" }}>
      <Fab
        sx={{ position: "fixed", bottom: 20, right: 20 }}
        color="primary"
        onClick={() => {
          setWorkshop(null);
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
        <DialogTitle>Create New Workshop</DialogTitle>
        <DialogContent dividers>
          <CreateWorkshop />
        </DialogContent>
      </Dialog>
      <WorkshopsDataList />
    </Box>
  );
}

export default AdminWorkshopsPage;
