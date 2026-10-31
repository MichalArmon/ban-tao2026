import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import {
  Container,
  Box,
  Typography,
  Grid,
  Button,
  Chip,
  Stack,
  Divider,
  Paper,
} from "@mui/material";

import { Hotel, SquareFoot, People } from "@mui/icons-material";

import { useRoom } from "../../providers/RoomProvider";
import AnimatedTitle from "../../components/ui/AnimatedTitle";
import { useLoading } from "../../providers/LoadingProvider";

const FALLBACK_IMG =
  "https://images.pexels.com/photos/7598360/pexels-photo-7598360.jpeg";

export default function FullPageCard() {
  const { setIsLoading } = useLoading();
  const { handleGetRoomBySlug, room } = useRoom();

  const navigate = useNavigate();
  const { slug } = useParams();

  const [mainImage, setMainImage] = useState(null);
  const [currentGallery, setCurrentGallery] = useState([]);

  // FETCH ROOM
  useEffect(() => {
    if (slug) {
      handleGetRoomBySlug(slug);
    }

    // Kept dependent on slug to preserve the existing fetch behavior.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug]);

  // UPDATE ROOM IMAGES
  useEffect(() => {
    if (!room) return;

    setMainImage(room.hero?.url || FALLBACK_IMG);

    const gallery =
      room.gallery?.map((image) => image?.url).filter(Boolean) || [];

    setCurrentGallery(gallery);
  }, [room]);

  // LOADING STATE
  useEffect(() => {
    setIsLoading(!room);

    return () => setIsLoading(false);
  }, [room, setIsLoading]);

  const handleImageChange = (newImgSrc) => {
    if (!newImgSrc || newImgSrc === mainImage) return;
    setMainImage(newImgSrc);
  };

  const handleAvailability = () => {
    navigate("/resort/", {
      state: { scrollToAvailability: true },
    });
  };

  if (!room) return null;

  const facilities = [
    {
      label: `${room.maxGuests ?? 2} guests`,
      icon: <People sx={{ fontSize: 19 }} />,
    },
    {
      label: `${room.sizeM2 ?? 30} m²`,
      icon: <SquareFoot sx={{ fontSize: 19 }} />,
    },
    {
      label: room.bedType ?? "King size",
      icon: <Hotel sx={{ fontSize: 19 }} />,
    },
  ];

  return (
    <Container
      maxWidth="xl"
      sx={{
        mt: { xs: 9, md: 10 },
        pt: { xs: 2, md: 4 },
        pb: { xs: 6, md: 9 },
        px: { xs: 2, sm: 3, md: 5 },
      }}
    >
      {/* ROOM TITLE */}
      <Box sx={{ mb: { xs: 3, md: 4 } }}>
        <AnimatedTitle>{room.title}</AnimatedTitle>
      </Box>

      {/* HERO IMAGE & GALLERY */}
      <Grid container spacing={{ xs: 1.5, md: 2 }} alignItems="stretch">
        {/* MAIN IMAGE */}
        <Grid size={{ xs: 12, md: 9 }}>
          <Paper
            elevation={0}
            sx={{
              width: "100%",
              height: "100%",
              overflow: "hidden",
              borderRadius: { xs: 2, md: 3 },
              bgcolor: "background.paper",
              border: "1px solid",
              borderColor: "divider",
            }}
          >
            <Box
              component="img"
              src={mainImage || FALLBACK_IMG}
              alt={room.title}
              decoding="async"
              onError={(event) => {
                if (event.currentTarget.src !== FALLBACK_IMG) {
                  event.currentTarget.src = FALLBACK_IMG;
                }
              }}
              sx={{
                display: "block",
                width: "100%",
                height: {
                  xs: 270,
                  sm: 390,
                  md: 520,
                },
                objectFit: "cover",
              }}
            />
          </Paper>
        </Grid>

        {/* GALLERY */}
        <Grid size={{ xs: 12, md: 3 }}>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "repeat(3, minmax(110px, 1fr))",
                md: "1fr",
              },
              gridTemplateRows: {
                xs: "90px",
                md: `repeat(${Math.max(currentGallery.length, 1)}, minmax(0, 1fr))`,
              },
              gap: 1.5,
              height: { xs: 90, md: 520 },
              overflowX: { xs: "auto", md: "hidden" },
              overflowY: "hidden",
            }}
          >
            {currentGallery.map((url, index) => {
              const isActive = url === mainImage;

              return (
                <Box
                  key={`${url}-${index}`}
                  component="button"
                  type="button"
                  onClick={() => handleImageChange(url)}
                  aria-label={`View room image ${index + 1}`}
                  aria-pressed={isActive}
                  sx={{
                    width: "100%",
                    height: "100%",
                    minWidth: 0,
                    minHeight: 0,
                    p: 0,
                    overflow: "hidden",
                    border: "2px solid",
                    borderColor: isActive ? "primary.main" : "transparent",
                    borderRadius: 1.5,
                    bgcolor: "background.paper",
                    cursor: "pointer",

                    "&:focus-visible": {
                      outline: "2px solid",
                      outlineColor: "primary.main",
                      outlineOffset: 2,
                    },
                  }}
                >
                  <Box
                    component="img"
                    src={url}
                    alt=""
                    loading="lazy"
                    decoding="async"
                    sx={{
                      display: "block",
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                </Box>
              );
            })}
          </Box>
        </Grid>
      </Grid>

      <Divider sx={{ my: { xs: 4, md: 6 } }} />

      {/* ROOM INFORMATION */}
      <Grid container spacing={{ xs: 4, md: 6 }} alignItems="start">
        {/* DESCRIPTION AND AMENITIES */}
        <Grid size={{ xs: 12, md: 7 }} sx={{ order: { xs: 2, md: 1 } }}>
          <Typography
            sx={{
              fontSize: 12,
              fontWeight: 700,
              letterSpacing: "0.13em",
              textTransform: "uppercase",
              color: "primary.main",
              mb: 2,
            }}
          >
            Room Description
          </Typography>

          <Typography
            sx={{
              fontSize: { xs: 15, md: 17 },
              lineHeight: 1.9,
              whiteSpace: "pre-line",
              color: "text.secondary",
              maxWidth: 750,
              mb: { xs: 4, md: 5 },
            }}
          >
            {room.blurb}
          </Typography>

          {!!room.features?.length && (
            <>
              <Divider sx={{ mb: 4 }} />

              <Typography
                sx={{
                  fontSize: 12,
                  fontWeight: 700,
                  letterSpacing: "0.13em",
                  textTransform: "uppercase",
                  color: "primary.main",
                  mb: 2.5,
                }}
              >
                Room Amenities
              </Typography>

              <Stack direction="row" flexWrap="wrap" useFlexGap gap={1}>
                {room.features.map((feature) => (
                  <Chip
                    key={feature}
                    label={feature}
                    variant="outlined"
                    sx={{
                      minHeight: 34,
                      height: "auto",
                      borderRadius: 1,
                      borderColor: "divider",
                      color: "text.secondary",
                      fontSize: 13,
                      "& .MuiChip-label": {
                        py: 0.6,
                      },
                    }}
                  />
                ))}
              </Stack>
            </>
          )}
        </Grid>

        {/* QUICK FACTS */}
        <Grid size={{ xs: 12, md: 5 }} sx={{ order: { xs: 1, md: 2 } }}>
          <Paper
            elevation={0}
            sx={{
              p: { xs: 2.5, md: 3.5 },
              border: "1px solid",
              borderColor: "divider",
              borderRadius: 2,
              bgcolor: "background.paper",
            }}
          >
            <Typography
              sx={{
                fontSize: 12,
                fontWeight: 700,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "text.secondary",
                mb: 3,
              }}
            >
              Room Quick Facts
            </Typography>

            <Grid container spacing={2}>
              {facilities.map((facility) => (
                <Grid key={facility.label} size={{ xs: 12, sm: 4, md: 12 }}>
                  <Stack direction="row" alignItems="center" spacing={1.5}>
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
                        fontSize: 15,
                        color: "text.primary",
                      }}
                    >
                      {facility.label}
                    </Typography>
                  </Stack>
                </Grid>
              ))}
            </Grid>

            <Divider sx={{ my: 3 }} />

            {/* CHECK AVAILABILITY */}
            <Button
              fullWidth
              variant="contained"
              size="large"
              onClick={handleAvailability}
              sx={{
                minHeight: 48,
                px: 3,
                py: 1.5,
                borderRadius: 1.5,
                textTransform: "none",
                fontSize: 14,
                fontWeight: 700,
                boxShadow: "none",

                "&:hover": {
                  boxShadow: "none",
                },
              }}
            >
              Check Availability
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}
