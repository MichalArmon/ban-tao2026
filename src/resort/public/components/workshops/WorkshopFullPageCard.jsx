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
  CircularProgress,
} from "@mui/material";

import { ArrowForwardOutlined } from "@mui/icons-material";

import { useWorkshop } from "../../../providers/WorkshopProvider";
import AnimatedTitle from "../../../components/ui/AnimatedTitle";
import { useLoading } from "../../../providers/LoadingProvider";

const FALLBACK_IMG =
  "https://images.pexels.com/photos/7598360/pexels-photo-7598360.jpeg";

export default function WorkshopFullPageCard() {
  const { setIsLoading } = useLoading();
  const { handleGetWorkshopBySlug, workshop } = useWorkshop();

  const navigate = useNavigate();
  const { slug } = useParams();

  const [mainImage, setMainImage] = useState(null);
  const [currentGallery, setCurrentGallery] = useState([]);
  const [loading, setLoading] = useState(true);

  // FETCH WORKSHOP
  useEffect(() => {
    let active = true;

    const loadWorkshop = async () => {
      setLoading(true);

      try {
        await handleGetWorkshopBySlug(slug);
      } catch (error) {
        console.error("Error loading workshop:", error);
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    };

    if (slug) {
      loadWorkshop();
    }

    return () => {
      active = false;
    };

    // Fetch only when the slug changes.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug]);

  // UPDATE WORKSHOP IMAGES
  useEffect(() => {
    if (!workshop) return;

    setMainImage(workshop.hero?.url || FALLBACK_IMG);

    const gallery =
      workshop.gallery?.map((image) => image?.url).filter(Boolean) || [];

    setCurrentGallery(gallery);
  }, [workshop]);

  // GLOBAL LOADING STATE
  useEffect(() => {
    setIsLoading(loading);

    return () => setIsLoading(false);
  }, [loading, setIsLoading]);

  const handleImageChange = (newImgSrc) => {
    if (!newImgSrc || newImgSrc === mainImage) return;
    setMainImage(newImgSrc);
  };

  const handleAvailability = () => {
    navigate("/resort/", {
      state: { scrollToAvailability: true },
    });
  };

  if (loading || !workshop) {
    return (
      <Box
        sx={{
          minHeight: "60vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {loading && <CircularProgress color="primary" />}
      </Box>
    );
  }

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
      {/* WORKSHOP TITLE */}
      <Box sx={{ mb: { xs: 3, md: 4 } }}>
        <AnimatedTitle>{workshop.title}</AnimatedTitle>
      </Box>

      {/* HERO AND GALLERY */}
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
              alt={workshop.title}
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
                md: `repeat(${Math.max(
                  currentGallery.length,
                  1,
                )}, minmax(0, 1fr))`,
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
                  aria-label={`View workshop image ${index + 1}`}
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
                    transition: "border-color 0.2s ease",

                    "&:hover": {
                      borderColor: "primary.light",
                    },

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
                    onError={(event) => {
                      event.currentTarget.onerror = null;
                      event.currentTarget.src = FALLBACK_IMG;
                    }}
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

      {/* WORKSHOP INFORMATION */}
      <Grid container spacing={{ xs: 4, md: 6 }} alignItems="start">
        {/* DESCRIPTION */}
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
            About the Workshop
          </Typography>

          {workshop.blurb && (
            <Typography
              sx={{
                fontSize: { xs: 16, md: 18 },
                fontWeight: 500,
                lineHeight: 1.8,
                whiteSpace: "pre-line",
                color: "text.primary",
                mb: 3,
              }}
            >
              {workshop.blurb}
            </Typography>
          )}

          {workshop.description && (
            <Typography
              sx={{
                fontSize: { xs: 15, md: 17 },
                lineHeight: 1.9,
                whiteSpace: "pre-line",
                color: "text.secondary",
                mb: 4,
              }}
            >
              {workshop.description}
            </Typography>
          )}

          {!!workshop.tags?.length && (
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
                Workshop Highlights
              </Typography>

              <Stack direction="row" flexWrap="wrap" useFlexGap gap={1}>
                {workshop.tags.map((tag) => (
                  <Chip
                    key={tag}
                    label={tag}
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

        {/* WORKSHOP QUICK FACTS */}
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
              Workshop Details
            </Typography>

            {workshop.tags?.length > 0 && (
              <Stack direction="row" flexWrap="wrap" useFlexGap gap={1}>
                {workshop.tags.map((tag) => (
                  <Chip
                    key={tag}
                    label={tag}
                    variant="outlined"
                    size="small"
                    sx={{
                      borderRadius: 1,
                      borderColor: "divider",
                      color: "text.secondary",
                    }}
                  />
                ))}
              </Stack>
            )}

            <Divider sx={{ my: 3 }} />

            <Button
              variant="contained"
              fullWidth
              size="large"
              endIcon={<ArrowForwardOutlined />}
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
