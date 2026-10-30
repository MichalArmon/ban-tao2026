import { Box, Button, Typography, Grid, Stack } from "@mui/material";
import { motion } from "motion/react";

import MyTextField from "../../../../Form/MyTextField";
import registerSchema from "../../../admin/models/registerSchema";
import useForm from "../../../hooks/useForm";
import { useUser } from "../../../providers/UserProvider";
import BirthDatePicker from "./BirthDatePicker";

const fieldStyles = {
  "& .MuiOutlinedInput-root": {
    bgcolor: "#FFFFFF",
    minHeight: 54,
    borderRadius: 0,
    "& fieldset": {
      borderColor: "#E5DFD6",
    },
    "&:hover fieldset": {
      borderColor: "#A28B72",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#766354",
      borderWidth: 1,
    },
  },
  "& .MuiInputLabel-root": {
    color: "#89857F",
    fontSize: 14,
  },
  "& .MuiInputBase-input": {
    color: "#34483D",
    fontSize: 14,
  },
};

function RegisterForm({ handleSubmitForm, initialRegisterValues }) {
  const { user } = useUser();

  const { handleChange, handleSubmit, errors, formDetails, setFormDetails } =
    useForm(initialRegisterValues, registerSchema, handleSubmitForm);

  return (
    <Box
      component={motion.div}
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, ease: "easeOut" }}
      sx={{ width: "100%" }}
    >
      <Box sx={{ textAlign: "center", mb: 4 }}>
        <Box
          sx={{
            width: 40,
            height: "2px",
            bgcolor: "#A28B72",
            mx: "auto",
            mb: 2.5,
          }}
        />

        <Typography
          sx={{
            fontSize: 10,
            fontWeight: 600,
            letterSpacing: "0.22em",
            color: "#A28B72",
            mb: 1.5,
          }}
        >
          WELCOME TO BAN TAO
        </Typography>

        <Typography
          component="h2"
          sx={{
            fontFamily: "Georgia, serif",
            fontSize: { xs: 32, sm: 38 },
            fontWeight: 400,
            color: "#34483D",
            mb: 1.5,
          }}
        >
          Create your account
        </Typography>

        <Typography
          sx={{
            fontSize: 13,
            color: "#89857F",
            lineHeight: 1.8,
          }}
        >
          Your island experience begins here.
        </Typography>
      </Box>

      <Box component="form" onSubmit={handleSubmit} noValidate={false}>
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, sm: 6 }}>
            <MyTextField
              label="First name"
              name="firstName"
              value={formDetails.firstName || ""}
              onChange={handleChange}
              error={Boolean(errors.firstName)}
              helperText={errors.firstName}
              autoComplete="given-name"
              required
              sx={fieldStyles}
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 6 }}>
            <MyTextField
              label="Last name"
              name="lastName"
              value={formDetails.lastName || ""}
              onChange={handleChange}
              error={Boolean(errors.lastName)}
              helperText={errors.lastName}
              autoComplete="family-name"
              required
              sx={fieldStyles}
            />
          </Grid>

          <Grid size={{ xs: 12 }}>
            <MyTextField
              label="Email address"
              name="email"
              type="email"
              value={formDetails.email || ""}
              onChange={handleChange}
              error={Boolean(errors.email)}
              helperText={errors.email}
              autoComplete="email"
              required
              sx={fieldStyles}
            />
          </Grid>

          <Grid size={{ xs: 12 }}>
            <MyTextField
              label="Password"
              name="password"
              type="password"
              value={formDetails.password || ""}
              onChange={handleChange}
              error={Boolean(errors.password)}
              helperText={errors.password}
              autoComplete="new-password"
              required
              sx={fieldStyles}
            />
          </Grid>

          <Grid size={{ xs: 12 }}>
            <MyTextField
              label="Phone number"
              name="phone"
              type="tel"
              value={formDetails.phone || ""}
              onChange={handleChange}
              error={Boolean(errors.phone)}
              helperText={errors.phone}
              autoComplete="tel"
              required
              sx={fieldStyles}
            />
          </Grid>

          <Grid size={{ xs: 12 }}>
            <Box
              sx={{
                mt: 1,
                "& .MuiFormControl-root": {
                  width: "100%",
                },
                "& .MuiOutlinedInput-root": {
                  bgcolor: "#FFFFFF",
                  borderRadius: 0,
                  minHeight: 54,
                },
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#E5DFD6",
                },
              }}
            >
              <BirthDatePicker
                value={formDetails.birthDate}
                onChange={(newValue) => {
                  setFormDetails((prev) => ({
                    ...prev,
                    birthDate: newValue ? newValue.toDate() : null,
                  }));
                }}
              />
            </Box>
            {errors.birthDate && (
              <Typography
                sx={{
                  color: "error.main",
                  fontSize: 12,
                  mt: 1,
                }}
              >
                {errors.birthDate}
              </Typography>
            )}
          </Grid>

          <Grid size={{ xs: 12 }}>
            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{
                mt: 2,
                minHeight: 54,
                bgcolor: "#766354",
                color: "#FFFFFF",
                borderRadius: 0,
                fontSize: 12,
                fontWeight: 600,
                letterSpacing: "0.14em",
                boxShadow: "none",
                transition: "all 0.3s ease",
                "&:hover": {
                  bgcolor: "#554539",
                  boxShadow: "0 8px 22px rgba(75,58,43,0.18)",
                  transform: "translateY(-2px)",
                },
              }}
            >
              {user
                ? user.isAdmin
                  ? "EDIT USER"
                  : "UPDATE ACCOUNT"
                : "CREATE ACCOUNT"}
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}

export default RegisterForm;
