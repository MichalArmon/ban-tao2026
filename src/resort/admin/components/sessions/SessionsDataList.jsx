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

import { useSession } from "../../../providers/SessionProvider";
import EditSession from "./EditSession";
import CreateSession from "./CreateSession";

function SessionsDataList() {
  const { getSessionsFromServer, sessions, handleDeleteSession } = useSession();
  useEffect(() => {
    getSessionsFromServer();
    console.log(sessions);
  }, []);
  const [sessionSelected, setSessionSelected] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  if (sessions.length === 0) {
    <Typography>NO Sessions to show!</Typography>;
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
              <TableCell sx={{ top: 0 }}>Workshop ID</TableCell>
              <TableCell sx={{ top: 0 }}>start</TableCell>
              <TableCell sx={{ top: 0 }}>end</TableCell>
              <TableCell sx={{ top: 0 }}>location</TableCell>
              <TableCell sx={{ top: 0 }}>max Cap</TableCell>
              <TableCell sx={{ top: 0 }}>enroll</TableCell>
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
            {sessions.map((session, i) => (
              <TableRow key={i}>
                <TableCell>{session.workshopId}</TableCell>
                <TableCell>{session.startTime}</TableCell>
                <TableCell>{session.endTime}</TableCell>
                <TableCell>{session.location}</TableCell>
                <TableCell>{session.maxCapacity}</TableCell>
                <TableCell>{session.status}</TableCell>
                <TableCell>
                  <Button
                    onClick={() => {
                      setIsDialogOpen(true);
                      setSessionSelected(session._id);
                    }}
                  >
                    <Edit />
                  </Button>
                </TableCell>
                <TableCell>
                  <Button
                    onClick={() => {
                      handleDeleteSession(session._id);
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
          setSessionSelected(null);
        }}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>Edit Session</DialogTitle>
        <DialogContent dividers>
          {sessionSelected && (
            <EditSession
              sessionSelected={sessionSelected}
              setIsDialogOpen={setIsDialogOpen}
            />
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}

export default SessionsDataList;
