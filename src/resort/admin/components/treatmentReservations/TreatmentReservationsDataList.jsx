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

import { useTreatmentReservation } from "../../../providers/TreatmentReservationProvider";
import EditTreatmentReservation from "./EditTreatmentReservation";
import { useUser } from "../../../providers/UserProvider";
import { useTreatment } from "../../../providers/TreatmentProvider";
import { formatDate } from "../../../utils/date/dateUtils";

function TreatmentReservationsDataList() {
  const {
    getTreatmentReservationsFromServer,
    treatmentReservations,
    handleDeleteTreatmentReservation,
  } = useTreatmentReservation();
  const { getUsersFromServer, users, setUsers } = useUser();
  const { getTreatmentsFromServer, treatments, setTreatments } = useTreatment();
  useEffect(() => {
    const gatInitialData = async () => {
      const currentUsers = await getUsersFromServer();
      const currentTreatments = await getTreatmentsFromServer();
      await getTreatmentReservationsFromServer();

      setUsers(currentUsers);
      setTreatments(currentTreatments);
    };
    gatInitialData();
    console.log(treatmentReservations);
  }, []);
  const [treatmentReservationSelected, setTreatmentReservationSelected] =
    useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const getTreatmentTitle = (treatmentId) => {
    const treatment = treatments.find(
      (treatment) => treatment._id === treatmentId,
    );
    return treatment ? treatment.title : "Unknown Treatment";
  };

  const getUserName = (userId) => {
    const user = users.find((u) => u._id === userId);
    return user ? `${user.firstName} ${user.lastName || ""}` : "Unknown User";
  };

  // 1. קודם בודקים אם המשתנים קיימים בכלל. אם לא - סימן שאנחנו עדיין מחכים לשרת.
  if (!treatmentReservations || !users || !treatments) {
    return (
      <Typography sx={{ textAlign: "center", mt: 5 }}>
        Loading data...
      </Typography>
    );
  }

  // 2. אם הגענו לכאן, המשתנים בוודאות קיימים והם מערכים. עכשיו בטוח לבדוק את האורך שלהם.
  if (
    treatmentReservations.length === 0 ||
    users.length === 0 ||
    treatments.length === 0
  ) {
    return (
      <Typography sx={{ textAlign: "center", mt: 5 }}>
        NO TreatmentReservations to show!
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
              <TableCell sx={{ top: 0 }}>Treatment id</TableCell>
              <TableCell sx={{ top: 0 }}>User id</TableCell>
              <TableCell sx={{ top: 0 }}>date</TableCell>
              <TableCell sx={{ top: 0 }}>Start time</TableCell>
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
            {treatmentReservations.map((treatmentReservation, i) => (
              <TableRow key={i}>
                <TableCell>{treatmentReservation._id}</TableCell>
                <TableCell>
                  {getTreatmentTitle(treatmentReservation.treatmentId)}
                </TableCell>
                <TableCell>
                  {getUserName(treatmentReservation.userId)}
                </TableCell>
                <TableCell>{formatDate(treatmentReservation.date)}</TableCell>
                <TableCell>{treatmentReservation.startTime}</TableCell>
                <TableCell>{treatmentReservation.status}</TableCell>
                <TableCell>
                  <Button
                    onClick={() => {
                      setIsDialogOpen(true);
                      setTreatmentReservationSelected(treatmentReservation._id);
                    }}
                  >
                    <Edit />
                  </Button>
                </TableCell>
                <TableCell>
                  <Button
                    onClick={() => {
                      handleDeleteTreatmentReservation(
                        treatmentReservation._id,
                      );
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
          setTreatmentReservationSelected(null);
        }}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>Edit TreatmentReservation</DialogTitle>
        <DialogContent dividers>
          {treatmentReservationSelected && (
            <EditTreatmentReservation
              treatmentReservationSelected={treatmentReservationSelected}
              setIsDialogOpen={setIsDialogOpen}
            />
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}

export default TreatmentReservationsDataList;
