import UsersDataList from "../components/Users/UsersDataList";
import { Fab, Dialog, DialogContent, DialogTitle, Box } from "@mui/material";
import { Add } from "@mui/icons-material";

import { useUser } from "../../providers/UserProvider";

import CreateUserAdmin from "../components/users/CreateUserAdmin";

function AdminUsersPage() {
  const { isDialogOpen, setIsDialogOpen, setUser } = useUser();
  return (
    <Box sx={{ position: "relative", minHeight: "80vh" }}>
      <Fab
        sx={{ position: "fixed", bottom: 20, right: 20 }}
        color="primary"
        onClick={() => {
          setUser(null);
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
        <DialogTitle>Create New User</DialogTitle>
        <DialogContent dividers>
          <CreateUserAdmin />
        </DialogContent>
      </Dialog>
      <UsersDataList />
    </Box>
  );
}

export default AdminUsersPage;
