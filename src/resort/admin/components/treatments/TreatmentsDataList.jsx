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

import { useTreatment } from "../../../providers/TreatmentProvider";
import EditTreatment from "./EditTreatment";

function TreatmentsDataList() {
  const { getTreatmentsFromServer, treatments, handleDeleteTreatment } =
    useTreatment();
  useEffect(() => {
    getTreatmentsFromServer();
    console.log(treatments);
  }, []);
  const [TreatmentSelected, setTreatmentSelected] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  if (treatments === 0) {
    <Typography>NO treatments to show!</Typography>;
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
              <TableCell sx={{ top: 0 }}>description</TableCell>
              <TableCell sx={{ top: 0 }}>therapist</TableCell>
              <TableCell sx={{ top: 0 }}>Price</TableCell>
              <TableCell sx={{ top: 0 }}>level</TableCell>
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
            {treatments.map((treatment, i) => (
              <TableRow key={i}>
                <TableCell>{treatment.title}</TableCell>
                <TableCell>{treatment.slug}</TableCell>
                <TableCell>{treatment.description}</TableCell>
                <TableCell>{treatment.therapist}</TableCell>
                <TableCell>{treatment.price}</TableCell>
                <TableCell>{treatment.level}</TableCell>
                <TableCell>
                  <Button
                    onClick={() => {
                      setIsDialogOpen(true);
                      setTreatmentSelected(treatment._id);
                    }}
                  >
                    <Edit />
                  </Button>
                </TableCell>
                <TableCell>
                  <Button
                    onClick={() => {
                      handleDeleteTreatment(treatment._id);
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
          setTreatmentSelected(null);
        }}
        fullWidth={true}
        maxWidth="lg"
      >
        <DialogTitle>Edit Treatment</DialogTitle>
        <DialogContent dividers>
          {TreatmentSelected && (
            <EditTreatment
              TreatmentSelected={TreatmentSelected}
              setIsDialogOpen={setIsDialogOpen}
            />
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}

export default TreatmentsDataList;
