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
  Chip,
} from "@mui/material";

import MyTextField from "../../../../../Form/MyTextField";
import useForm from "../../../../hooks/useForm";
import { useUser } from "../../../../providers/UserProvider";
import { useTreatment } from "../../../../providers/TreatmentProvider";
import treatmentParticipantDetailsSchema from "../../../models/treatmentReservation/treatmentParticipantDetailsSchema";

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

function TreatmentParticipantDetailsForm({
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
    filteredTreatments,
  } = useTreatment();

  const { handleChange, handleSubmit, errors, formDetails, setFormDetails } =
    useForm(
      initialTreatmentReservationValues,
      treatmentParticipantDetailsSchema,
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
        console.log(filteredTreatments);
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
      <Box height="1300px" bgcolor="red">
        <Typography sx={{ p: 4, textAlign: "center" }}>
          Loading Spa reservation data...
        </Typography>
      </Box>
    );
  }

  return (
    <Paper
      elevation={3}
      sx={{ p: 4, width: "100%", display: "flex", flexDirection: "column" }}
    >
      <Grid container spacing={2}>
        <Grid item size={{ sm: 12, md: 12 }}>
          <Typography
            variant="subtitle1"
            sx={{ mb: 1, mt: 2, fontWeight: "bold" }}
          >
            Massage Pressure Preference
          </Typography>
          <RadioGroup
            row
            name="pressureLevels"
            value={formDetails.pressureLevels || ""}
            onChange={(e) =>
              setFormDetails((prev) => ({
                ...prev,

                pressureLevels: e.target.value,
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
                    formDetails.focusAreasOptions?.includes(area) || false
                  }
                  onChange={(e) => {
                    const checked = e.target.checked;
                    setFormDetails((prev) => {
                      const currentAreas = prev.focusAreasOptions || [];
                      return {
                        ...prev,

                        focusAreasOptions: checked
                          ? [...currentAreas, area]
                          : currentAreas.filter((a) => a !== area),
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
            name="medicalConditionsOptions"
            value={formDetails.medicalConditionsOptions || ""}
            onChange={(e) => {
              setFormDetails((prev) => ({
                ...prev,

                medicalConditionsOptions: e.target.value,
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
                    formDetails.extraSpaOptions?.includes(extra) || false
                  }
                  onChange={(e) => {
                    const checked = e.target.checked;
                    setFormDetails((prev) => {
                      const currentExtras = prev.extraSpaOptions || [];
                      return {
                        ...prev,

                        extraSpaOptions: checked
                          ? [...currentExtras, extra]
                          : currentExtras.filter((ex) => ex !== extra),
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
            label="Special Requests"
            name="specialRequests"
            value={formDetails.specialRequests || ""}
            onChange={(e) => {
              setFormDetails((prev) => ({
                ...prev,

                specialRequests: e.target.value,
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
  );
}

export default TreatmentParticipantDetailsForm;
