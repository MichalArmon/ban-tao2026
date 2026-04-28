import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  IconButton,
  Paper,
  Button,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
} from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import DescriptionIcon from "@mui/icons-material/Description";
import dayjs from "dayjs";
import { useTreatment } from "../../../providers/TreatmentProvider";
import CloseIcon from "@mui/icons-material/Close";
import { useSnackBar } from "../../../providers/SnackBarProvider";
import { useUser } from "../../../providers/UserProvider";
import { useTreatmentReservation } from "../../../providers/TreatmentReservationProvider";
import { useNavigate } from "react-router-dom";

const RED_COLOR = "#d32f2f";

export default function TreatmentModel({
  treatmentId,
  open,
  onClose,
  title,
  price,
  currency,
  duration,
}) {
  const { handleGetTreatmentsAvailability } = useTreatment();
  const { setSnack } = useSnackBar();
  const { user } = useUser();
  const { handleCreateTreatmentReservation } = useTreatmentReservation();

  const [currentWeekStart, setCurrentWeekStart] = useState(
    dayjs().startOf("week"),
  );
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const [selectedTime, setSelectedTime] = useState("");
  const [availableHours, setAvailableHours] = useState([]);
  const navigate = useNavigate("");

  // 2. נתונים מדומים (Mock Data) - באנגלית!
  const dayStatuses = {
    "2026-04-26": "Unavailable",
    "2026-04-27": "*",
    "2026-04-28": "Full",
    "2026-04-30": "Full",
    "2026-05-02": "Closed",
  };
  const isNotLoggedIn = () => {
    setSnack("warning", "please log in");
  };

  const getAvailableHours = async () => {
    const availableHours = await handleGetTreatmentsAvailability(
      treatmentId,
      selectedDate,
    );
    console.log(availableHours);
    setAvailableHours(availableHours);
    if (!availableHours) {
      return <Typography>Loading...</Typography>;
    }
  };
  useEffect(() => {
    getAvailableHours();
  }, [selectedDate, treatmentId]);

  const handleNextWeek = () =>
    setCurrentWeekStart(currentWeekStart.add(1, "week"));
  const handlePrevWeek = () =>
    setCurrentWeekStart(currentWeekStart.subtract(1, "week"));
  const reservation = {
    userId: user._id,
    treatmentId: treatmentId,
    guestsCount: 1,
    date: selectedDate,
    startTime: selectedTime,
    priceAtBooking: price,
    currency: currency,
    durationAtBooking: duration,

    status: "pending",
  };

  const weekDays = [];
  for (let i = 0; i < 7; i++) {
    weekDays.push(currentWeekStart.add(i, "day"));
  }
  const handleReservation = async () => {
    const reservationId = await handleCreateTreatmentReservation(reservation);
    if (!reservationId) {
      console.log("Failed to create reservation - no ID returned");

      return;
    }
    navigate(`/resort/treatments/${reservationId}/order`);
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="xl" fullWidth>
      <DialogTitle
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <Box
        sx={{
          mx: "auto",
          p: 4,
          textAlign: "center",
          borderRadius: 2,
        }}
      >
        <Typography variant="h5" fontWeight="bold" gutterBottom>
          Select Date & Time
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            gap: 3,
            color: "text.secondary",
            mb: 2,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
            <DescriptionIcon fontSize="small" />
            <Typography variant="body2">{title}</Typography>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
            <AccessTimeIcon fontSize="small" />
            <Typography variant="body2">{duration} Minutes</Typography>
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
        <Grid container spacing={1.5} justifyContent="center" sx={{ mb: 4 }}>
          {weekDays.map((dayObj) => {
            const dateString = dayObj.format("YYYY-MM-DD");
            const isSelected = dayObj.isSame(selectedDate, "day");
            const statusText = dayStatuses[dateString];
            return (
              <Grid item key={dateString} xs>
                <Paper
                  onClick={() => {
                    setSelectedDate(dayObj);
                    getAvailableHours();
                  }}
                  elevation={0}
                  sx={{
                    p: 1,
                    cursor: "pointer",
                    borderRadius: 2,
                    // 👇 התיקון שלנו: פיצלנו את הגבול לשני שדות
                    border: isSelected ? "2px solid" : "1px solid transparent",
                    borderColor: isSelected ? "primary.main" : "primary.light",
                    bgcolor: "white",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    minHeight: 80,
                    transition: "all 0.2s",
                    minWidth: 70,
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
                      color:
                        statusText === "Closed" ? "text.primary" : RED_COLOR,
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
          {/* 👇 כאן הוספתי את התנאים ליום שבת או למערך ריק 👇 */}
          {selectedDate.day() === 6 ? (
            <Typography variant="body1" color="text.secondary">
              We are closed on Saturdays. Please choose another day.
            </Typography>
          ) : availableHours.length === 0 ? (
            <Typography variant="body1" color="text.secondary">
              We are fully booked on this day. Please select another date.
            </Typography>
          ) : (
            availableHours.map((time) => (
              <Button
                key={time}
                variant={selectedTime === time ? "contained" : "outlined"}
                onClick={() => setSelectedTime(time)}
                sx={{
                  borderRadius: 20,
                  px: 3,
                  py: 0.5,
                  borderColor: "primary.main",
                  color: selectedTime === time ? "white" : "primary.main",
                  bgcolor:
                    selectedTime === time ? "primary.main" : "transparent",
                  "&:hover": {
                    borderColor: "primary.main",
                    bgcolor:
                      selectedTime === time
                        ? "primary.main"
                        : "rgba(121, 85, 72, 0.08)",
                  },
                }}
              >
                {time}
              </Button>
            ))
          )}
        </Box>
        {/* --- כותרת תחתונה --- */}
        <Typography variant="body2" color="text.secondary">
          Want to join the waiting list?{" "}
          <span
            style={{
              color: "primary.main",
              textDecoration: "underline",
              cursor: "pointer",
            }}
          >
            Download the app
          </span>{" "}
          now and enjoy additional features!
        </Typography>
        <Box
          sx={{
            mt: 4,
          }}
        >
          <Button
            variant="contained"
            sx={{
              px: 5,
              backgroundColor: "primary.main",
              "&:hover": { backgroundColor: "primary.dark" },
            }}
            onClick={
              user
                ? () => handleReservation()
                : () => {
                    isNotLoggedIn();
                  }
            }
          >
            BOOK
          </Button>
        </Box>
      </Box>
    </Dialog>
  );
}
