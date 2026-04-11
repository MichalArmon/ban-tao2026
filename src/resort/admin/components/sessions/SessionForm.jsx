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

import { Close } from "@mui/icons-material";
import TagsInput from "../../../../Form/components/TagsInput";
import { useWorkshop } from "../../../providers/WorkshopProvider";
import { useEffect, useState } from "react";

function SessionForm({ initialSessionValues, handleSubmitForm }) {
  const [isRecursive, setIsRecursive] = useState(false);
  const { session } = useSession();
  const { workshops, getWorkshopsFromServer } = useWorkshop();
  const { handleChange, handleSubmit, errors, formDetails, setFormDetails } =
    useForm(initialSessionValues, sessionSchema, handleSubmitForm);
  useEffect(() => {
    getWorkshopsFromServer();
  }, []);

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

  return (
    <>
      <Box sx={{ p: 4, display: "flex", justifyContent: "center" }}>
        <Paper elevation={3} sx={{ p: 4, maxWidth: 600, width: "100%" }}>
          <Typography variant="h5" gutterBottom sx={{ fontWeight: "bold" }}>
            Create Workshop Session
          </Typography>

          <FormControlLabel
            control={
              <Switch
                checked={isRecursive}
                onChange={() => setIsRecursive(!isRecursive)}
              />
            }
            label={isRecursive ? "Recursive (Multiple)" : "Single Session"}
            sx={{ mb: 2 }}
          />

          <Grid container spacing={2}>
            {/* בחירת וורקשופ */}
            <Grid item xs={12}>
              <MyTextField
                select
                fullWidth
                label="Select Workshop"
                name="workshopId"
                value={formDetails.workshopId}
                onChange={handleChange}
                required
              >
                {workshops.map((ws) => (
                  <MenuItem key={ws._id} value={ws._id}>
                    {ws.name}
                  </MenuItem>
                ))}
              </MyTextField>
            </Grid>

            <Grid item xs={6}>
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
                {isRecursive ? "Generate Schedule" : "Create Session"}
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </Box>
    </>
  );
}

export default SessionForm;
