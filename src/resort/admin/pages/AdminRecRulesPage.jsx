import RecRulesDataList from "../components/RecRules/RecRulesDataList";
import {
  Typography,
  Fab,
  Dialog,
  DialogContent,
  DialogTitle,
  Box,
} from "@mui/material";
import { Add } from "@mui/icons-material";

import { useRecRule } from "../../providers/RecRuleProvider";
import CreateSession from "../components/sessions/CreateSession";
import CreateRecRule from "../components/RecRules/CreateRecRule";

function AdminRecRulesPage() {
  const { isDialogOpen, setIsDialogOpen, setRecRule } = useRecRule();
  return (
    <Box sx={{ position: "relative", minHeight: "80vh" }}>
      <Fab
        sx={{ position: "fixed", bottom: 20, right: 20 }}
        color="primary"
        onClick={() => {
          setRecRule(null);
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
        <DialogTitle>Create New RecRule</DialogTitle>
        <DialogContent dividers>
          <CreateRecRule />
        </DialogContent>
      </Dialog>
      <RecRulesDataList />
    </Box>
  );
}

export default AdminRecRulesPage;
