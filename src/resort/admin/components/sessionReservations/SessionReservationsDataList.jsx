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
import { useWorkshop } from "../../../providers/WorkshopProvider";

function SessionReservationsDataList() {
  const {
    getSessionReservationsFromServer,
    sessionReservations,
    handleDeleteSessionReservation,
  } = useSessionReservation();
  const { getUsersFromServer, users, setUsers } = useUser();
  const { getSessionsFromServer, sessions, setSessions } = useSession();
  const { getWorkshopsFromServer, workshops, setWorkshops } = useWorkshop();
  useEffect(() => {
    const gatInitialData = async () => {
      const currentUsers = await getUsersFromServer();
      const currentSessions = await getSessionsFromServer();
      const currentWorkshops = await getWorkshopsFromServer();
      await getSessionReservationsFromServer();

      setUsers(currentUsers);
      setSessions(currentSessions);
      setWorkshops(currentWorkshops);
    };
    gatInitialData();
    console.log(sessionReservations, workshops);
  }, []);
  const [sessionReservationSelected, setSessionReservationSelected] =
    useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const getSessionTitle = (SessionId) => {
    const session = sessions.find((session) => session._id === SessionId);
    return session ? session.title : "Unknown User";
  };

  const getUserName = (userId) => {
    const user = users.find((u) => u._id === userId);
    return user ? `${user.firstName} ${user.lastName || ""}` : "Unknown User";
  };
  const getWorkshopTitle = (sessionId) => {
    const session = sessions.find((session) => session._id === sessionId);
    if (!session) return "Unknown Session";
    const workshopId = session.workshopId;

    const workshop = workshops.find((workshop) => workshop._id === workshopId);
    return workshop ? workshop.title : "";
  };

  const getSessionDate = (sessionId) => {
    const session = sessions.find((session) => session._id === sessionId);
    return session ? session.startTime : "";
  };

  console.log("Data Status:", {
    sessionReservations,
    users,
    sessions,
    workshops,
  });
  if (!sessionReservations || !users || !sessions || !workshops) {
    return (
      <Typography sx={{ textAlign: "center", mt: 5 }}>
        Loading data...
      </Typography>
    );
  }

  // 2. אם הגענו לכאן, המשתנים בוודאות קיימים והם מערכים. עכשיו בטוח לבדוק את האורך שלהם.
  if (
    sessionReservations.length === 0 ||
    users.length === 0 ||
    sessions.length === 0 ||
    workshops.length === 0
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
              <TableCell sx={{ top: 0 }}>Date</TableCell>
              <TableCell sx={{ top: 0 }}></TableCell>
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
            {sessionReservations.map((sessionReservation, i) => (
              <TableRow key={i}>
                <TableCell>{sessionReservation._id}</TableCell>
                <TableCell>{sessionReservation.sessionId}</TableCell>
                <TableCell>{getUserName(sessionReservation.userId)}</TableCell>
                <TableCell>
                  {formatDate(getSessionDate(sessionReservation.sessionId))}
                </TableCell>
                <TableCell>{formatDate(sessionReservation.checkOut)}</TableCell>
                <TableCell>{sessionReservation.status}</TableCell>
                <TableCell>
                  <Button
                    onClick={() => {
                      setIsDialogOpen(true);
                      setSessionReservationSelected(sessionReservation._id);
                    }}
                  >
                    <Edit />
                  </Button>
                </TableCell>
                <TableCell>
                  <Button
                    onClick={() => {
                      handleDeleteSessionReservation(sessionReservation._id);
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
          {sessionReservationSelected && (
            <EditSessionReservation
              SessionReservationSelected={sessionReservationSelected}
              setIsDialogOpen={setIsDialogOpen}
            />
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}

export default SessionReservationsDataList;
