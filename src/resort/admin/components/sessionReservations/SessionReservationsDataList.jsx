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

import { useSessionReservation } from "../../../providers/SessionReservationProvider";
import EditSessionReservation from "./EditSessionReservation";
import { useUser } from "../../../providers/UserProvider";
import { useSession } from "../../../providers/SessionProvider";
import { formatDate } from "../../../utils/date/dateUtils";

function SessionReservationsDataList() {
  const {
    getSessionReservationsFromServer,
    SessionReservations,
    handleDeleteSessionReservation,
  } = useSessionReservation();
  const { getUsersFromServer, users, setUsers } = useUser();
  const { getSessionsFromServer, Sessions, setSessions } = useSession();
  useEffect(() => {
    const gatInitialData = async () => {
      const currentUsers = await getUsersFromServer();
      const currentSessions = await getSessionsFromServer();
      await getSessionReservationsFromServer();

      setUsers(currentUsers);
      setSessions(currentSessions);
    };
    gatInitialData();
    console.log(SessionReservations);
  }, []);
  const [SessionReservationSelected, setSessionReservationSelected] =
    useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const getSessionTitle = (SessionId) => {
    const Session = Sessions.find((Session) => Session._id === SessionId);
    return Session ? Session.title : "Unknown User";
  };

  const getUserName = (userId) => {
    const user = users.find((u) => u._id === userId);
    return user ? `${user.firstName} ${user.lastName || ""}` : "Unknown User";
  };

  // 1. קודם בודקים אם המשתנים קיימים בכלל. אם לא - סימן שאנחנו עדיין מחכים לשרת.
  if (!SessionReservations || !users || !Sessions) {
    return (
      <Typography sx={{ textAlign: "center", mt: 5 }}>
        Loading data...
      </Typography>
    );
  }

  // 2. אם הגענו לכאן, המשתנים בוודאות קיימים והם מערכים. עכשיו בטוח לבדוק את האורך שלהם.
  if (
    SessionReservations.length === 0 ||
    users.length === 0 ||
    Sessions.length === 0
  ) {
    return (
      <Typography sx={{ textAlign: "center", mt: 5 }}>
        NO SessionReservations to show!
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
              <TableCell sx={{ top: 0 }}>Session id</TableCell>
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
            {SessionReservations.map((SessionReservation, i) => (
              <TableRow key={i}>
                <TableCell>{SessionReservation._id}</TableCell>
                <TableCell>
                  {getSessionTitle(SessionReservation.SessionId)}
                </TableCell>
                <TableCell>{getUserName(SessionReservation.userId)}</TableCell>
                <TableCell>{formatDate(SessionReservation.checkIn)}</TableCell>
                <TableCell>{formatDate(SessionReservation.checkOut)}</TableCell>
                <TableCell>{SessionReservation.status}</TableCell>
                <TableCell>
                  <Button
                    onClick={() => {
                      setIsDialogOpen(true);
                      setSessionReservationSelected(SessionReservation._id);
                    }}
                  >
                    <Edit />
                  </Button>
                </TableCell>
                <TableCell>
                  <Button
                    onClick={() => {
                      handleDeleteSessionReservation(SessionReservation._id);
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
          setSessionReservationSelected(null);
        }}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>Edit SessionReservation</DialogTitle>
        <DialogContent dividers>
          {SessionReservationSelected && (
            <EditSessionReservation
              SessionReservationSelected={SessionReservationSelected}
              setIsDialogOpen={setIsDialogOpen}
            />
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}

export default SessionReservationsDataList;
