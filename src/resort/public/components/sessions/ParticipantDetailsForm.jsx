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
} from "@mui/material";
import useForm from "../../../hooks/useForm";
import initialParticipantDetailsValues from "../../../admin/helpers/sessionReservation/initialValues/initialValuesParticipantDetails";
import participantDetailsSchema from "../../../admin/models/sessionReservation/participantDetailsSchema";

const levels = ["beginner", "intermediate", "advanced"];

const goalOptions = [
  "Improve flexibility",
  "Build strength",
  "Reduce stress",
  "Improve balance",
  "Increase mobility",
  "Recover from fatigue",
  "Breathing practice",
  "Mind-body connection",
];

const injuriesOptions = [
  "No injuries",
  "Lower back sensitivity",
  "Knee pain",
  "Shoulder tension",
  "Neck tension",
  "Wrist sensitivity",
  "Hip tightness",
  "Recent injury",
];

const extraOptions = [
  "Yoga mat",
  "Blocks",
  "Strap",
  "Bolster",
  "Blanket",
  "Chair support",
  "Private guidance",
  "Gentle pace",
];

function ParticipantDetailsForm({ onSubmit }) {
  const { handleChange, handleSubmit, errors, formDetails, setFormDetails } =
    useForm(
      initialParticipantDetailsValues,
      participantDetailsSchema,
      onSubmit,
    );

  return (
    <Paper
      elevation={3}
      sx={{
        p: 4,

        margin: "auto",
        borderRadius: 4,
        width: "100%",
      }}
    >
      <Box
        component="form"
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <TextField
          select
          fullWidth
          label="Level"
          name="level"
          value={formDetails.level}
          onChange={handleChange}
          error={!!errors.level}
          helperText={errors.level}
          sx={{ mb: 3 }}
        >
          {levels.map((lvl) => (
            <MenuItem key={lvl} value={lvl}>
              {lvl}
            </MenuItem>
          ))}
        </TextField>

        <Typography variant="subtitle1" sx={{ mb: 1 }}>
          Goals
        </Typography>
        <Autocomplete
          multiple
          options={goalOptions}
          value={formDetails.goals || []}
          onChange={(event, newValue) =>
            setFormDetails((prev) => ({
              ...prev,
              goals: newValue,
            }))
          }
          renderTags={(value, getTagProps) =>
            value.map((option, index) => (
              <Chip label={option} {...getTagProps({ index })} key={option} />
            ))
          }
          renderInput={(params) => (
            <TextField
              {...params}
              placeholder="Select goals"
              error={!!errors.goals}
              helperText={errors.goals}
            />
          )}
          sx={{ mb: 3 }}
        />

        <TextField
          select
          fullWidth
          label="Injuries / Notes"
          name="injuriesNotes"
          value={formDetails.injuriesNotes}
          onChange={handleChange}
          error={!!errors.injuriesNotes}
          helperText={errors.injuriesNotes}
          sx={{ mb: 3 }}
        >
          {injuriesOptions.map((item) => (
            <MenuItem key={item} value={item}>
              {item}
            </MenuItem>
          ))}
        </TextField>

        <Typography variant="subtitle1" sx={{ mb: 1 }}>
          Extras
        </Typography>
        <Autocomplete
          multiple
          options={extraOptions}
          value={formDetails.extras || []}
          onChange={(event, newValue) =>
            setFormDetails((prev) => ({
              ...prev,
              extras: newValue,
            }))
          }
          renderTags={(value, getTagProps) =>
            value.map((option, index) => (
              <Chip label={option} {...getTagProps({ index })} key={option} />
            ))
          }
          renderInput={(params) => (
            <TextField
              {...params}
              placeholder="Select extras"
              error={!!errors.extras}
              helperText={errors.extras}
            />
          )}
          sx={{ mb: 3 }}
        />

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
    </Paper>
  );
}

export default ParticipantDetailsForm;
