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
} from "@mui/material";

import useForm from "../../../hooks/useForm";
import orderSchema from "../../models/orderSchema";
import { useUser } from "../../../providers/UserProvider";

function OrderForm({ initialOrderValues, handleSubmitForm }) {
  const { user } = useUser();

  const { handleChange, handleSubmit, errors, formDetails } = useForm(
    initialOrderValues,
    orderSchema,
    handleSubmitForm,
  );

  if (!formDetails) {
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
      {user.isAdmin && (
        <Paper elevation={3} sx={{ p: 3, bgcolor: "#fdf2f2" }}>
          <Typography variant="h6" color="secondary" gutterBottom>
            Admin: Order Creation
          </Typography>
          <MyTextField
            name="userId"
            label="Customer ID"
            value={formDetails.userId}
            onChange={handleChange}
            error={!!errors.userId}
            helperText={errors.userId}
            fullWidth
            sx={{ mb: 2 }}
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
          name="boardType"
          value={formDetails.boardType}
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
          {user.isAdmin ? "Create Manual Order" : "Confirm & Pay"}
        </Button>
      </Box>
    </Box>
  );
}

export default OrderForm;
