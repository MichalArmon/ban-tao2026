import MyTextField from "../../../../Form/MyTextField";
import {
  Grid,
  Button,
  Box,
  FormControlLabel,
  Switch,
  Typography,
  Paper,
  MenuItem,
  FormGroup,
  Checkbox,
} from "@mui/material";
import { useSession } from "../../../providers/SessionProvider";
useSession;
import useForm from "../../../hooks/useForm";
import sessionSchema from "../../models/sessionSchema";

import { useWorkshop } from "../../../providers/WorkshopProvider";
import { useEffect, useState } from "react";

function SessionForm({
  initialSessionValues,
  handleSubmitForm,
  defaultIsRecursive,
  isEditMode,
}) {
  const [isRecursive, setIsRecursive] = useState(defaultIsRecursive);
  const { session } = useSession();
  const { workshops, getWorkshopsFromServer } = useWorkshop();
  const { handleChange, handleSubmit, errors, formDetails, setFormDetails } =
    useForm(initialSessionValues, sessionSchema, handleSubmitForm);
  useEffect(() => {
    getWorkshopsFromServer();
  }, []);
  console.log(initialSessionValues._id);

  // פונקציה לכותרת הטופס
  const getFormTitle = () => {
    if (isEditMode && isRecursive) return "Edit Schedule Rule";
    if (isEditMode && !isRecursive) return "Edit Session";
    if (!isEditMode && isRecursive) return "Create Schedule Rule";
    if (!isEditMode && !isRecursive) return "Create Session";
  };

  // פונקציה לכפתור השליחה
  const getSubmitButtonText = () => {
    if (isEditMode && isRecursive) return "Update Schedule";
    if (isEditMode && !isRecursive) return "Update Session";
    if (!isEditMode && isRecursive) return "Generate Schedule";
    if (!isEditMode && !isRecursive) return "Create Session";
  };

  // פונקציה לעדכון ימי השבוע בתוך ה-Hook
  const handleDayToggle = (dayIndex) => {
    const currentDays = formDetails.daysOfWeek || [];
    const newDays = currentDays.includes(dayIndex)
      ? currentDays.filter((d) => d !== dayIndex)
      : [...currentDays, dayIndex];

    setFormDetails({ ...formDetails, daysOfWeek: newDays });
  };

  if (!formDetails) {
    return (
      <Typography sx={{ p: 4, textAlign: "center" }}>
        Loading Session data...
      </Typography>
    );
  }
  console.log("Current Form Errors:", errors);

  return (
    <>
      <Box sx={{ p: 4, display: "flex", justifyContent: "center" }}>
        <Paper elevation={3} sx={{ p: 4, maxWidth: 600, width: "100%" }}>
          <Typography variant="h5" gutterBottom sx={{ fontWeight: "bold" }}>
            {getFormTitle()}
          </Typography>

          <Grid container spacing={2}>
            <Grid item size={{ xs: 12, md: 6 }}>
              <MyTextField
                select
                label="Select Workshop"
                name="workshopId"
                value={formDetails.workshopId}
                onChange={handleChange}
                required
              >
                {workshops.map((workshop) => (
                  <MenuItem key={workshop._id} value={workshop._id}>
                    {workshop.title}
                  </MenuItem>
                ))}
              </MyTextField>
            </Grid>

            <Grid item size={{ xs: 12, md: 6 }}>
              <MyTextField
                fullWidth
                label="Location"
                name="location"
                value={formDetails.location}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={6}>
              <MyTextField
                fullWidth
                type="number"
                label="Max Capacity"
                name="maxCapacity"
                value={formDetails.maxCapacity}
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={6}>
              <MyTextField
                fullWidth
                label={isRecursive ? "Start Date" : "Session Date"}
                type="date"
                name="startDate"
                value={formDetails.startDate || ""}
                InputLabelProps={{ shrink: true }}
                onChange={handleChange}
                required
              />
            </Grid>

            <Grid item xs={6}>
              <MyTextField
                fullWidth
                label="Start Hour"
                type="time"
                name="hour"
                value={formDetails.hour}
                InputLabelProps={{ shrink: true }}
                onChange={handleChange}
                required
              />
            </Grid>

            {/* שדות שמופיעים רק ב-Recursive */}
            {isRecursive && (
              <>
                <Grid item xs={12}>
                  <MyTextField
                    fullWidth
                    label="End Date (Until when?)"
                    value={formDetails.endDate || ""}
                    type="date"
                    name="endDate"
                    InputLabelProps={{ shrink: true }}
                    onChange={handleChange}
                    required
                  />
                </Grid>

                <Grid item xs={12}>
                  <Typography variant="body2" color="textSecondary">
                    Select Days of Week:
                  </Typography>
                  <FormGroup row>
                    {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(
                      (day, index) => (
                        <FormControlLabel
                          key={day}
                          control={
                            <Checkbox
                              checked={formDetails.daysOfWeek.includes(index)}
                              onChange={() => handleDayToggle(index)}
                            />
                          }
                          label={day}
                        />
                      ),
                    )}
                  </FormGroup>
                </Grid>
              </>
            )}

            <Grid item xs={12} sx={{ mt: 2 }}>
              <Button
                onClick={handleSubmit}
                variant="contained"
                color="primary"
                fullWidth
                type="submit"
                size="large"
              >
                {getSubmitButtonText()}
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </Box>
    </>
  );
}

export default SessionForm;
