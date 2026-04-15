import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Dialog,
  DialogContent,
  DialogTitle,
} from "@mui/material";

import { useRecRule } from "../../../providers/RecRuleProvider";
import EditRecRule from "./EditRecRule";
import RecRuleDayCards from "./RecRuleDayCards";

const daysOfWeek = [
  { label: "Sunday", value: 0 },
  { label: "Monday", value: 1 },
  { label: "Tuesday", value: 2 },
  { label: "Wednesday", value: 3 },
  { label: "Thursday", value: 4 },
  { label: "Friday", value: 5 },
  { label: "Saturday", value: 6 },
];

function RecRuleWeekTable() {
  const { getRecRulesFromServer, recRules } = useRecRule();

  const [recRuleSelected, setRecRuleSelected] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    getRecRulesFromServer();
  }, []);

  if (!recRules || recRules.length === 0) {
    return (
      <Typography sx={{ textAlign: "center", mt: 4 }}>
        NO RecRules to show!
      </Typography>
    );
  }

  return (
    <>
      <Box
        sx={{
          width: "80vw",
          maxWidth: "1600px",
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "repeat(7, 1fr)",
          gap: 2,
          alignItems: "start",
        }}
      >
        {daysOfWeek.map((day) => (
          <Box
            key={day.value}
            sx={{
              border: "1px solid",
              borderColor: "secondary.light",
              borderRadius: 2,
              overflow: "hidden",
              bgcolor: "white",
              minHeight: "300px",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Box
              sx={{
                bgcolor: "secondary.light",
                textAlign: "center",
                fontWeight: 600,
                fontSize: "1.1rem",
                py: 1.5,
              }}
            >
              {day.label}
            </Box>

            <Box
              sx={{
                p: 1,
                flex: 1,
              }}
            >
              <RecRuleDayCards day={day.value} />
            </Box>
          </Box>
        ))}
      </Box>

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
          <EditRecRule recRuleSelected={recRuleSelected} />
        </DialogContent>
      </Dialog>
    </>
  );
}

export default RecRuleWeekTable;
