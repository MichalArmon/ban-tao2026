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

import React, { useEffect, useState } from "react";

import { useRoomReservation } from "../../../providers/RoomReservationProvider";
import EditRoomReservation from "./EditRoomReservation";

function RoomReservationsDataList() {
  const {
    getRoomReservationsFromServer,
    roomReservations,
    handleDeleteRoomReservation,
  } = useRoomReservation();
  useEffect(() => {
    getRoomReservationsFromServer();
    console.log(roomReservations);
  }, []);
  const [roomReservationSelected, setRoomReservationSelected] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  if (roomReservations.length === 0) {
    <Typography>NO RoomReservations to show!</Typography>;
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
              <TableCell sx={{ top: 0 }}>Reservation ID</TableCell>
              <TableCell sx={{ top: 0 }}>Room id</TableCell>
              <TableCell sx={{ top: 0 }}>User id</TableCell>
              <TableCell sx={{ top: 0 }}>Check in</TableCell>
              <TableCell sx={{ top: 0 }}>Check out</TableCell>
              <TableCell sx={{ top: 0 }}>Status</TableCell>
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
            {roomReservations.map((roomReservation, i) => (
              <TableRow key={i}>
                <TableCell>{roomReservation._id}</TableCell>
                <TableCell>{roomReservation.roomId}</TableCell>
                <TableCell>{roomReservation.userId}</TableCell>
                <TableCell>{roomReservation.checkIn}</TableCell>
                <TableCell>{roomReservation.checkOut}</TableCell>
                <TableCell>{roomReservation.status}</TableCell>
                <TableCell>
                  <Button
                    onClick={() => {
                      setIsDialogOpen(true);
                      setRoomReservationSelected(roomReservation._id);
                    }}
                  >
                    <Edit />
                  </Button>
                </TableCell>
                <TableCell>
                  <Button
                    onClick={() => {
                      handleDeleteRoomReservation(roomReservation._id);
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
          setRoomReservationSelected(null);
        }}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>Edit RoomReservation</DialogTitle>
        <DialogContent dividers>
          {roomReservationSelected && (
            <EditRoomReservation
              roomReservationSelected={roomReservationSelected}
              setIsDialogOpen={setIsDialogOpen}
            />
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}

export default RoomReservationsDataList;
