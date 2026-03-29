import { useState } from "react";
import MyTextField from "../../../../Form/MyTextField";
import LoginSchema from "../../../admin/models/LoginSchema";

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

function LoginForm({ handleSubmitForm, initialLoginValues }) {
  const { user } = useUser();
  const { handleChange, handleSubmit, errors, formDetails, setFormDetails } =
    useForm(initialLoginValues, LoginSchema, handleSubmitForm);

  return (
    <>
      <Grid
        container
        maxWidth="sm"
        spacing={1}
        sx={{ bgcolor: "rgba(255, 255, 255, 0)", p: 2 }}
      >
        <Grid size={{ md: 12, xs: 12 }}>
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
        <Grid size={{ md: 12, xs: 12 }}>
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
            Login
          </Button>
        </Grid>
      </Grid>
    </>
  );
}

export default LoginForm;
