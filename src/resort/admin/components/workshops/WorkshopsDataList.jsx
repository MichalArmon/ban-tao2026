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

import { useWorkshop } from "../../../providers/WorkshopProvider";
import EditWorkshop from "./EditWorkshop";

function WorkshopsDataList() {
  const { getWorkshopsFromServer, workshops, handleDeleteWorkshop } =
    useWorkshop();
  useEffect(() => {
    getWorkshopsFromServer();
    console.log(workshops);
  }, []);
  const [workshopSelected, setWorkshopSelected] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  if (workshops.length === 0) {
    <Typography>NO Workshops to show!</Typography>;
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
              <TableCell sx={{ top: 0 }}>instructor</TableCell>
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
            {workshops.map((workshop, i) => (
              <TableRow key={i}>
                <TableCell>{workshop.title}</TableCell>
                <TableCell>{workshop.slug}</TableCell>
                <TableCell>{workshop.description}</TableCell>
                <TableCell>{workshop.instructor}</TableCell>
                <TableCell>{workshop.price}</TableCell>
                <TableCell>{workshop.level}</TableCell>
                <TableCell>
                  <Button
                    onClick={() => {
                      setIsDialogOpen(true);
                      setWorkshopSelected(workshop._id);
                    }}
                  >
                    <Edit />
                  </Button>
                </TableCell>
                <TableCell>
                  <Button
                    onClick={() => {
                      handleDeleteWorkshop(workshop._id);
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
          setWorkshopSelected(null);
        }}
        fullWidth={true}
        maxWidth="lg"
      >
        <DialogTitle>Edit Workshop</DialogTitle>
        <DialogContent dividers>
          {workshopSelected && (
            <EditWorkshop
              WorkshopSelected={workshopSelected}
              setIsDialogOpen={setIsDialogOpen}
            />
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}

export default WorkshopsDataList;
