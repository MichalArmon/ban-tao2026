import {
  Box,
  Container,
  Typography,
  Button,
  Stack,
  Divider,
} from "@mui/material";

import CheckCircleOutlineRoundedIcon from "@mui/icons-material/CheckCircleOutlineRounded";
import ArrowOutwardRoundedIcon from "@mui/icons-material/ArrowOutwardRounded";

import { Link, useLocation } from "react-router-dom";
import { motion } from "motion/react";
import dayjs from "dayjs";

export default function ThankYouPage() {
  const { state } = useLocation();
  const reservation = state?.reservation;

  const formatDate = (date) => (date ? dayjs(date).format("MMM D, YYYY") : "—");

  return (
    <Box
      sx={{
        minHeight: "calc(100svh - 80px)",
        bgcolor: "#F7F5EF",
        display: "flex",
        alignItems: "center",
        py: { xs: 8, md: 12 },
      }}
    >
      <Container maxWidth="sm">
        <Box
          component={motion.div}
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          sx={{ textAlign: "center" }}
        >
          <CheckCircleOutlineRoundedIcon
            sx={{
              fontSize: 54,
              color: "#34483D",
              mb: 3,
            }}
          />

          <Typography
            sx={{
              color: "#A28B72",
              fontSize: 11,
              fontWeight: 600,
              letterSpacing: "0.2em",
              mb: 2,
            }}
          >
            BAN TAO VILLAGE
          </Typography>

          <Typography
            component="h1"
            sx={{
              fontFamily: "Georgia, serif",
              fontSize: { xs: 42, md: 58 },
              fontWeight: 400,
              color: "#34483D",
              lineHeight: 1.15,
              mb: 3,
            }}
          >
            Thank you.
          </Typography>

          <Typography
            sx={{
              color: "#766354",
              fontSize: 15,
              lineHeight: 1.9,
              maxWidth: 430,
              mx: "auto",
              mb: 5,
            }}
          >
            {reservation
              ? "Your reservation has been confirmed. We look forward to welcoming you to Ban Tao Village."
              : "Thank you for choosing Ban Tao Village. We look forward to welcoming you."}
          </Typography>

          {reservation && (
            <Box
              sx={{
                bgcolor: "#FFFFFF",
                border: "1px solid #EAE5DD",
                p: { xs: 3, md: 5 },
                mb: 4,
                textAlign: "left",
              }}
            >
              <Typography
                sx={{
                  fontSize: 11,
                  letterSpacing: "0.15em",
                  fontWeight: 600,
                  color: "#A28B72",
                  mb: 3,
                }}
              >
                YOUR RESERVATION
              </Typography>

              <Stack spacing={2}>
                <DetailRow label="Reservation number" value={reservation._id} />

                <Divider />

                <DetailRow
                  label="Check-in"
                  value={formatDate(reservation.checkIn)}
                />

                <DetailRow
                  label="Check-out"
                  value={formatDate(reservation.checkOut)}
                />

                <DetailRow label="Status" value={reservation.status || "—"} />

                {reservation.extraPreferencesDetails?.mealPlan && (
                  <DetailRow
                    label="Meal plan"
                    value={reservation.extraPreferencesDetails.mealPlan}
                  />
                )}
              </Stack>
            </Box>
          )}

          <Button
            component={Link}
            to="/resort"
            variant="contained"
            endIcon={<ArrowOutwardRoundedIcon />}
            sx={{
              bgcolor: "#766354",
              color: "#FFFFFF",
              borderRadius: 0,
              px: 5,
              py: 1.8,
              fontSize: 11,
              fontWeight: 600,
              letterSpacing: "0.12em",
              boxShadow: "none",
              "&:hover": {
                bgcolor: "#554539",
              },
            }}
          >
            BACK TO HOME
          </Button>
        </Box>
      </Container>
    </Box>
  );
}

function DetailRow({ label, value }) {
  return (
    <Stack
      direction="row"
      justifyContent="space-between"
      alignItems="flex-start"
      spacing={2}
    >
      <Typography sx={{ fontSize: 12, color: "#89857F" }}>{label}</Typography>

      <Typography
        sx={{
          fontSize: 12,
          fontWeight: 600,
          color: "#34483D",
          textAlign: "right",
          overflowWrap: "anywhere",
        }}
      >
        {value || "—"}
      </Typography>
    </Stack>
  );
}
