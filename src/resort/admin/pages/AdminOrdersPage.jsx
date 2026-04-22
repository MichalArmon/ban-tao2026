import OrdersDataList from "../components/orders/OrdersDataList";
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
import { useOrder } from "../../providers/OrderProvider";
import CreateOrder from "../components/orders/CreateOrder";

function AdminOrdersPage() {
  const { isDialogOpen, setIsDialogOpen, setOrder } = useOrder();
  return (
    <Box sx={{ position: "relative", minHeight: "80vh", marginTop: 5 }}>
      <AppBar
        {...props}
        position="fixed"
        sx={(theme) => ({
          zIndex: theme.zIndex.drawer + 1,
          bgcolor: "background.default",
          color: "text.primary",
          justifyContent: "center",
          height: "var(--nav-h)",
          top: top,
        })}
      >
        <Toolbar>משני</Toolbar>
      </AppBar>
      <Fab
        sx={{ position: "fixed", bottom: 20, right: 20 }}
        color="primary"
        onClick={() => {
          setOrder(null);
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
        <DialogTitle>Create New Order</DialogTitle>
        <DialogContent dividers>
          <CreateOrder />
        </DialogContent>
      </Dialog>
      <OrdersDataList />
    </Box>
  );
}

export default AdminOrdersPage;
