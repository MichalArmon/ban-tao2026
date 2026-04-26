import { useEffect, use } from "react";
import { Box, Typography, Paper, Button, Grid } from "@mui/material";
import { useTreatment } from "../../../../providers/TreatmentProvider";

function AvailableTreatmentsSection({
  treatmentId,
  date,
  selectedTreatmentId,
  onSelectTreatment,
  error,
}) {
  const { filteredTreatments, handleGetTreatmentsAvailability } =
    useTreatment();

  useEffect(() => {
    if (treatmentId && date) {
      handleGetTreatmentsAvailability({
        treatmentId,
        date,
      });
    }
  }, [treatmentId, date]);

  return (
    <Paper elevation={2} sx={{ p: 3 }}>
      <Typography variant="h6" gutterBottom>
        Available Treatments
      </Typography>

      {!treatmentId || !date ? (
        <Typography color="text.secondary">
          Select check-in and check-out dates first
        </Typography>
      ) : (
        <Grid container spacing={2}>
          {filteredTreatments?.map((treatment) => (
            <Grid size={{ xs: 12, md: 6 }} key={treatment._id}>
              <Paper
                variant={
                  selectedTreatmentId === treatment._id
                    ? "outlined"
                    : "elevation"
                }
                sx={{
                  p: 2,
                  border:
                    selectedTreatmentId === treatment._id
                      ? "2px solid"
                      : "1px solid transparent",
                }}
              >
                <Typography variant="subtitle1">{treatment.title}</Typography>
                <Typography variant="body2">
                  {treatment.price} {treatment.currency}
                </Typography>

                <Button
                  sx={{ mt: 1 }}
                  variant={
                    selectedTreatmentId === treatment._id
                      ? "contained"
                      : "outlined"
                  }
                  onClick={() => onSelectTreatment(treatment)}
                >
                  {selectedTreatmentId === treatment._id
                    ? "Selected"
                    : "Select"}
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

export default AvailableTreatmentsSection;
