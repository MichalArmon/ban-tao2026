import useForm from "../../hooks/useForm";
import { Box, Button, Stack, MenuItem, TextField } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import availabilitySchema from "../models/availabilitySchema";

function AvailabilityBar({ initialRoomAvailabilityValues, handleSubmitForm }) {
  const {
    formDetails,
    handleChange,
    handleManualChange,
    handleSubmit,
    errors,
  } = useForm(
    initialRoomAvailabilityValues,
    availabilitySchema,
    handleSubmitForm,
  );

  return (
    <Box
      sx={{
        backgroundColor: "#f5f5f5",
        padding: "20px",
        borderRadius: "8px",
        boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
        margin: "20px auto",
        maxWidth: "1100px",
      }}
    >
      <Stack
        direction={{ xs: "column", md: "row" }}
        spacing={2}
        alignItems="center"
      >
        {/* 1. Date Picker: Check-in */}
        <DatePicker
          label="Check-in"
          value={formDetails.checkIn}
          onChange={(newValue) => handleManualChange("checkIn", newValue)}
          slotProps={{
            textField: { fullWidth: true, error: !!errors.checkIn },
          }}
        />

        {/* 2. Date Picker: Check-out */}
        <DatePicker
          label="Check-out"
          value={formDetails.checkOut}
          onChange={(newValue) => handleManualChange("checkOut", newValue)}
          slotProps={{
            textField: { fullWidth: true, error: !!errors.checkOut },
          }}
        />

        {/* 3. Select: Guests Count */}
        <TextField
          select
          label="Guests"
          name="guestsCount"
          value={formDetails.guestsCount}
          onChange={handleChange} // כאן זה אינפוט רגיל, handleChange עובד מעולה!
          fullWidth
        >
          {[1, 2, 3, 4, 5, 6].map((num) => (
            <MenuItem key={num} value={num}>
              {num} Guests
            </MenuItem>
          ))}
        </TextField>

        {/* 4. Select: Room Type */}
        <TextField
          select
          label="Room Type"
          name="roomType"
          value={formDetails.roomType}
          onChange={handleChange}
          fullWidth
        >
          <MenuItem value="All">All Types</MenuItem>
          <MenuItem value="Single">Single</MenuItem>
          <MenuItem value="Double">Double</MenuItem>
          <MenuItem value="Suite">Suite</MenuItem>
        </TextField>

        {/* 5. Search Button */}
        <Button
          variant="contained"
          size="large"
          onClick={handleSubmit}
          sx={{ height: "56px", minWidth: "150px" }}
        >
          Search
        </Button>
      </Stack>
    </Box>
  );
}

export default AvailabilityBar;
