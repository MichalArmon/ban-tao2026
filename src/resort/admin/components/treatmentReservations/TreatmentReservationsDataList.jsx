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
import { useUser } from "../../../providers/UserProvider";
import { useRoom } from "../../../providers/RoomProvider";
import { formatDate } from "../../../utils/date/dateUtils";

function RoomReservationsDataList() {
  const {
    getRoomReservationsFromServer,
    roomReservations,
    handleDeleteRoomReservation,
  } = useRoomReservation();
  const { getUsersFromServer, users, setUsers } = useUser();
  const { getRoomsFromServer, rooms, setRooms } = useRoom();
  useEffect(() => {
    const gatInitialData = async () => {
      const currentUsers = await getUsersFromServer();
      const currentRooms = await getRoomsFromServer();
      await getRoomReservationsFromServer();

      setUsers(currentUsers);
      setRooms(currentRooms);
    };
    gatInitialData();
    console.log(roomReservations);
  }, []);
  const [roomReservationSelected, setRoomReservationSelected] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const getRoomTitle = (roomId) => {
    const room = rooms.find((room) => room._id === roomId);
    return room ? room.title : "Unknown User";
  };

  const getUserName = (userId) => {
    const user = users.find((u) => u._id === userId);
    return user ? `${user.firstName} ${user.lastName || ""}` : "Unknown User";
  };

  // 1. קודם בודקים אם המשתנים קיימים בכלל. אם לא - סימן שאנחנו עדיין מחכים לשרת.
  if (!roomReservations || !users || !rooms) {
    return (
      <Typography sx={{ textAlign: "center", mt: 5 }}>
        Loading data...
      </Typography>
    );
  }

  // 2. אם הגענו לכאן, המשתנים בוודאות קיימים והם מערכים. עכשיו בטוח לבדוק את האורך שלהם.
  if (
    roomReservations.length === 0 ||
    users.length === 0 ||
    rooms.length === 0
  ) {
    return (
      <Typography sx={{ textAlign: "center", mt: 5 }}>
        NO RoomReservations to show!
      </Typography>
    );
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
                <TableCell>{getRoomTitle(roomReservation.roomId)}</TableCell>
                <TableCell>{getUserName(roomReservation.userId)}</TableCell>
                <TableCell>{formatDate(roomReservation.checkIn)}</TableCell>
                <TableCell>{formatDate(roomReservation.checkOut)}</TableCell>
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
