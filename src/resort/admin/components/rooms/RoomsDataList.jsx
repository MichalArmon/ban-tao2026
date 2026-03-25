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

import { useRoom } from "../../../providers/RoomProvider";
import EditRoom from "./EditRoom";
import CreateRoom from "./CreateRoom";

function RoomsDataList() {
  const { getRoomsFromServer, rooms, handleDeleteRoom, handleGetRoom } =
    useRoom();
  useEffect(() => {
    getRoomsFromServer();
    console.log(rooms);
  }, []);
  const [roomSelected, setRoomSelected] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  if (rooms.length === 0) {
    <Typography>NO Rooms to show!</Typography>;
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
              <TableCell sx={{ top: 0 }}>Title</TableCell>
              <TableCell sx={{ top: 0 }}>Slug</TableCell>
              <TableCell sx={{ top: 0 }}>blurB</TableCell>
              <TableCell sx={{ top: 0 }}>Features</TableCell>
              <TableCell sx={{ top: 0 }}>PriceBase</TableCell>
              <TableCell sx={{ top: 0 }}>SizeM2</TableCell>
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
            {rooms.map((room, i) => (
              <TableRow key={i}>
                <TableCell>{room.title}</TableCell>
                <TableCell>{room.slug}</TableCell>
                <TableCell>{room.blurb}</TableCell>
                <TableCell>{room.features}</TableCell>
                <TableCell>{room.priceBase}</TableCell>
                <TableCell>{room.sizeM2}</TableCell>
                <TableCell>
                  <Button
                    onClick={() => {
                      setIsDialogOpen(true);
                      setRoomSelected(room._id);
                    }}
                  >
                    <Edit />
                  </Button>
                </TableCell>
                <TableCell>
                  <Button
                    onClick={() => {
                      handleDeleteRoom(room._id);
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
          setRoomSelected(null);
        }}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>Edit Room</DialogTitle>
        <DialogContent dividers>
          {roomSelected && (
            <EditRoom
              roomSelected={roomSelected}
              setIsDialogOpen={setIsDialogOpen}
            />
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}

export default RoomsDataList;
