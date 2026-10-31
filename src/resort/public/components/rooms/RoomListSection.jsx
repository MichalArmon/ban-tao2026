import { Hotel, People, SquareFoot } from "@mui/icons-material";
import {
  Box,
  Container,
  Grid,
  Stack,
  Typography,
  Paper,
  Button,
  Divider,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import LikeButton from "../../../components/ui/LikeButton";

function RoomListSection({
  imgSrc,
  imgTitle,
  title,
  blurb,
  slug,
  reverse = false,
  maxGuests,
  sizeM2,
  bedType,
  id,
}) {
  const navigate = useNavigate();

  const facilities = [
    {
      label: `${maxGuests ?? 2} guests`,
      icon: <People sx={{ fontSize: 19 }} />,
    },
    {
      label: `${sizeM2 ?? 30} m²`,
      icon: <SquareFoot sx={{ fontSize: 19 }} />,
    },
    {
      label: bedType ?? "King size",
      icon: <Hotel sx={{ fontSize: 19 }} />,
    },
  ];

  const handleRoomDetails = () => {
    navigate(`/resort/rooms/${slug}`);
  };

  return (
    <Container
      maxWidth="lg"
      sx={{
        py: { xs: 5, sm: 6, md: 9 },
      }}
    >
      <Grid
        container
        spacing={{ xs: 3.5, sm: 4, md: 6 }}
        direction={{ xs: "row", md: reverse ? "row-reverse" : "row" }}
        alignItems="center"
      >
        {/* ROOM IMAGE */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Box
            sx={{
              position: "relative",
              width: "100%",
              overflow: "hidden",
              borderRadius: { xs: 2, md: 3 },
              bgcolor: "#EDE9E2",
            }}
          >
            <Box
              component="img"
              src={imgSrc}
              alt={imgTitle || title}
              loading="lazy"
              decoding="async"
              sx={{
                display: "block",
                width: "100%",
                height: {
                  xs: 270,
                  sm: 360,
                  md: 440,
                },
                objectFit: "cover",
                transition: "transform 0.6s ease",
                "@media (hover: hover)": {
                  "&:hover": {
                    transform: "scale(1.025)",
                  },
                },
                "@media (prefers-reduced-motion: reduce)": {
                  transition: "none",
                },
              }}
            />

            {/* LIKE BUTTON */}
            <Box
              sx={{
                position: "absolute",
                top: { xs: 12, md: 18 },
                left: { xs: 12, md: 18 },
                zIndex: 2,
              }}
            >
              <LikeButton entityId={id} entityType="rooms" />
            </Box>
          </Box>
        </Grid>

        {/* ROOM CONTENT */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Stack
            spacing={{ xs: 2.5, md: 3 }}
            sx={{
              width: "100%",
              maxWidth: { md: 560 },
              mx: "auto",
            }}
          >
            {/* SMALL LABEL */}
            <Typography
              sx={{
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "primary.main",
              }}
            >
              STAY AT BAN TAO
            </Typography>

            {/* ROOM NAME */}
            <Typography
              component="h2"
              sx={{
                fontSize: {
                  xs: "clamp(1.9rem, 7vw, 2.5rem)",
                  md: "clamp(2.3rem, 3vw, 3.3rem)",
                },
                fontWeight: 500,
                letterSpacing: "-0.035em",
                lineHeight: 1.15,
                color: "text.primary",
              }}
            >
              {title}
            </Typography>

            {/* ROOM DESCRIPTION */}
            <Box>
              <Typography
                sx={{
                  fontSize: 12,
                  fontWeight: 700,
                  letterSpacing: "0.13em",
                  textTransform: "uppercase",
                  color: "text.secondary",
                  mb: 1.5,
                }}
              >
                The Room
              </Typography>

              <Typography
                sx={{
                  fontSize: { xs: 15, md: 16 },
                  lineHeight: 1.85,
                  color: "text.secondary",
                  maxWidth: 520,
                }}
              >
                {blurb || "Discover your space to relax and unwind."}
              </Typography>
            </Box>

            <Divider sx={{ borderColor: "divider" }} />

            {/* QUICK FACTS */}
            <Paper
              elevation={0}
              sx={{
                bgcolor: "background.paper",
                border: "1px solid",
                borderColor: "divider",
                borderRadius: 2,
                p: { xs: 2, sm: 2.5, md: 3 },
              }}
            >
              <Typography
                sx={{
                  fontSize: 12,
                  fontWeight: 700,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: "text.secondary",
                  mb: 2,
                }}
              >
                Room Details
              </Typography>

              <Grid container spacing={{ xs: 2, sm: 2.5 }}>
                {facilities.map((facility) => (
                  <Grid key={facility.label} size={{ xs: 12, sm: 4, md: 4 }}>
                    <Stack direction="row" alignItems="center" spacing={1.2}>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          color: "primary.main",
                          flexShrink: 0,
                        }}
                      >
                        {facility.icon}
                      </Box>

                      <Typography
                        sx={{
                          fontSize: 14,
                          color: "text.primary",
                          lineHeight: 1.4,
                        }}
                      >
                        {facility.label}
                      </Typography>
                    </Stack>
                  </Grid>
                ))}
              </Grid>
            </Paper>

            {/* ACTIONS */}
            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={1.5}
              sx={{
                pt: { xs: 0.5, md: 1 },
                alignItems: "stretch",
              }}
            >
              <Button
                variant="contained"
                onClick={handleRoomDetails}
                sx={{
                  px: 4,
                  py: 1.5,
                  minHeight: 48,
                  borderRadius: 1.5,
                  fontSize: 13,
                  fontWeight: 700,
                  letterSpacing: "0.04em",
                  textTransform: "none",
                  boxShadow: "none",
                  "&:hover": {
                    boxShadow: "none",
                  },
                }}
              >
                Book Now
              </Button>

              <Button
                variant="outlined"
                onClick={handleRoomDetails}
                sx={{
                  px: 4,
                  py: 1.5,
                  minHeight: 48,
                  borderRadius: 1.5,
                  fontSize: 13,
                  fontWeight: 600,
                  textTransform: "none",
                  color: "primary.main",
                  borderColor: "divider",
                  "&:hover": {
                    borderColor: "primary.main",
                    bgcolor: "transparent",
                  },
                }}
              >
                View Room Details
              </Button>
            </Stack>
          </Stack>
        </Grid>
      </Grid>
    </Container>
  );
}

export default RoomListSection;
