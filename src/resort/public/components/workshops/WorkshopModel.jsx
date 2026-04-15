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

export default function WorkshopModal({ open, onClose, workshopId }) {
  const [groupedSessions, setGroupedSessions] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const { sessions, getSessionsFromServer, handleGetSessionByWorkshop } =
    useSession();
  const { getWorkshopTitle, workshops, getWorkshopsFromServer } = useWorkshop();

  useEffect(() => {
    console.log(workshops);

    if (!sessions || sessions.length === 0) {
      getSessionsFromServer();
    }

    if (!workshops || workshops.length === 0) {
      getWorkshopsFromServer();
    }
  }, [workshops]);

  useEffect(() => {
    if (open && workshopId) {
      const fetchAndGroupSessions = async () => {
        setIsLoading(true);
        try {
          const sessionsByWorkshop =
            await handleGetSessionByWorkshop(workshopId);
          const grouped = groupSessionsByDate(sessions);
          setGroupedSessions(grouped);
        } catch (error) {
          console.log("Error fetching sessions:", error);
        } finally {
          setIsLoading(false);
        }
      };
      fetchAndGroupSessions();
    }
  }, [open, workshopId]);
  // פונקציית עזר: מקבצת את מערך הסשנים לאובייקט לפי תאריכים
  // התוצאה תיראה ככה: { '2025-11-15': [session1, session2], '2025-11-22': [session3] }
  const groupSessionsByDate = () => {
    const grouped = {};
    if (!sessions || !Array.isArray(sessions)) return grouped;
    sessions.forEach((session) => {
      // מחלצים רק את התאריך (בלי שעה) כדי שישמש כמפתח
      const dateKey = dayjs(session.startTime).format("YYYY-MM-DD");
      if (!grouped[dateKey]) {
        grouped[dateKey] = []; // אם זה סשן ראשון ביום הזה, פותחים מערך חדש
      }
      grouped[dateKey].push(session);
    });
    return grouped;
  };

  const filterCurrentWeekSessions = (groupedSessions) => {
    const startOfWeek = dayjs().startOf("week");
    const endOfWeek = dayjs().endOf("week");

    return groupedSessions.filter((session) => {
      const sessionDate = dayjs(session.startTime);

      return (
        sessionDate.isSame(startOfWeek, "day") ||
        sessionDate.isSame(endOfWeek, "day") ||
        (sessionDate.isAfter(startOfWeek) && sessionDate.isBefore(endOfWeek))
      );
    });
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
            <Button variant="outlined" size="small" disabled>
              {"< PREVIOUS WEEK"}
            </Button>
            <Button
              variant="outlined"
              size="small"
              sx={{ color: "text.primary", borderColor: "#ccc" }}
            >
              11/09 - 11/15
            </Button>
            <Button variant="outlined" size="small">
              {"NEXT WEEK >"}
            </Button>
          </Box>
        </Box>

        {/* לולאה שעוברת על כל תאריך בקבוצות שיצרנו */}
        {isLoading ? (
          <Typography sx={{ textAlign: "center", mt: 4 }}>
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
                      onClick={() =>
                        console.log("Booking session:", session._id)
                      }
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
