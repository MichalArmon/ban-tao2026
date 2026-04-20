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
} from "@mui/material";

import useForm from "../../../hooks/useForm";

import { useEffect, useState } from "react";
import roomReservationSchema from "../../models/roomReservation/roomReservationSchema";

import { useUser } from "../../../providers/UserProvider";
import AvailableRoomsSection from "../rooms/roomsAvailability.jsx/AvailableRoomsSection";

function RoomReservationForm({
  initialRoomReservationValues,
  handleSubmitForm,
  isEditMode,
}) {
  const { users, getUsersFromServer } = useUser();
  const [roomTypeFilter, setRoomTypeFilter] = useState(null);

  const { handleChange, handleSubmit, errors, formDetails, setFormDetails } =
    useForm(
      initialRoomReservationValues,
      roomReservationSchema,
      handleSubmitForm,
    );

  useEffect(() => {
    if (!users || users.length === 0) {
      getUsersFromServer();
    }
  }, [users, getUsersFromServer]);

  const getFormTitle = () => {
    return isEditMode ? "Edit room reservation" : "Create room reservation";
  };

  const getSubmitButtonText = () => {
    return isEditMode ? "Update" : "Create";
  };

  if (!formDetails || !users) {
    return (
      <Typography sx={{ p: 4, textAlign: "center" }}>
        Loading room reservation data...
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
              name="checkIn"
              label="Check in"
              type="date"
              value={formDetails.checkIn || ""}
              onChange={handleChange}
              error={errors.checkIn}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <MyTextField
              name="checkOut"
              label="Check out"
              type="date"
              value={formDetails.checkOut || ""}
              onChange={handleChange}
              error={errors.checkOut}
              helperText={errors.checkOut}
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
          <Grid size={{ xs: 12, md: 6 }}>
            <MyTextField
              select
              fullWidth
              label="Filter by Room Type"
              value={roomTypeFilter}
              onChange={(e) => setRoomTypeFilter(e.target.value)} // מעדכן רק את משתנה העזר
            >
              <MenuItem value="Single">Single</MenuItem>
              <MenuItem value="Double">Double</MenuItem>
              <MenuItem value="Suite">Suite</MenuItem>
              <MenuItem value="Shared">Shared</MenuItem>
              <MenuItem value="Studio">Studio</MenuItem>
            </MyTextField>
          </Grid>

          <Grid size={12}>
            <AvailableRoomsSection
              roomType={roomTypeFilter}
              checkIn={formDetails.checkIn}
              checkOut={formDetails.checkOut}
              guestsCount={formDetails.guestsCount}
              selectedRoomId={formDetails.roomId}
              onSelectRoom={(room) =>
                setFormDetails((prev) => ({
                  ...prev,
                  roomId: room._id,
                }))
              }
              error={errors.roomId}
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
          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              select
              fullWidth
              label="Meal Plan"
              value={formDetails.extraPreferences?.mealPlan || ""}
              onChange={(e) =>
                setFormDetails((prev) => ({
                  ...prev,
                  extraPreferences: {
                    ...prev.extraPreferences,
                    mealPlan: e.target.value,
                  },
                }))
              }
              error={!!errors["extraPreferences.mealPlan"]}
              helperText={errors["extraPreferences.mealPlan"]}
            >
              <MenuItem value="Breakfast only">Breakfast only</MenuItem>
              <MenuItem value="Half board">Half board</MenuItem>
              <MenuItem value="Full board">Full board</MenuItem>
            </TextField>
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={formDetails.extraPreferences?.rentScooter || false}
                  onChange={(e) =>
                    setFormDetails((prev) => ({
                      ...prev,
                      extraPreferences: {
                        ...prev.extraPreferences,
                        rentScooter: e.target.checked,
                      },
                    }))
                  }
                />
              }
              label="Rent scooter"
            />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={
                    formDetails.extraPreferences?.shuttleFromFerry || false
                  }
                  onChange={(e) =>
                    setFormDetails((prev) => ({
                      ...prev,
                      extraPreferences: {
                        ...prev.extraPreferences,
                        shuttleFromFerry: e.target.checked,
                      },
                    }))
                  }
                />
              }
              label="Shuttle from ferry"
            />
          </Grid>
          <Grid size={12}>
            <TextField
              fullWidth
              multiline
              rows={4}
              label="Special requests"
              value={formDetails.extraPreferences?.specialRequests || ""}
              onChange={(e) =>
                setFormDetails((prev) => ({
                  ...prev,
                  extraPreferences: {
                    ...prev.extraPreferences,
                    specialRequests: e.target.value,
                  },
                }))
              }
              error={!!errors["extraPreferences.specialRequests"]}
              helperText={errors["extraPreferences.specialRequests"]}
            />
          </Grid>
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
export default RoomReservationForm;
