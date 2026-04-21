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
  Autocomplete,
  TextField,
  RadioGroup,
  Radio,
} from "@mui/material";

import useForm from "../../../hooks/useForm";

import { useEffect, useState } from "react";

import { useUser } from "../../../providers/UserProvider";
import sessionReservationValidationSchema from "../../models/sessionReservation/sessionReservationSchema";
import { useWorkshop } from "../../../providers/WorkshopProvider";
import AvailableSessionsSection from "../sessions/sessionAvailability/AvailableSessionSection";
import { useSession } from "../../../providers/SessionProvider";

const levels = ["beginner", "intermediate", "advanced"];

const goalOptions = [
  "Improve flexibility",
  "Build strength",
  "Reduce stress",
  "Improve balance",
];

const injuriesOptions = [
  "No injuries",
  "Lower back sensitivity",
  "Knee pain",
  "Shoulder tension",
];

const extraOptions = ["Yoga mat", "Blocks", "Private guidance", "Gentle pace"];

function SessionReservationForm({
  initialSessionReservationValues,
  handleSubmitForm,
  isEditMode,
}) {
  const { users, getUsersFromServer } = useUser();
  const { workshops, getWorkshopsFromServer, handleGetSession } = useWorkshop();
  const { handleGetSessionByWorkshop, setSessions, sessions } = useSession;

  const { handleChange, handleSubmit, errors, formDetails, setFormDetails } =
    useForm(
      initialSessionReservationValues,
      sessionReservationValidationSchema,
      handleSubmitForm,
    );
  const [startTime, setStartTime] = useState(null);
  const [workshopId, setWorkshopId] = useState(null);
  useEffect(() => {
    if (!users || users.length === 0) {
      getUsersFromServer();
    }
    if (!workshops || workshops.length === 0) {
      getWorkshopsFromServer();
    }
  }, [users, getUsersFromServer, workshops, getWorkshopsFromServer]);

  const getFormTitle = () => {
    return isEditMode
      ? "Edit Session reservation"
      : "Create Session reservation";
  };

  const getSubmitButtonText = () => {
    return isEditMode ? "Update" : "Create";
  };
  const sessionsByWorkshop = async (workshopId) => {
    const workshopSessions = await handleGetSessionByWorkshop(workshopId);
    setSessions(workshopSessions);
  };
  const filterdSessionsBydate = (startTime) =>
    sessions.filter((session) => session.startTime === startTime);

  if (!formDetails || !users) {
    return (
      <Typography sx={{ p: 4, textAlign: "center" }}>
        Loading Session reservation data...
      </Typography>
    );
  }
  console.log("Current formDetails state:", formDetails);
  return (
    <Box sx={{ p: 4, justifyContent: "center" }}>
      <Paper
        elevation={3}
        sx={{ p: 4, width: "100%", display: "flex", flexDirection: "column" }}
      >
        <Typography variant="h5" gutterBottom sx={{ fontWeight: "bold" }}>
          {getFormTitle()}
        </Typography>

        <Grid container spacing={2}>
          <Grid size={12}>
            <Autocomplete
              options={users}
              getOptionLabel={(option) =>
                `${option.firstName} ${option.lastName || ""}`
              }
              value={
                users.find((user) => user._id === formDetails.userId) || null
              }
              onChange={(event, newValue) => {
                setFormDetails((prev) => ({
                  ...prev,
                  userId: newValue ? newValue._id : "",
                }));
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Select Customer"
                  error={!!errors.userId}
                  helperText={errors.userId}
                />
              )}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <MyTextField
              name="startTime"
              label="session date"
              type="date"
              value={startTime || null}
              onChange={() => {
                setStartTime(startTime);
              }}
              error={errors.startTime}
              helperText={errors.startTime}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <Autocomplete
              options={workshops}
              getOptionLabel={(option) => option.title || ""}
              value={
                workshops.find((workshop) => workshop._id === workshopId) ||
                null
              }
              onChange={(event, newValue) => {
                // newValue הוא האובייקט של הסדנא שנבחרה. אם המשתמש מחק את הבחירה (לחץ על ה-X), זה יהיה null
                if (newValue) {
                  setWorkshopId(newValue._id);
                } else {
                  setWorkshopId(""); // אם ניקו את השדה
                }
              }}
              renderInput={(params) => (
                <MyTextField
                  {...params}
                  label="Select workshop"
                  error={!!errors.workshopId}
                  helperText={errors.workshopId}
                />
              )}
            />
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <MyTextField
              name="guestsCount"
              label="guestsCount"
              type="number"
              value={formDetails.guestsCount || ""}
              onChange={handleChange}
              error={errors.guestsCount}
            />
          </Grid>

          <Grid size={12}>
            <AvailableSessionsSection
              selectedWorkshopId={workshopId}
              startTime={startTime}
              onSelectSession={(session) =>
                setFormDetails((prev) => ({
                  ...prev,
                  sessionId: session._id,
                }))
              }
              error={errors.sessionId}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              select
              fullWidth
              name="status"
              label="Reservation status"
              value={formDetails.status || "confirmed"}
              onChange={handleChange}
              error={!!errors.status}
              helperText={errors.status}
            >
              <MenuItem value="pending">Pending</MenuItem>
              <MenuItem value="confirmed">Confirmed</MenuItem>
              <MenuItem value="cancelled">Cancelled</MenuItem>
            </TextField>
          </Grid>
          {/* מציג את השדה רק אם אנחנו במצב עריכה, ונועל אותו לשינויים */}
          {isEditMode && (
            <Grid size={{ xs: 12, md: 6 }}>
              <MyTextField
                name="expiresAt"
                label="Expires at"
                type="date"
                value={formDetails.expiresAt || ""}
                disabled={true} // הופך את השדה לאפור ומונע הקלדה
              />
            </Grid>
          )}
          <Grid size={12}>
            <Typography variant="subtitle1" sx={{ mb: 1 }}>
              Level
            </Typography>
            <RadioGroup
              name="level"
              value={formDetails.level}
              onChange={handleChange}
              sx={{ mb: 3 }}
            >
              {levels.map((lvl) => (
                <FormControlLabel
                  key={lvl}
                  value={lvl}
                  control={<Radio />}
                  label={lvl}
                />
              ))}
            </RadioGroup>
          </Grid>
          <Grid size={12}>
            <Typography variant="subtitle1" sx={{ mb: 1 }}>
              Goals
            </Typography>
            {goalOptions.map((goal) => (
              <FormControlLabel
                key={goal}
                control={
                  <Checkbox
                    checked={formDetails.goals?.includes(goal)}
                    onChange={(e) => {
                      const checked = e.target.checked;
                      setFormDetails((prev) => ({
                        ...prev,
                        goals: checked
                          ? [...prev.goals, goal]
                          : prev.goals.filter((g) => g !== goal),
                      }));
                    }}
                  />
                }
                label={goal}
              />
            ))}
          </Grid>

          <Grid size={12}>
            <Typography variant="subtitle1" sx={{ mb: 1 }}>
              Injuries
            </Typography>
            <RadioGroup
              name="injuriesNotes"
              value={formDetails.injuriesNotes}
              onChange={handleChange}
              sx={{ mb: 3 }}
            >
              {injuriesOptions.map((item) => (
                <FormControlLabel
                  key={item}
                  value={item}
                  control={<Radio />}
                  label={item}
                />
              ))}
            </RadioGroup>
          </Grid>

          <Typography variant="subtitle1" sx={{ mb: 1 }}>
            Extras
          </Typography>
          {extraOptions.map((extra) => (
            <FormControlLabel
              key={extra}
              control={
                <Checkbox
                  checked={formDetails.extras?.includes(extra)}
                  onChange={(e) => {
                    const checked = e.target.checked;

                    setFormDetails((prev) => ({
                      ...prev,
                      extras: checked
                        ? [...prev.extras, extra]
                        : prev.extras.filter((ex) => ex !== extra),
                    }));
                  }}
                />
              }
              label={extra}
            />
          ))}
          <TextField
            fullWidth
            multiline
            rows={3}
            label="Instructor Notes"
            name="instructorNotes"
            value={formDetails.instructorNotes}
            onChange={handleChange}
            error={!!errors.instructorNotes}
            helperText={errors.instructorNotes}
            sx={{ mb: 3 }}
          />
          <Grid size={12} sx={{ mt: 2 }}>
            <Button
              onClick={handleSubmit}
              variant="contained"
              color="primary"
              fullWidth
              size="large"
            >
              {getSubmitButtonText()}
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
}
export default SessionReservationForm;
