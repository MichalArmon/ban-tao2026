import {
  Box,
  Button,
  Stack,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";

import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";

import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { motion } from "motion/react";

import useForm from "../../hooks/useForm";
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

  const fieldStyles = {
    flex: 1,
    minWidth: 0,

    "& .MuiOutlinedInput-root": {
      height: 56,
      borderRadius: 1.5,
      bgcolor: "#FAF9F6",
      color: "#34483D",
      transition: "all 0.3s ease",

      "& fieldset": {
        borderColor: "#E2DED6",
      },

      "&:hover fieldset": {
        borderColor: "#A08C78",
      },

      "&.Mui-focused fieldset": {
        borderColor: "#766354",
        borderWidth: 1.5,
      },
    },

    "& .MuiInputLabel-root": {
      color: "#8B8176",
      fontSize: 14,
    },

    "& .MuiInputLabel-root.Mui-focused": {
      color: "#766354",
    },

    "& .MuiInputBase-input": {
      fontSize: 15,
    },
  };

  return (
    <Box
      component={motion.section}
      initial={{ opacity: 0, y: 35 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{
        duration: 0.85,
        ease: [0.22, 1, 0.36, 1],
      }}
      sx={{
        width: "100%",
        boxSizing: "border-box",
        bgcolor: "#FFFFFF",

        px: { xs: 2.5, sm: 4, md: 5 },
        py: { xs: 4, md: 5 },

        border: "1px solid #EAE5DD",
        boxShadow: "0 18px 55px rgba(59, 48, 38, 0.12)",

        my: { xs: 3, md: 4 },

        position: "relative",
        overflow: "visible",

        transition: "box-shadow 0.3s ease",

        "&:hover": {
          boxShadow: "0 22px 65px rgba(59, 48, 38, 0.16)",
        },

        "@media (prefers-reduced-motion: reduce)": {
          transition: "none",
        },
      }}
    >
      {/* DECORATIVE LINE */}
      <Box
        component={motion.div}
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{
          duration: 0.9,
          delay: 0.35,
          ease: "easeOut",
        }}
        sx={{
          width: 54,
          height: 3,
          bgcolor: "#A28B72",
          borderRadius: 5,
          mb: 3,
          transformOrigin: "left",
        }}
      />

      {/* HEADING */}
      <Box
        component={motion.div}
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{
          duration: 0.7,
          delay: 0.2,
          ease: "easeOut",
        }}
        sx={{
          mb: 4,
        }}
      >
        <Typography
          sx={{
            color: "#978574",
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            mb: 1.5,
          }}
        >
          YOUR ISLAND ESCAPE AWAITS
        </Typography>

        <Typography
          component="h2"
          sx={{
            fontFamily: "Georgia, serif",
            fontSize: { xs: 29, sm: 34, md: 39 },
            fontWeight: 400,
            lineHeight: 1.15,
            color: "#34483D",
            letterSpacing: "-0.02em",
            mb: 1.5,
          }}
        >
          Find your perfect stay
        </Typography>

        <Typography
          sx={{
            color: "#89857F",
            fontSize: { xs: 13, md: 14 },
            lineHeight: 1.7,
          }}
        >
          A little closer to paradise. Discover your home away from home.
        </Typography>
      </Box>

      {/* BOOKING FORM */}
      <Box component="form" onSubmit={handleSubmit}>
        <Stack
          component={motion.div}
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.65,
            delay: 0.35,
            ease: "easeOut",
          }}
          direction={{ xs: "column", md: "row" }}
          spacing={2}
          alignItems="stretch"
          sx={{ width: "100%" }}
        >
          {/* CHECK IN */}
          <DatePicker
            label="Check in"
            value={formDetails.checkIn || null}
            onChange={(newValue) => handleManualChange("checkIn", newValue)}
            slots={{
              openPickerIcon: CalendarMonthOutlinedIcon,
            }}
            slotProps={{
              textField: {
                fullWidth: true,
                error: Boolean(errors.checkIn),
                helperText: errors.checkIn,
                sx: fieldStyles,
              },
            }}
          />

          {/* CHECK OUT */}
          <DatePicker
            label="Check out"
            value={formDetails.checkOut || null}
            minDate={formDetails.checkIn || undefined}
            onChange={(newValue) => handleManualChange("checkOut", newValue)}
            slots={{
              openPickerIcon: CalendarMonthOutlinedIcon,
            }}
            slotProps={{
              textField: {
                fullWidth: true,
                error: Boolean(errors.checkOut),
                helperText: errors.checkOut,
                sx: fieldStyles,
              },
            }}
          />

          {/* GUESTS */}
          <TextField
            select
            fullWidth
            label="Guests"
            name="guestsCount"
            value={formDetails.guestsCount}
            onChange={handleChange}
            error={Boolean(errors.guestsCount)}
            helperText={errors.guestsCount}
            sx={fieldStyles}
          >
            {[1, 2, 3, 4, 5, 6].map((num) => (
              <MenuItem key={num} value={num}>
                {num} {num === 1 ? "Guest" : "Guests"}
              </MenuItem>
            ))}
          </TextField>

          {/* ROOM TYPE */}
          <TextField
            select
            fullWidth
            label="Room Type"
            name="roomType"
            value={formDetails.roomType}
            onChange={handleChange}
            error={Boolean(errors.roomType)}
            helperText={errors.roomType}
            sx={fieldStyles}
          >
            <MenuItem value="All">All Types</MenuItem>
            <MenuItem value="Single">Single</MenuItem>
            <MenuItem value="Double">Double</MenuItem>
            <MenuItem value="Suite">Suite</MenuItem>
            <MenuItem value="Shared">Shared</MenuItem>
            <MenuItem value="Studio">Studio</MenuItem>
          </TextField>

          {/* SEARCH BUTTON */}
          <Button
            type="submit"
            variant="contained"
            endIcon={<ArrowForwardRoundedIcon />}
            sx={{
              minWidth: { xs: "100%", md: 180 },
              height: 56,
              flexShrink: 0,

              bgcolor: "#766354",
              color: "#FFFFFF",
              borderRadius: 1.5,

              fontSize: 12,
              fontWeight: 700,
              letterSpacing: "0.08em",

              boxShadow: "0 5px 14px rgba(75,58,43,0.18)",
              transition: "all 0.3s ease",

              "&:hover": {
                bgcolor: "#554539",
                boxShadow: "0 10px 22px rgba(75,58,43,0.25)",
                transform: "translateY(-2px)",
              },

              "& .MuiButton-endIcon": {
                transition: "transform 0.3s ease",
              },

              "&:hover .MuiButton-endIcon": {
                transform: "translateX(4px)",
              },
            }}
          >
            SEARCH
          </Button>
        </Stack>
      </Box>

      {/* FOOTER NOTE */}
      <Typography
        sx={{
          mt: 3,
          textAlign: "center",
          fontSize: 12,
          color: "#A09A91",
          letterSpacing: "0.015em",
        }}
      >
        Thoughtfully designed stays, unforgettable island moments.
      </Typography>
    </Box>
  );
}

export default AvailabilityBar;
