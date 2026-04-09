import {
  Delete,
  Edit,
  KeyboardArrowDown,
  KeyboardArrowUp,
} from "@mui/icons-material";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { Add } from "@mui/icons-material";

import React, { useEffect, useState } from "react";

import { useOrder } from "../../../providers/OrderProvider";
import EditOrder from "./EditOrder";
import CreateOrder from "./CreateOrder";

function OrdersDataList() {
  const { getOrdersFromServer, orders, handleDeleteOrder, handleGetOrder } =
    useOrder();
  useEffect(() => {
    getOrdersFromServer();
    console.log(orders);
  }, []);
  const [orderSelected, setOrderSelected] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  if (orders.length === 0) {
    <Typography>NO Orders to show!</Typography>;
  }
  return (
    <>
      <TableContainer
        sx={{ width: "80vw", maxHeight: "90vh ", margin: "0 auto" }}
      >
        <Table
          size="small"
          sx={{
            width: "100%",

            "& .MuiTableCell-root": { textAlign: "center" },
          }}
        >
          <TableHead
            sx={{
              "& .MuiTableCell-head": {
                position: "sticky",
                backgroundColor: "#fff",
                zIndex: 10,
                fontWeight: 600,
                fontSize: 18,
              },
            }}
          >
            <TableRow
              sx={{
                "& .MuiTableCell-root": {
                  bgcolor: "secondary.light",
                  fontSize: "1.2rem",
                },
              }}
            >
              <TableCell sx={{ top: 0 }}>user Id</TableCell>
              <TableCell sx={{ top: 0 }}>room Reservations</TableCell>
              <TableCell sx={{ top: 0 }}>spa Reservations</TableCell>
              <TableCell sx={{ top: 0 }}>yogaReservations</TableCell>
              <TableCell sx={{ top: 0 }}>totalPrice</TableCell>
              <TableCell sx={{ top: 0 }}>status</TableCell>
              <TableCell sx={{ top: 0 }}></TableCell>
              <TableCell sx={{ top: 0 }}></TableCell>
              <TableCell sx={{ top: 0 }}></TableCell>
            </TableRow>
          </TableHead>

          <TableBody
            sx={{
              " & .MuiTableCell-root": {
                borderColor: "secondary.light",
                fontFamily: "verdana",
                fontSize: "0.8rem",
              },
              bgcolor: "white",
            }}
          >
            {orders.map((order, i) => (
              <TableRow key={i}>
                <TableCell>{order.userId}</TableCell>
                <TableCell>{order.roomReservations[0]}</TableCell>
                <TableCell>{order.spaReservations}</TableCell>
                <TableCell>{order.yogaReservations}</TableCell>
                <TableCell>{order.totalPrice}</TableCell>
                <TableCell>{order.status}</TableCell>
                <TableCell>
                  <Button
                    onClick={() => {
                      setIsDialogOpen(true);
                      setOrderSelected(order._id);
                    }}
                  >
                    <Edit />
                  </Button>
                </TableCell>
                <TableCell>
                  <Button
                    onClick={() => {
                      handleDeleteOrder(order._id);
                    }}
                  >
                    <Delete />
                  </Button>
                </TableCell>
                <TableCell></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Dialog
        open={isDialogOpen}
        onClose={() => {
          setIsDialogOpen(false);
          setOrderSelected(null);
        }}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>Edit Order</DialogTitle>
        <DialogContent dividers>
          {orderSelected && (
            <EditOrder
              orderSelected={orderSelected}
              setIsDialogOpen={setIsDialogOpen}
            />
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}

export default OrdersDataList;
