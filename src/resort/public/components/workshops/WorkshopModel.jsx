import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Typography,
  Box,
  Button,
  Grid,
  Paper,
  Divider,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import dayjs from "dayjs";
import { useWorkshop } from "../../../providers/WorkshopProvider";
import { useSession } from "../../../providers/SessionProvider";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../../providers/UserProvider";
import { useSessionReservation } from "../../../providers/SessionReservationProvider";

export default function WorkshopModal({ open, onClose, workshopId }) {
  const [groupedSessions, setGroupedSessions] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [weekOffset, setWeekOffset] = useState(0);
  const navigate = useNavigate();
  const { user } = useUser();
  const { sessions, getSessionsFromServer, handleGetSessionByWorkshop } =
    useSession();
  const { handleCreateSessionReservation } = useSessionReservation();
  const { getWorkshopTitle, workshops, getWorkshopsFromServer } = useWorkshop();

  useEffect(() => {
    if (!sessions || sessions.length === 0) {
      getSessionsFromServer();
    }

    if (!workshops || workshops.length === 0) {
      getWorkshopsFromServer();
    }
  }, [workshops]);
  const startOfWeek = dayjs().add(weekOffset, "week").startOf("week");
  const endOfWeek = dayjs().add(weekOffset, "week").endOf("week");

  const filterCurrentWeekSessions = (sessionsArray) => {
    return sessionsArray.filter((session) => {
      const sessionDate = dayjs(session.startTime);

      return (
        sessionDate.isSame(startOfWeek, "day") ||
        sessionDate.isSame(endOfWeek, "day") ||
        (sessionDate.isAfter(startOfWeek) && sessionDate.isBefore(endOfWeek))
      );
    });
  };

  const groupSessionsByDate = (sessionsArray) => {
    const grouped = {};
    if (!sessionsArray || !Array.isArray(sessionsArray)) return grouped;
    sessionsArray.forEach((session) => {
      // מחלצים רק את התאריך (בלי שעה) כדי שישמש כמפתח
      const dateKey = dayjs(session.startTime).format("YYYY-MM-DD");
      if (!grouped[dateKey]) {
        grouped[dateKey] = []; // אם זה סשן ראשון ביום הזה, פותחים מערך חדש
      }
      grouped[dateKey].push(session);
    });
    return grouped;
  };

  useEffect(() => {
    if (open && workshopId) {
      const fetchAndGroupSessions = async () => {
        setIsLoading(true);
        try {
          const sessionsByWorkshop =
            await handleGetSessionByWorkshop(workshopId);
          const weeklySessions = filterCurrentWeekSessions(sessionsByWorkshop);
          const grouped = groupSessionsByDate(weeklySessions);
          setGroupedSessions(grouped);
        } catch (error) {
          console.log("Error fetching sessions:", error);
        } finally {
          setIsLoading(false);
        }
      };
      fetchAndGroupSessions();
    }
  }, [open, workshopId, weekOffset]);

  const handleReservation = async (session) => {
    const reservation = {
      userId: user?._id,
      sessionId: session._id,
      guestsCount: 1,
      status: "pending",
    };
    const reservationId = await handleCreateSessionReservation(reservation);
    console.log("reservation:", reservation);
    if (!reservationId) {
      return <Typography>loading...</Typography>;
    }
    navigate(`/resort/workshops/${reservationId}/order`);
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant="h6" fontWeight="bold">
          {getWorkshopTitle(workshopId)}
        </Typography>
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <Divider />

      <DialogContent sx={{ backgroundColor: "#f9f9f9", p: 3 }}>
        {/* אזור הניווט (Toolbar) */}
        <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
          <AccessTimeIcon sx={{ mr: 1, color: "text.secondary" }} />
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Daily Workshop Schedule
          </Typography>
          {/* כפתורי הניווט בין שבועות (כרגע רק עיצוב) */}
          <Box sx={{ display: "flex", gap: 1 }}>
            <Button
              variant="outlined"
              size="small"
              onClick={() => setWeekOffset((prev) => prev - 1)}
              // disabled={weekOffset <= 0}
            >
              {"< PREVIOUS WEEK"}
            </Button>
            <Button
              variant="outlined"
              size="small"
              sx={{ color: "text.primary", borderColor: "#ccc" }}
            >
              {startOfWeek.format("DD/MM")} - {endOfWeek.format("DD/MM")}
            </Button>
            <Button
              variant="outlined"
              size="small"
              onClick={() => setWeekOffset((prev) => prev + 1)}
            >
              {"NEXT WEEK >"}
            </Button>
          </Box>
        </Box>

        {/* לולאה שעוברת על כל תאריך בקבוצות שיצרנו */}
        {isLoading ? (
          <Typography variant="h1" sx={{ textAlign: "center", mt: 4 }}>
            Loading schedule...
          </Typography>
        ) : (
          Object.keys(groupedSessions).map((dateKey) => (
            <Paper
              key={dateKey}
              sx={{ mb: 4, overflow: "hidden", borderRadius: 2 }}
            >
              {/* כותרת היום (הפס החום) */}
              <Box sx={{ backgroundColor: "#a89c94", color: "white", p: 1.5 }}>
                <Typography fontWeight="bold">
                  {dayjs(dateKey).format("dddd, MM/DD/YYYY")}
                </Typography>
              </Box>

              {/* כותרות העמודות של הטבלה */}
              <Grid
                container
                sx={{
                  p: 2,
                  borderBottom: "1px solid #eee",
                  fontWeight: "bold",
                  color: "#555",
                }}
              >
                <Grid item xs={3}>
                  Time
                </Grid>
                <Grid item xs={4}>
                  Workshop / Class
                </Grid>
                <Grid item xs={3}>
                  Studio
                </Grid>
                <Grid item xs={2} sx={{ textAlign: "center" }}>
                  Action
                </Grid>
              </Grid>

              {/* השורות של הסשנים עצמם באותו יום */}
              {groupedSessions[dateKey].map((session) => (
                <Grid
                  container
                  alignItems="center"
                  key={session._id}
                  sx={{ p: 2, borderBottom: "1px solid #eee" }}
                >
                  <Grid item xs={3}>
                    {/* כאן אנחנו יוצרות את הפורמט של השעות: 10:00 PM - 11:00 PM */}
                    <Typography variant="body2" color="text.secondary">
                      {dayjs(session.startTime).format("hh:mm A")} -{" "}
                      {dayjs(session.endTime).format("hh:mm A")}
                    </Typography>
                  </Grid>
                  <Grid item xs={4}>
                    <Typography variant="body2">{session._id}</Typography>
                  </Grid>
                  <Grid item xs={3}>
                    <Typography variant="body2">{session.location}</Typography>
                  </Grid>
                  <Grid item xs={2} sx={{ textAlign: "center" }}>
                    <Button
                      variant="contained"
                      sx={{
                        backgroundColor: "#7a6b63",
                        "&:hover": { backgroundColor: "#5c4e46" },
                      }}
                      onClick={() => handleReservation(session)}
                    >
                      BOOK
                    </Button>
                  </Grid>
                </Grid>
              ))}
            </Paper>
          ))
        )}
      </DialogContent>
    </Dialog>
  );
}
