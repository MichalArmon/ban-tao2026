import MyTextField from "../../../../Form/MyTextField";
import {
  Button,
  Box,
  FormControlLabel,
  Typography,
  Paper,
  RadioGroup,
  Radio,
  Checkbox,
  TextField,
  Autocomplete,
} from "@mui/material";

import useForm from "../../../hooks/useForm";
import orderSchema from "../../models/orderSchema";
import { useUser } from "../../../providers/UserProvider";
import { useEffect } from "react";

function OrderForm({ initialOrderValues, handleSubmitForm }) {
  const { user, getUsersFromServer, users } = useUser();
  if (!users) {
    return <Typography>loading...</Typography>;
  }
  useEffect(() => {
    getUsersFromServer();
  }, []);

  const { handleChange, handleSubmit, errors, formDetails } = useForm(
    initialOrderValues,
    orderSchema,
    handleSubmitForm,
  );

  if (!users || !formDetails) {
    return (
      <Typography sx={{ p: 4, textAlign: "center" }}>
        Loading Order data...
      </Typography>
    );
  }
  console.log("Joi Errors:", errors);

  return (
    <Box
      sx={{ display: "flex", flexDirection: "column", gap: 3, width: "100%" }}
    >
      {/* --- חלק אדמין --- */}
      {user?.role === "admin" && (
        <Paper elevation={3} sx={{ p: 3, bgcolor: "#fdf2f2" }}>
          <Typography variant="h6" color="secondary" gutterBottom>
            Admin: Order Creation
          </Typography>
          <Autocomplete
            options={users}
            getOptionLabel={(option) => `${option.firstName}`}
            value={users.find((u) => u._id === formDetails.userId) || null}
            onChange={(event, newValue) => {
              handleChange({
                target: { name: "userId", value: newValue ? newValue._id : "" },
              });
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Select Customer"
                error={!!errors.userId}
                helperText={errors.userId}
                variant="outlined"
              />
            )}
          />
        </Paper>
      )}

      {/* --- חלק משותף לכולם --- */}
      <Box
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
        <Typography variant="h6" gutterBottom>
          Extra Services
        </Typography>

        {/* בחירת פנסיון */}
        <Typography variant="subtitle1" sx={{ mt: 2 }}>
          Meal Plan:
        </Typography>
        <RadioGroup
          name="mealPlan"
          value={formDetails.mealPlan}
          onChange={handleChange}
        >
          <FormControlLabel
            value="Breakfast only"
            control={<Radio />}
            label="Breakfast only"
          />
          <FormControlLabel
            value="Half board"
            control={<Radio />}
            label="Half board"
          />
          <FormControlLabel
            value="Full board"
            control={<Radio />}
            label="Full board"
          />
        </RadioGroup>

        {/* צ'קבוקסים - ה-Hook שלך יודע לטפל בהם בזכות ה-type === "checkbox" */}
        <Box sx={{ my: 2, display: "flex", flexDirection: "column" }}>
          <FormControlLabel
            control={
              <Checkbox
                checked={formDetails.rentScooter}
                name="rentScooter"
                onChange={handleChange}
              />
            }
            label="Rent a Scooter"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={formDetails.shuttleFromFerry}
                name="shuttleFromFerry"
                onChange={handleChange}
              />
            }
            label="Shuttle from Ferry Terminal"
          />
        </Box>

        <MyTextField
          name="specialRequests"
          label="Special Requests"
          multiline
          rows={3}
          value={formDetails.specialRequests}
          onChange={handleChange}
          fullWidth
        />

        <Button
          size="large"
          variant="contained"
          fullWidth
          sx={{ mt: 4 }}
          onClick={handleSubmit}
        >
          {user?.role === "admin" ? "Create Manual Order" : "Confirm & Pay"}
        </Button>
      </Box>
    </Box>
  );
}

export default OrderForm;
