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

import { useRecRule } from "../../../providers/RecRuleProvider";

import EditSession from "../sessions/EditSession";

function RecRulesDataList() {
  const { getRecRulesFromServer, recRules, handleDeleteRecRule } = useRecRule();
  useEffect(() => {
    getRecRulesFromServer();
    console.log(recRules);
  }, []);
  const [recRuleSelected, setRecRuleSelected] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  if (recRules.length === 0) {
    <Typography>NO RecRules to show!</Typography>;
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
              <TableCell sx={{ top: 0 }}>workshop</TableCell>
              <TableCell sx={{ top: 0 }}>daysOfWeek</TableCell>
              <TableCell sx={{ top: 0 }}>hour</TableCell>
              <TableCell sx={{ top: 0 }}>location</TableCell>
              <TableCell sx={{ top: 0 }}>maxCapacity</TableCell>
              <TableCell sx={{ top: 0 }}>endDate</TableCell>
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
            {recRules.map((recRule, i) => (
              <TableRow key={i}>
                <TableCell>{recRule.workshopId}</TableCell>
                <TableCell>{recRule.daysOfWeek}</TableCell>
                <TableCell>{recRule.hour}</TableCell>
                <TableCell>{recRule.location}</TableCell>
                <TableCell>{recRule.maxCapacity}</TableCell>
                <TableCell>{recRule.endDate}</TableCell>
                <TableCell>
                  <Button
                    onClick={() => {
                      setIsDialogOpen(true);
                      setRecRuleSelected(recRule._id);
                    }}
                  >
                    <Edit />
                  </Button>
                </TableCell>
                <TableCell>
                  <Button
                    onClick={() => {
                      handleDeleteRecRule(recRule._id);
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
          setRecRuleSelected(null);
        }}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>Edit RecRule</DialogTitle>
        <DialogContent dividers>
          {/* {recRuleSelected && (
            // <EditSession
            //   sessionSelected={recRuleSelected}
            //   setIsDialogOpen={setIsDialogOpen}
            // />
          )} */}
        </DialogContent>
      </Dialog>
    </>
  );
}

export default RecRulesDataList;
