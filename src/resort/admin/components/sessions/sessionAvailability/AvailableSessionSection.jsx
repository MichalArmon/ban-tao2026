import { useEffect } from "react";
import { Box, Typography, Paper, Button, Grid } from "@mui/material";
import { useSession } from "../../../../providers/SessionProvider";

function AvailableSessionsSection({
  startTime,
  workshopId,
  onSelectSession,
  selectedSessionId,

  error,
}) {
  const { filteredSessions, handleSessionsAvailability } = useSession();

  useEffect(() => {
    if (startTime && workshopId) {
      handleSessionsAvailability({ startTime, workshopId });
    }
  }, [startTime, workshopId, handleSessionsAvailability]);

  return (
    <Paper elevation={2} sx={{ p: 3 }}>
      <Typography variant="h6" gutterBottom>
        Available Sessions
      </Typography>

      {!workshopId || !startTime ? (
        <Typography color="text.secondary">
          Select session date first...
        </Typography>
      ) : (
        <Grid container spacing={2}>
          {filteredSessions?.map((session) => (
            <Grid size={{ xs: 12, md: 6 }} key={session._id}>
              <Paper
                variant={
                  selectedSessionId === session._id ? "outlined" : "elevation"
                }
                sx={{
                  p: 2,
                  border:
                    selectedSessionId === session._id
                      ? "2px solid"
                      : "1px solid transparent",
                }}
              >
                <Typography variant="subtitle1">
                  {session.workshopId}
                </Typography>
                <Typography variant="body2">
                  {/* {Session.price} {Session.currency} */}
                </Typography>

                <Button
                  sx={{ mt: 1 }}
                  variant={
                    selectedSessionId === session._id ? "contained" : "outlined"
                  }
                  onClick={() => onSelectSession(session)}
                >
                  {selectedSessionId === session._id ? "Selected" : "Select"}
                </Button>
              </Paper>
            </Grid>
          ))}
        </Grid>
      )}

      {error && (
        <Typography color="error" sx={{ mt: 1 }}>
          {error}
        </Typography>
      )}
    </Paper>
  );
}

export default AvailableSessionsSection;
