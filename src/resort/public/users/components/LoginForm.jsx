import { useState } from "react";
import {
  Box,
  Button,
  Typography,
  Stack,
  IconButton,
  InputAdornment,
} from "@mui/material";

import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";

import { motion } from "motion/react";

import MyTextField from "../../../../Form/MyTextField";
import LoginSchema from "../../../admin/models/loginSchema";
import useForm from "../../../hooks/useForm";

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

function LoginForm({ handleSubmitForm, initialLoginValues }) {
  const [showPassword, setShowPassword] = useState(false);

  const { handleChange, handleSubmit, errors, formDetails } = useForm(
    initialLoginValues,
    LoginSchema,
    handleSubmitForm,
  );

  return (
    <Box
      component={motion.div}
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.55,
        ease: "easeOut",
      }}
      sx={{
        width: "100%",
      }}
    >
      {/* DECORATIVE HEADER */}
      <Box
        sx={{
          textAlign: "center",
          mb: 4,
        }}
      >
        <Box
          sx={{
            width: 40,
            height: "2px",
            bgcolor: "secondary.main",
            mx: "auto",
            mb: 2.5,
          }}
        />

        <Typography
          sx={{
            fontSize: 10,
            fontWeight: 600,
            letterSpacing: "0.22em",
            color: "secondary.main",
            mb: 1.5,
          }}
        >
          WELCOME BACK TO BAN TAO
        </Typography>

        <Typography
          component="h2"
          sx={{
            fontFamily: "Georgia, serif",
            fontSize: { xs: 32, sm: 38 },
            fontWeight: 400,
            color: "text.primary",
            mb: 1.5,
          }}
        >
          Welcome back
        </Typography>

        <Typography
          sx={{
            color: "text.secondary",
            fontSize: 13,
            lineHeight: 1.8,
          }}
        >
          Your island experience continues here.
        </Typography>
      </Box>

      {/* LOGIN FORM */}
      <Box component="form" onSubmit={handleSubmit}>
        <Stack spacing={2.5}>
          {/* EMAIL */}
          <MyTextField
            label="Email address"
            name="email"
            type="email"
            value={formDetails.email ?? ""}
            onChange={handleChange}
            error={Boolean(errors.email)}
            helperText={errors.email}
            autoComplete="email"
            required
            sx={fieldStyles}
          />

          {/* PASSWORD */}
          <MyTextField
            label="Password"
            name="password"
            type={showPassword ? "text" : "password"}
            value={formDetails.password ?? ""}
            onChange={handleChange}
            error={Boolean(errors.password)}
            helperText={errors.password}
            autoComplete="current-password"
            required
            sx={fieldStyles}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    type="button"
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                    onClick={() => setShowPassword((prev) => !prev)}
                    edge="end"
                    sx={{
                      color: "primary.main",
                      "&:hover": {
                        bgcolor: "transparent",
                      },
                    }}
                  >
                    {showPassword ? (
                      <VisibilityOffOutlinedIcon fontSize="small" />
                    ) : (
                      <VisibilityOutlinedIcon fontSize="small" />
                    )}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          {/* LOGIN BUTTON */}
          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{
              mt: "12px !important",
              minHeight: 54,
              bgcolor: "primary.main",
              color: "primary.contrastText",
              borderRadius: 0,
              fontSize: 12,
              fontWeight: 600,
              letterSpacing: "0.14em",
              boxShadow: "none",
              transition: "all 0.3s ease",

              "&:hover": {
                bgcolor: "primary.dark",
                boxShadow: "0 8px 22px rgba(75,58,43,0.18)",
                transform: "translateY(-2px)",
              },
            }}
          >
            SIGN IN
          </Button>
        </Stack>
      </Box>
    </Box>
  );
}

export default LoginForm;
