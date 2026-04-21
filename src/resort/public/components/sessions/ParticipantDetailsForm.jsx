import React from "react";
import {
  Box,
  TextField,
  MenuItem,
  Typography,
  Chip,
  Button,
  Paper,
  Autocomplete,
  RadioGroup,
  FormControlLabel,
  Radio,
  Checkbox,
} from "@mui/material";
import useForm from "../../../hooks/useForm";
import initialParticipantDetailsValues from "../../../admin/helpers/sessionReservations/initialValues/initialValuesParticipantDetails";
import participantDetailsSchema from "../../../admin/models/sessionReservation/participantDetailsSchema";
import { useSessionReservation } from "../../../providers/SessionReservationProvider";

import { useOrder } from "../../../providers/OrderProvider";

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

function ParticipantDetailsForm() {
  const { handleSubmitCreateOrder } = useOrder();
  const { handleEditParticipantDetails } = useSessionReservation();
  const handleSaveAndCloseEdit = async (formData) => {
    try {
      const reservationId = sessionStorage.getItem(
        "currentSessionReservationId",
      );
      const reservationAfterUpdate = await handleEditParticipantDetails(
        reservationId,
        formData,
      );
      if (!reservationAfterUpdate) {
        return (
          <Box bgcolor="red" height="1300">
            sfsfsfs
          </Box>
        );
      }
      const dataReadyForOrder = {
        userId: reservationAfterUpdate.userId,
        studioReservations: [reservationAfterUpdate._id],
        totalPrice: 1000,
      };
      console.log("dataReadyForOrder:", dataReadyForOrder);
      const newOrder = await handleSubmitCreateOrder(dataReadyForOrder);
      return newOrder;
    } catch (error) {
      console.error("Error saving Order:", error);
    }
  };
  const { handleChange, handleSubmit, errors, formDetails, setFormDetails } =
    useForm(
      initialParticipantDetailsValues,
      participantDetailsSchema,
      handleSaveAndCloseEdit,
    );

  return (
    <Box
      elevation={3}
      sx={{
        width: "100%",
        p: 3,
        display: "flex",
        flexDirection: { xs: "column", sm: "column" },
        mb: 2,
        borderRadius: 2,
        boxShadow: 3,
      }}
    >
      <Box component="form" onSubmit={handleSubmit}>
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
        <Typography variant="subtitle1" sx={{ mb: 1 }}>
          Goals
        </Typography>
        {goalOptions.map((goal) => (
          <FormControlLabel
            key={goal}
            control={
              <Checkbox
                checked={formDetails.goals.includes(goal)}
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

        <Typography variant="subtitle1" sx={{ mb: 1 }}>
          Extras
        </Typography>
        {extraOptions.map((extra) => (
          <FormControlLabel
            key={extra}
            control={
              <Checkbox
                checked={formDetails.extras.includes(extra)}
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
        <Button type="submit" variant="contained" fullWidth size="large">
          Save Participant
        </Button>
      </Box>
    </Box>
  );
}

export default ParticipantDetailsForm;
