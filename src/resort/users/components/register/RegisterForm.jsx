import { useState } from "react";
import MyTextField from "../../../../Form/MyTextField";
import registerSchema from "../../../admin/models/registerSchema";

import useForm from "../../../hooks/useForm";
import { useUser } from "../../../providers/UserProvider";

import {
  Grid,
  Button,
  Box,
  FormControlLabel,
  Switch,
  Typography,
} from "@mui/material";
import BirthDatePicker from "./BirthDatePicker";

function RegisterForm({ handleSubmitForm, initialRegisterValues }) {
  const [birthDate, setBirthDate] = useState(null);
  const { user } = useUser();
  const { handleChange, handleSubmit, errors, formDetails, setFormDetails } =
    useForm(initialRegisterValues, registerSchema, handleSubmitForm);

  return (
    <>
      <Grid
        container
        maxWidth="sm"
        spacing={1}
        sx={{ bgcolor: "rgba(255, 255, 255, 0)", p: 2 }}
      >
        <Grid size={{ md: 6, xs: 12 }}>
          <MyTextField
            label="first name"
            name="firstName"
            onChange={handleChange}
            error={Boolean(errors.firstName)}
            helperText={errors.firstName}
            value={formDetails.firstName || ""}
            required
          />
        </Grid>

        <Grid size={{ md: 6, xs: 12 }}>
          <MyTextField
            label="last name"
            name="lastName"
            onChange={handleChange}
            error={Boolean(errors.slug)}
            helperText={errors.slug}
            value={formDetails.slug}
            required
          />
        </Grid>
        <Grid size={{ md: 6, xs: 12 }}>
          <MyTextField
            label="email"
            name="email"
            onChange={handleChange}
            error={Boolean(errors.email)}
            helperText={errors.email}
            value={formDetails.email}
            required
          />
        </Grid>
        <Grid size={{ md: 6, xs: 12 }}>
          <MyTextField
            label="password"
            name="password"
            onChange={handleChange}
            error={Boolean(errors.password)}
            helperText={errors.password}
            value={formDetails.password}
            required
          />
        </Grid>
        <Grid size={{ md: 12, xs: 12 }}>
          <MyTextField
            label="phone"
            name="phone"
            onChange={handleChange}
            error={Boolean(errors.phone)}
            helperText={errors.phone}
            value={formDetails.phone}
            required
          />
        </Grid>
        <Grid size={{ md: 12, xs: 12 }}>
          <Box style={{ marginTop: "20px", marginBottom: "20px" }} fullWidth>
            <BirthDatePicker
              value={formDetails.birthDate}
              onChange={(newValue) => {
                const joiFriendlyDate = newValue ? newValue.toDate() : null;
                setFormDetails((prev) => ({
                  ...prev,
                  birthDate: joiFriendlyDate,
                }));
              }}
            />
          </Box>
          <Grid size={{ md: 12, xs: 12 }}>
            <Button
              sx={{
                px: 2,
                "&:hover": {
                  backgroundColor: "primary.main",
                  color: "white",
                  boxShadow: "0px 10px 20px rgba(0,0,0,0.4)",
                  transform: "scale(1.02)",
                  borderWidth: 0,
                  fontWeight: 700,
                },
              }}
              variant="contained"
              size="large"
              onClick={handleSubmit}
              fullWidth
            >
              {user ? "edit user" : "Register"}
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}

export default RegisterForm;
