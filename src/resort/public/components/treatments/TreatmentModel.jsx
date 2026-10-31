import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  IconButton,
  Button,
  Dialog,
  DialogContent,
  Stack,
  Divider,
  CircularProgress,
  useMediaQuery,
  useTheme,
} from "@mui/material";

import {
  ChevronLeft,
  ChevronRight,
  Close,
  AccessTimeOutlined,
  CalendarMonthOutlined,
  ArrowForwardOutlined,
} from "@mui/icons-material";

import dayjs from "dayjs";

import { useTreatment } from "../../../providers/TreatmentProvider";
import { useSnackBar } from "../../../providers/SnackBarProvider";
import { useUser } from "../../../providers/UserProvider";
import { useTreatmentReservation } from "../../../providers/TreatmentReservationProvider";
import { useNavigate } from "react-router-dom";

export default function TreatmentModel({
  treatmentId,
  open,
  onClose,
  title,
  price,
  currency,
  duration,
}) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const navigate = useNavigate();

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
  const [loadingHours, setLoadingHours] = useState(false);
  const [booking, setBooking] = useState(false);
  const [availabilityError, setAvailabilityError] = useState(false);

  // RESET SELECTION WHEN MODAL OPENS
  useEffect(() => {
    if (!open) return;

    const today = dayjs();

    setCurrentWeekStart(today.startOf("week"));
    setSelectedDate(today);
    setSelectedTime("");
    setAvailableHours([]);
    setAvailabilityError(false);
  }, [open, treatmentId]);

  // FETCH AVAILABLE TIMES
  useEffect(() => {
    if (!open || !treatmentId) return;

    let active = true;

    const getAvailableHours = async () => {
      setLoadingHours(true);
      setAvailabilityError(false);
      setAvailableHours([]);
      setSelectedTime("");

      try {
        if (selectedDate.day() === 6) {
          if (active) setAvailableHours([]);
          return;
        }

        const hours = await handleGetTreatmentsAvailability(
          treatmentId,
          selectedDate,
        );

        if (!active) return;

        if (!Array.isArray(hours)) {
          setAvailabilityError(true);
          setAvailableHours([]);
          return;
        }

        setAvailableHours(hours);
      } catch (error) {
        console.error("Availability error:", error);

        if (active) {
          setAvailabilityError(true);
          setAvailableHours([]);
        }
      } finally {
        if (active) setLoadingHours(false);
      }
    };

    getAvailableHours();

    return () => {
      active = false;
    };

    // Fetch when date or treatment changes.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, treatmentId, selectedDate]);

  const handleNextWeek = () => {
    const nextWeek = currentWeekStart.add(1, "week");

    setCurrentWeekStart(nextWeek);
    setSelectedDate(nextWeek);
  };

  const handlePrevWeek = () => {
    const previousWeek = currentWeekStart.subtract(1, "week");

    if (previousWeek.endOf("week").isBefore(dayjs(), "day")) {
      return;
    }

    setCurrentWeekStart(previousWeek);

    const today = dayjs();

    setSelectedDate(previousWeek.isSame(today, "week") ? today : previousWeek);
  };

  const handleDateSelect = (date) => {
    if (date.isBefore(dayjs(), "day")) return;
    if (date.day() === 6) return;

    setSelectedDate(date);
  };

  const handleReservation = async () => {
    if (!user) {
      setSnack("warning", "Please log in to continue.");
      return;
    }

    if (!selectedTime || booking) return;

    const reservation = {
      userId: user._id,
      treatmentId,
      guestsCount: 1,
      date: selectedDate,
      startTime: selectedTime,
      priceAtBooking: price,
      currency,
      durationAtBooking: duration,
      status: "pending",
    };

    try {
      setBooking(true);

      const reservationId = await handleCreateTreatmentReservation(reservation);

      if (!reservationId) {
        setSnack("error", "Unable to create your reservation.");
        return;
      }

      onClose();
      navigate(`/resort/treatments/${reservationId}/order`);
    } catch (error) {
      console.error("Reservation error:", error);
      setSnack("error", "Something went wrong. Please try again.");
    } finally {
      setBooking(false);
    }
  };

  const weekDays = Array.from({ length: 7 }, (_, index) =>
    currentWeekStart.add(index, "day"),
  );

  const canGoBack = currentWeekStart
    .subtract(1, "week")
    .endOf("week")
    .isAfter(dayjs().subtract(1, "day"));

  const formattedPrice =
    price != null ? `${price} ${currency || ""}`.trim() : null;

  return (
    <Dialog
      open={open}
      onClose={booking ? undefined : onClose}
      fullWidth
      fullScreen={isMobile}
      maxWidth="sm"
      scroll="paper"
      PaperProps={{
        sx: {
          borderRadius: { xs: 0, sm: 3 },
          bgcolor: "background.paper",
          backgroundImage: "none",
          maxHeight: { sm: "90vh" },
          m: { xs: 0, sm: 2 },
          boxShadow: {
            sm: "0 18px 60px rgba(0,0,0,0.12)",
          },
        },
      }}
    >
      {/* HEADER */}
      <Box
        sx={{
          px: { xs: 2.5, sm: 4 },
          pt: { xs: 3, sm: 4 },
          pb: 2.5,
          position: "relative",
        }}
      >
        <IconButton
          onClick={onClose}
          disabled={booking}
          aria-label="Close booking"
          sx={{
            position: "absolute",
            right: { xs: 12, sm: 20 },
            top: { xs: 16, sm: 22 },
            color: "text.secondary",
          }}
        >
          <Close />
        </IconButton>

        <Typography
          sx={{
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "primary.main",
            mb: 1.5,
            pr: 5,
          }}
        >
          WELLNESS AT BAN TAO
        </Typography>

        <Typography
          component="h2"
          sx={{
            fontSize: { xs: 28, sm: 34 },
            fontWeight: 500,
            letterSpacing: "-0.035em",
            lineHeight: 1.2,
            color: "text.primary",
            pr: 5,
          }}
        >
          Book Your Treatment
        </Typography>

        <Typography
          sx={{
            color: "text.secondary",
            fontSize: 14,
            lineHeight: 1.7,
            mt: 1.2,
          }}
        >
          Choose a date and time that works for you.
        </Typography>
      </Box>

      <Divider />

      <DialogContent
        sx={{
          px: { xs: 2.5, sm: 4 },
          py: 3,
        }}
      >
        {/* TREATMENT SUMMARY */}
        <Box
          sx={{
            p: { xs: 2, sm: 2.5 },
            bgcolor: "background.default",
            border: "1px solid",
            borderColor: "divider",
            borderRadius: 2,
            mb: 4,
          }}
        >
          <Typography
            sx={{
              fontSize: 17,
              fontWeight: 600,
              color: "text.primary",
              mb: 1,
            }}
          >
            {title}
          </Typography>

          <Stack
            direction="row"
            alignItems="center"
            flexWrap="wrap"
            useFlexGap
            gap={2.5}
          >
            {duration != null && (
              <Stack direction="row" spacing={0.8} alignItems="center">
                <AccessTimeOutlined
                  sx={{
                    fontSize: 18,
                    color: "primary.main",
                  }}
                />

                <Typography
                  sx={{
                    fontSize: 13,
                    color: "text.secondary",
                  }}
                >
                  {duration} min
                </Typography>
              </Stack>
            )}

            {formattedPrice && (
              <Typography
                sx={{
                  fontSize: 15,
                  fontWeight: 600,
                  color: "text.primary",
                }}
              >
                {formattedPrice}
              </Typography>
            )}
          </Stack>
        </Box>

        {/* DATE SELECTION */}
        <Box sx={{ mb: 4 }}>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            sx={{ mb: 2.5 }}
          >
            <Box>
              <Typography
                sx={{
                  fontSize: 12,
                  fontWeight: 700,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: "text.secondary",
                  mb: 0.5,
                }}
              >
                Select a Date
              </Typography>

              <Typography
                sx={{
                  fontSize: 15,
                  fontWeight: 500,
                  color: "text.primary",
                }}
              >
                {currentWeekStart.format("MMMM YYYY")}
              </Typography>
            </Box>

            {/* WEEK NAVIGATION */}
            <Stack direction="row" spacing={1}>
              <IconButton
                onClick={handlePrevWeek}
                disabled={!canGoBack}
                aria-label="Previous week"
                sx={{
                  width: 36,
                  height: 36,
                  border: "1px solid",
                  borderColor: "divider",
                  color: "text.primary",
                  "&:hover": {
                    bgcolor: "action.hover",
                  },
                }}
              >
                <ChevronLeft />
              </IconButton>

              <IconButton
                onClick={handleNextWeek}
                aria-label="Next week"
                sx={{
                  width: 36,
                  height: 36,
                  border: "1px solid",
                  borderColor: "divider",
                  color: "text.primary",
                  "&:hover": {
                    bgcolor: "action.hover",
                  },
                }}
              >
                <ChevronRight />
              </IconButton>
            </Stack>
          </Stack>

          {/* WEEK CALENDAR */}
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "repeat(7, minmax(0, 1fr))",
              gap: { xs: 0.5, sm: 1 },
            }}
          >
            {weekDays.map((day) => {
              const isSelected = day.isSame(selectedDate, "day");

              const isPast = day.isBefore(dayjs(), "day");
              const isSaturday = day.day() === 6;
              const isDisabled = isPast || isSaturday;

              return (
                <Box
                  key={day.format("YYYY-MM-DD")}
                  component="button"
                  type="button"
                  disabled={isDisabled}
                  onClick={() => handleDateSelect(day)}
                  aria-label={day.format("dddd, MMMM D, YYYY")}
                  aria-pressed={isSelected}
                  sx={{
                    appearance: "none",
                    minWidth: 0,
                    minHeight: { xs: 72, sm: 83 },
                    px: 0.25,
                    py: 1,
                    borderRadius: 1.5,
                    border: "1px solid",
                    borderColor: isSelected ? "primary.main" : "divider",
                    bgcolor: isSelected ? "primary.main" : "background.paper",
                    color: isSelected ? "primary.contrastText" : "text.primary",
                    cursor: isDisabled ? "not-allowed" : "pointer",
                    opacity: isDisabled ? 0.35 : 1,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: 0.5,
                    transition: "background-color 0.2s, border-color 0.2s",

                    "&:hover": isDisabled
                      ? {}
                      : {
                          borderColor: "primary.main",
                          bgcolor: isSelected ? "primary.main" : "action.hover",
                        },

                    "&:focus-visible": {
                      outline: "2px solid",
                      outlineColor: "primary.main",
                      outlineOffset: 2,
                    },
                  }}
                >
                  <Typography
                    component="span"
                    sx={{
                      fontSize: { xs: 10, sm: 11 },
                      fontWeight: 600,
                      color: "inherit",
                    }}
                  >
                    {day.format("ddd")}
                  </Typography>

                  <Typography
                    component="span"
                    sx={{
                      fontSize: { xs: 18, sm: 22 },
                      lineHeight: 1.2,
                      fontWeight: isSelected ? 700 : 500,
                      color: "inherit",
                    }}
                  >
                    {day.format("D")}
                  </Typography>
                </Box>
              );
            })}
          </Box>

          <Stack direction="row" alignItems="center" spacing={1} sx={{ mt: 2 }}>
            <CalendarMonthOutlined
              sx={{
                fontSize: 16,
                color: "text.secondary",
              }}
            />

            <Typography
              sx={{
                fontSize: 12,
                color: "text.secondary",
              }}
            >
              {selectedDate.format("dddd, MMMM D, YYYY")}
            </Typography>
          </Stack>
        </Box>

        <Divider sx={{ mb: 3.5 }} />

        {/* TIME SELECTION */}
        <Box sx={{ mb: 2 }}>
          <Typography
            sx={{
              fontSize: 12,
              fontWeight: 700,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "text.secondary",
              mb: 2.5,
            }}
          >
            Available Times
          </Typography>

          {loadingHours ? (
            <Box
              sx={{
                minHeight: 100,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <CircularProgress size={25} />
            </Box>
          ) : availabilityError ? (
            <Typography
              sx={{
                py: 3,
                textAlign: "center",
                fontSize: 14,
                color: "text.secondary",
              }}
            >
              Unable to load availability. Please try another date.
            </Typography>
          ) : selectedDate.day() === 6 ? (
            <Typography
              sx={{
                py: 3,
                textAlign: "center",
                fontSize: 14,
                color: "text.secondary",
              }}
            >
              We are closed on Saturdays.
            </Typography>
          ) : availableHours.length === 0 ? (
            <Box
              sx={{
                py: 3.5,
                textAlign: "center",
                borderRadius: 2,
                bgcolor: "background.default",
              }}
            >
              <Typography
                sx={{
                  fontSize: 14,
                  color: "text.secondary",
                }}
              >
                No available times for this date.
              </Typography>

              <Typography
                sx={{
                  fontSize: 12,
                  color: "text.secondary",
                  mt: 1,
                }}
              >
                Please select another day.
              </Typography>
            </Box>
          ) : (
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: {
                  xs: "repeat(3, minmax(0, 1fr))",
                  sm: "repeat(4, minmax(0, 1fr))",
                },
                gap: 1.2,
              }}
            >
              {availableHours.map((time) => {
                const isSelected = selectedTime === time;

                return (
                  <Button
                    key={time}
                    variant={isSelected ? "contained" : "outlined"}
                    onClick={() => setSelectedTime(time)}
                    sx={{
                      minHeight: 44,
                      px: 1,
                      borderRadius: 1.5,
                      fontSize: 13,
                      fontWeight: 600,
                      textTransform: "none",
                      boxShadow: "none",
                      borderColor: "divider",
                      color: isSelected
                        ? "primary.contrastText"
                        : "text.primary",

                      "&:hover": {
                        boxShadow: "none",
                        borderColor: "primary.main",
                      },
                    }}
                  >
                    {time}
                  </Button>
                );
              })}
            </Box>
          )}
        </Box>
      </DialogContent>

      {/* FOOTER / BOOKING */}
      <Box
        sx={{
          px: { xs: 2.5, sm: 4 },
          py: 2.5,
          borderTop: "1px solid",
          borderColor: "divider",
          bgcolor: "background.paper",
        }}
      >
        {selectedTime && (
          <Typography
            sx={{
              fontSize: 12,
              textAlign: "center",
              color: "text.secondary",
              mb: 1.5,
            }}
          >
            {selectedDate.format("MMM D, YYYY")} · {selectedTime}
          </Typography>
        )}

        <Button
          fullWidth
          variant="contained"
          size="large"
          endIcon={
            booking ? (
              <CircularProgress size={18} color="inherit" />
            ) : (
              <ArrowForwardOutlined />
            )
          }
          disabled={!selectedTime || loadingHours || booking}
          onClick={handleReservation}
          sx={{
            minHeight: 52,
            borderRadius: 1.5,
            fontSize: 14,
            fontWeight: 700,
            letterSpacing: "0.03em",
            textTransform: "none",
            boxShadow: "none",
            "&:hover": {
              boxShadow: "none",
            },
          }}
        >
          {booking ? "Processing..." : "Continue to Booking"}
        </Button>
      </Box>
    </Dialog>
  );
}
