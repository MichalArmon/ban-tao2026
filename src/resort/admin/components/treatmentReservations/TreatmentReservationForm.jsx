import React, { useEffect, useState } from "react";
import {
  Grid,
  Button,
  Box,
  FormControlLabel,
  Typography,
  Paper,
  MenuItem,
  Checkbox,
  Autocomplete,
  TextField,
  RadioGroup,
  Radio,
} from "@mui/material";

import MyTextField from "../../../../Form/MyTextField";
import useForm from "../../../hooks/useForm";

import { useUser } from "../../../providers/UserProvider";
import { useTreatment } from "../../../providers/TreatmentProvider"; // ספק הטיפולים שלך
import treatmentReservationValidationSchema from "../../models/treatmentReservation/treatmentReservationSchema";

// 👇 השאלות המעודכנות לעולם הספא והטיפולים
const pressureLevels = ["Light & Relaxing", "Medium", "Firm / Deep Tissue"];

const focusAreasOptions = [
  "Neck & Shoulders",
  "Lower Back",
  "Legs & Feet",
  "Scalp & Face",
];

const medicalConditionsOptions = [
  "No special conditions",
  "Skin sensitivities / Allergies to nuts or oils",
  "Recent surgery or injury",
  "Pregnant",
];

const extraSpaOptions = [
  "Aromatherapy essential oils",
  "Hot stones",
  "Dry brushing",
  "After-treatment herbal tea",
];

function TreatmentReservationForm({
  initialTreatmentReservationValues,
  handleSubmitForm,
  isEditMode,
}) {
  const { users, getUsersFromServer } = useUser();
  const {
    treatments,
    getTreatmentsFromServer,
    handleGetTreatmentsAvailability,
    date,
    setDate,
  } = useTreatment(); // הבאת הטיפולים מהשרת

  const { handleChange, handleSubmit, errors, formDetails, setFormDetails } =
    useForm(
      initialTreatmentReservationValues,
      treatmentReservationValidationSchema,
      handleSubmitForm,
    );

  const [treatmentId, setTreatmentId] = useState(null);
  useEffect(() => {
    const check = async () => {
      if (treatmentId && date) {
        const availableHours = await handleGetTreatmentsAvailability(
          treatmentId,
          date,
        );

        console.log(availableHours);
      }
    };
    check();
  }, [treatmentId, date]);

  useEffect(() => {
    if (!users || users.length === 0) {
      getUsersFromServer();
    }
    if (!treatments || treatments.length === 0) {
      getTreatmentsFromServer();
    }
  }, []);

  useEffect(() => {
    const loadReservationDataForEdit = async () => {
      if (isEditMode && formDetails.treatmentId) {
        if (!treatmentId) {
          setTreatmentId(formDetails.treatmentId);
        }
        if (formDetails.date && !date) {
          const formattedDate = formDetails.date.split("T")[0];
          setDate(formattedDate);
        }
      }
    };
    loadReservationDataForEdit();
  }, [isEditMode, formDetails.treatmentId]);

  const getFormTitle = () => {
    return isEditMode ? "Edit Spa Reservation" : "Create Spa Reservation";
  };

  const getSubmitButtonText = () => {
    return isEditMode ? "Update" : "Create";
  };

  if (!formDetails || !users || !treatments) {
    return (
      <Typography sx={{ p: 4, textAlign: "center" }}>
        Loading Spa reservation data...
      </Typography>
    );
  }

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
          {/* בחירת אורח */}
          <Grid item size={{ sm: 12, md: 6 }}>
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
                <MyTextField
                  {...params}
                  label="Select Guest"
                  error={!!errors.userId}
                  helperText={errors.userId}
                />
              )}
            />
          </Grid>

          {/* בחירת טיפול */}
          <Grid item size={{ sm: 12, md: 6 }}>
            <Autocomplete
              options={treatments}
              getOptionLabel={(option) => option.title || ""}
              value={treatments.find((t) => t._id === treatmentId) || null}
              onChange={(event, newValue) => {
                if (newValue) {
                  setTreatmentId(newValue._id);
                  setFormDetails((prev) => ({
                    ...prev,
                    treatmentId: newValue._id,
                  }));
                } else {
                  setTreatmentId("");
                  setFormDetails((prev) => ({
                    ...prev,
                    treatmentId: "",
                  }));
                }
              }}
              renderInput={(params) => (
                <MyTextField
                  {...params}
                  label="Select Spa Treatment"
                  error={!!errors.treatmentId}
                  helperText={errors.treatmentId}
                />
              )}
            />
          </Grid>

          {/* תאריך הטיפול */}
          <Grid item size={{ sm: 12, md: 6 }}>
            <MyTextField
              name="date"
              label="Treatment Date"
              type="date"
              value={date || ""}
              onChange={(e) => {
                setDate(e.target.value);
                setFormDetails((prev) => ({
                  ...prev,
                  date: e.target.value,
                }));
              }}
              error={errors.date}
              helperText={errors.date}
            />
          </Grid>

          <Grid item size={{ sm: 12, md: 6 }}>
            <Box></Box>
          </Grid>

          {/* סטטוס */}
          <Grid item size={{ sm: 12, md: 12 }}>
            <MyTextField
              select
              fullWidth
              name="status"
              label="Reservation Status"
              value={formDetails.status || "pending"}
              onChange={handleChange}
              error={!!errors.status}
              helperText={errors.status}
            >
              <MenuItem value="pending">Pending</MenuItem>
              <MenuItem value="confirmed">Confirmed</MenuItem>
              <MenuItem value="completed">Completed</MenuItem>
              <MenuItem value="cancelled">Cancelled</MenuItem>
            </MyTextField>
          </Grid>

          {/* --- שאלון ספא (Participant Details) --- */}

          <Grid item size={{ sm: 12, md: 12 }}>
            <Typography
              variant="subtitle1"
              sx={{ mb: 1, mt: 2, fontWeight: "bold" }}
            >
              Massage Pressure Preference
            </Typography>
            <RadioGroup
              row
              name="pressureLevel"
              value={formDetails.participantDetails?.pressureLevel || ""}
              onChange={(e) =>
                setFormDetails((prev) => ({
                  ...prev,
                  participantDetails: {
                    ...prev.participantDetails,
                    pressureLevel: e.target.value,
                  },
                }))
              }
              sx={{ mb: 2 }}
            >
              {pressureLevels.map((lvl) => (
                <FormControlLabel
                  key={lvl}
                  value={lvl}
                  control={<Radio />}
                  label={lvl}
                />
              ))}
            </RadioGroup>
          </Grid>

          <Grid item size={{ sm: 12, md: 12 }}>
            <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: "bold" }}>
              Focus Areas
            </Typography>
            {focusAreasOptions.map((area) => (
              <FormControlLabel
                key={area}
                control={
                  <Checkbox
                    checked={
                      formDetails.participantDetails?.focusAreas?.includes(
                        area,
                      ) || false
                    }
                    onChange={(e) => {
                      const checked = e.target.checked;
                      setFormDetails((prev) => {
                        const currentAreas =
                          prev.participantDetails?.focusAreas || [];
                        return {
                          ...prev,
                          participantDetails: {
                            ...prev.participantDetails,
                            focusAreas: checked
                              ? [...currentAreas, area]
                              : currentAreas.filter((a) => a !== area),
                          },
                        };
                      });
                    }}
                  />
                }
                label={area}
              />
            ))}
          </Grid>

          <Grid item size={{ sm: 12, md: 12 }}>
            <Typography
              variant="subtitle1"
              sx={{ mb: 1, mt: 2, fontWeight: "bold" }}
            >
              Medical Conditions / Allergies
            </Typography>
            <RadioGroup
              name="medicalConditions"
              value={formDetails.participantDetails?.medicalConditions || ""}
              onChange={(e) => {
                setFormDetails((prev) => ({
                  ...prev,
                  participantDetails: {
                    ...prev.participantDetails,
                    medicalConditions: e.target.value,
                  },
                }));
              }}
              sx={{ mb: 2 }}
            >
              {medicalConditionsOptions.map((item) => (
                <FormControlLabel
                  key={item}
                  value={item}
                  control={<Radio />}
                  label={item}
                />
              ))}
            </RadioGroup>
          </Grid>

          <Grid item size={{ sm: 12, md: 12 }}>
            <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: "bold" }}>
              Spa Extras
            </Typography>
            {extraSpaOptions.map((extra) => (
              <FormControlLabel
                key={extra}
                control={
                  <Checkbox
                    checked={
                      formDetails.participantDetails?.extras?.includes(extra) ||
                      false
                    }
                    onChange={(e) => {
                      const checked = e.target.checked;
                      setFormDetails((prev) => {
                        const currentExtras =
                          prev.participantDetails?.extras || [];
                        return {
                          ...prev,
                          participantDetails: {
                            ...prev.participantDetails,
                            extras: checked
                              ? [...currentExtras, extra]
                              : currentExtras.filter((ex) => ex !== extra),
                          },
                        };
                      });
                    }}
                  />
                }
                label={extra}
              />
            ))}
          </Grid>

          <Grid item size={{ sm: 12, md: 12 }}>
            <TextField
              fullWidth
              multiline
              rows={3}
              label="Therapist Notes (Special Requests)"
              name="therapistNotes"
              value={formDetails.participantDetails?.therapistNotes || ""}
              onChange={(e) => {
                setFormDetails((prev) => ({
                  ...prev,
                  participantDetails: {
                    ...prev.participantDetails,
                    therapistNotes: e.target.value,
                  },
                }));
              }}
              sx={{ mb: 3, mt: 1 }}
            />
          </Grid>

          {/* כפתור שמירה */}
          <Grid item xs={12} sx={{ mt: 2 }}>
            <Button
              onClick={handleSubmit}
              variant="contained"
              color="primary"
              fullWidth
              size="large"
              sx={{ bgcolor: "#8D6E63", "&:hover": { bgcolor: "#6D4C41" } }} // צבעים שמתאימים לספא
            >
              {getSubmitButtonText()}
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
}

export default TreatmentReservationForm;
