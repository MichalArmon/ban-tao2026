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
} from "@mui/material";
import { Add } from "@mui/icons-material";

import React, { useEffect, useState } from "react";

import { useRoom } from "../../providers/RoomProvider";

function RoomsDataList() {
  const { getRoomsFromServer, rooms, handleDeleteRoom } = useRoom();
  useEffect(() => {
    getRoomsFromServer();
    console.log(rooms);
  }, []);
  if (rooms === 0) {
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
                <TableCell>{room.blurb}</TableCell>
                <TableCell>{room.features}</TableCell>
                <TableCell>{room.priceBase}</TableCell>
                <TableCell>{room.sizeM2}</TableCell>
                <TableCell>
                  <Edit />
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
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

export default RoomsDataList;
