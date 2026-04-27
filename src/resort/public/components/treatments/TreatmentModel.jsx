import React, { useState } from "react";
import {
  Box,
  Typography,
  IconButton,
  Paper,
  Button,
  Grid,
} from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import DescriptionIcon from "@mui/icons-material/Description";
import dayjs from "dayjs";

// צבעים מתוך העיצוב שלך
const BROWN_COLOR = "#795548";
const RED_COLOR = "#d32f2f";

export default function BookingTimeSelector() {
  // 1. ניהול מצבים (States)
  const [currentWeekStart, setCurrentWeekStart] = useState(
    dayjs().startOf("week"),
  );
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const [selectedTime, setSelectedTime] = useState("");

  // 2. נתונים מדומים (Mock Data) - באנגלית!
  const dayStatuses = {
    "2026-04-26": "Unavailable",
    "2026-04-27": "*",
    "2026-04-28": "Full",
    "2026-04-30": "Full",
    "2026-05-02": "Closed",
  };

  const availableHours = ["09:30", "10:45", "11:15"];

  // 3. פונקציות עזר - עכשיו כשאנחנו באנגלית, פלוס זה ימינה ומינוס זה שמאלה
  const handleNextWeek = () =>
    setCurrentWeekStart(currentWeekStart.add(1, "week"));
  const handlePrevWeek = () =>
    setCurrentWeekStart(currentWeekStart.subtract(1, "week"));

  // יצירת מערך של 7 ימים
  const weekDays = [];
  for (let i = 0; i < 7; i++) {
    weekDays.push(currentWeekStart.add(i, "day"));
  }

  return (
    <Box
      sx={{
        mx: "auto",
        p: 2,
        textAlign: "center",

        borderRadius: 2,
      }}
    >
      {/* --- אזור כותרות --- */}
      <Typography variant="h5" fontWeight="bold" gutterBottom>
        Select Date & Time
      </Typography>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: 2,
          color: "text.secondary",
          mb: 2,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
          <DescriptionIcon fontSize="small" />
          <Typography variant="body2">Swedish Massage</Typography>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
          <AccessTimeIcon fontSize="small" />
          <Typography variant="body2">75 Minutes</Typography>
        </Box>
      </Box>

      {/* --- ניווט שבועות --- */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
        }}
      >
        {/* חץ שמאלה (Prev Week) */}
        <IconButton
          onClick={handlePrevWeek}
          sx={{
            bgcolor: "primary.main",
            color: "white",
            "&:hover": { bgcolor: "primary.main" },
            width: 32,
            height: 32,
          }}
        >
          <ArrowBackIosIcon sx={{ fontSize: 14, ml: 0.5 }} />
        </IconButton>

        <Typography
          variant="subtitle1"
          fontWeight="bold"
          color="text.secondary"
          sx={{ textDecoration: "underline" }}
        >
          {selectedDate.format("DD/MM/YYYY")}
        </Typography>

        {/* חץ ימינה (Next Week) */}
        <IconButton
          onClick={handleNextWeek}
          sx={{
            bgcolor: "primary.main",
            color: "background.default",
            "&:hover": { bgcolor: "primary.main" },
            width: 32,
            height: 32,
          }}
        >
          <ArrowForwardIosIcon sx={{ fontSize: 14 }} />
        </IconButton>
      </Box>

      {/* --- שורת הימים --- */}

      <Grid container spacing={1} justifyContent="center" sx={{ mb: 4 }}>
        {weekDays.map((dayObj) => {
          const dateString = dayObj.format("YYYY-MM-DD");
          const isSelected = dayObj.isSame(selectedDate, "day");
          const statusText = dayStatuses[dateString];

          return (
            <Grid item key={dateString} xs>
              <Paper
                onClick={() => setSelectedDate(dayObj)}
                elevation={0}
                sx={{
                  p: 1,
                  cursor: "pointer",
                  borderRadius: 2,
                  // 👇 התיקון שלנו: פיצלנו את הגבול לשני שדות
                  border: isSelected ? "2px solid" : "1px solid transparent",
                  borderColor: isSelected ? "primary.main" : "transparent",
                  bgcolor: "white",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  minHeight: "75px",
                  transition: "all 0.2s",
                  minWidth: 100,
                }}
              >
                {/* פורמט 'ddd' נותן לנו Sun, Mon, Tue... */}
                <Typography variant="body2" fontWeight="bold">
                  {dayObj.format("ddd")}
                </Typography>

                <Typography variant="h6" sx={{ lineHeight: 1 }}>
                  {dayObj.format("D")}
                </Typography>

                <Typography
                  variant="caption"
                  sx={{
                    color: statusText === "Closed" ? "text.primary" : RED_COLOR,
                    fontWeight: "bold",
                    mt: 0.5,
                    fontSize: "0.7rem",
                  }}
                >
                  {statusText || "\u00A0"}
                </Typography>
              </Paper>
            </Grid>
          );
        })}
      </Grid>

      {/* --- אזור השעות --- */}
      <Typography variant="subtitle1" fontWeight="bold" sx={{ mb: 2 }}>
        Available Times:
      </Typography>

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          flexWrap: "wrap",
          gap: 2,
          mb: 4,
        }}
      >
        {availableHours.map((time) => (
          <Button
            key={time}
            variant={selectedTime === time ? "contained" : "outlined"}
            onClick={() => setSelectedTime(time)}
            sx={{
              borderRadius: 20,
              px: 3,
              py: 0.5,
              borderColor: BROWN_COLOR,
              color: selectedTime === time ? "white" : BROWN_COLOR,
              bgcolor: selectedTime === time ? BROWN_COLOR : "transparent",
              "&:hover": {
                borderColor: BROWN_COLOR,
                bgcolor:
                  selectedTime === time
                    ? BROWN_COLOR
                    : "rgba(121, 85, 72, 0.08)",
              },
            }}
          >
            {time}
          </Button>
        ))}
      </Box>

      {/* --- כותרת תחתונה --- */}
      <Typography variant="body2" color="text.secondary">
        Want to join the waiting list?{" "}
        <span
          style={{
            color: BROWN_COLOR,
            textDecoration: "underline",
            cursor: "pointer",
          }}
        >
          Download the app
        </span>{" "}
        now and enjoy additional features!
      </Typography>
    </Box>
  );
}
