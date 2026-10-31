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

import { AccessTimeOutlined, ArrowBack } from "@mui/icons-material";

import { useTreatment } from "../../../providers/TreatmentProvider";
import TreatmentModal from "./TreatmentModel";
import AnimatedTitle from "../../../components/ui/AnimatedTitle";

const FALLBACK_IMG =
  "https://images.pexels.com/photos/7598360/pexels-photo-7598360.jpeg";

export default function TreatmentFullPageCard() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { handleGetTreatment } = useTreatment();

  const [treatment, setTreatment] = useState(null);
  const [mainImage, setMainImage] = useState(null);
  const [currentGallery, setCurrentGallery] = useState([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    let active = true;

    async function loadTreatment() {
      setLoading(true);
      setTreatment(null);
      setMainImage(null);
      setCurrentGallery([]);

      try {
        const data = await handleGetTreatment(id);

        if (!active) return;

        setTreatment(data || null);
        setMainImage(data?.hero?.url || FALLBACK_IMG);

        const gallery =
          data?.gallery?.map((image) => image?.url).filter(Boolean) || [];

        setCurrentGallery(gallery);
      } catch (error) {
        console.error("Error loading treatment:", error);
      } finally {
        if (active) setLoading(false);
      }
    }

    if (id) loadTreatment();

    return () => {
      active = false;
    };

    // Fetch again when the treatment ID changes.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const handleImageChange = (imageUrl) => {
    if (!imageUrl || imageUrl === mainImage) return;
    setMainImage(imageUrl);
  };

  if (loading) {
    return (
      <Box
        sx={{
          minHeight: "65vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (!treatment) {
    return (
      <Container sx={{ mt: 15, mb: 10 }}>
        <Typography variant="h5">Treatment not found.</Typography>

        <Button onClick={() => navigate("/resort/treatments")} sx={{ mt: 2 }}>
          Back to Treatments
        </Button>
      </Container>
    );
  }

  const treatmentTags = [
    treatment.category,
    treatment.level ? `${treatment.level} level` : null,
    treatment.intensity ? `${treatment.intensity} intensity` : null,
  ].filter(Boolean);

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
      {/* TITLE */}
      <Box sx={{ mb: { xs: 3, md: 4 } }}>
        <AnimatedTitle>{treatment.title}</AnimatedTitle>
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
              alt={treatment.title}
              sx={{
                display: "block",
                width: "100%",
                height: { xs: 270, sm: 390, md: 520 },
                objectFit: "cover",
              }}
              onError={(event) => {
                if (event.currentTarget.src !== FALLBACK_IMG) {
                  event.currentTarget.src = FALLBACK_IMG;
                }
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
                  aria-label={`View treatment image ${index + 1}`}
                  aria-pressed={isActive}
                  sx={{
                    width: "100%",
                    height: "100%",
                    minWidth: 0,
                    minHeight: 0,
                    p: 0,
                    border: "2px solid",
                    borderColor: isActive ? "primary.main" : "transparent",
                    borderRadius: 1.5,
                    overflow: "hidden",
                    cursor: "pointer",
                    bgcolor: "background.paper",
                  }}
                >
                  <Box
                    component="img"
                    src={url}
                    alt=""
                    loading="lazy"
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

      {/* TREATMENT INFORMATION */}
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
            About the Treatment
          </Typography>

          <Typography
            sx={{
              fontSize: { xs: 15, md: 17 },
              lineHeight: 1.9,
              whiteSpace: "pre-line",
              color: "text.secondary",
              mb: 4,
            }}
          >
            {treatment.description}
          </Typography>

          {!!treatment.bullets?.length && (
            <>
              <Divider sx={{ mb: 4 }} />

              <Typography
                sx={{
                  fontSize: 12,
                  fontWeight: 700,
                  letterSpacing: "0.13em",
                  color: "primary.main",
                  mb: 2,
                }}
              >
                TREATMENT HIGHLIGHTS
              </Typography>

              <Stack
                component="ul"
                spacing={1.5}
                sx={{
                  pl: 3,
                  color: "text.secondary",
                }}
              >
                {treatment.bullets.map((bullet, index) => (
                  <Typography
                    key={index}
                    component="li"
                    sx={{
                      fontSize: { xs: 15, md: 16 },
                      lineHeight: 1.8,
                    }}
                  >
                    {bullet}
                  </Typography>
                ))}
              </Stack>
            </>
          )}

          {treatmentTags.length > 0 && (
            <Stack
              direction="row"
              flexWrap="wrap"
              useFlexGap
              gap={1}
              sx={{ mt: 4 }}
            >
              {treatmentTags.map((tag, index) => (
                <Chip
                  key={`${tag}-${index}`}
                  label={tag}
                  variant="outlined"
                  sx={{
                    borderRadius: 1,
                    borderColor: "divider",
                    color: "text.secondary",
                  }}
                />
              ))}
            </Stack>
          )}
        </Grid>

        {/* QUICK FACTS AND BOOKING */}
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
              Treatment Details
            </Typography>

            <Stack spacing={2}>
              {treatment.duration != null && (
                <Stack direction="row" alignItems="center" spacing={1.5}>
                  <AccessTimeOutlined
                    sx={{
                      color: "primary.main",
                      fontSize: 21,
                    }}
                  />

                  <Typography sx={{ fontSize: 15 }}>
                    {treatment.duration} min
                  </Typography>
                </Stack>
              )}

              {treatment.price != null && (
                <Typography
                  sx={{
                    fontSize: 22,
                    fontWeight: 600,
                    color: "text.primary",
                  }}
                >
                  {treatment.price} {treatment.currency}
                </Typography>
              )}
            </Stack>

            <Divider sx={{ my: 3 }} />

            <Button
              fullWidth
              variant="contained"
              onClick={() => setOpen(true)}
              sx={{
                minHeight: 48,
                borderRadius: 1.5,
                textTransform: "none",
                fontWeight: 700,
                boxShadow: "none",
                "&:hover": { boxShadow: "none" },
              }}
            >
              Book Now
            </Button>
          </Paper>
        </Grid>
      </Grid>

      <TreatmentModal
        open={open}
        onClose={() => setOpen(false)}
        treatmentId={treatment._id}
        title={treatment.title}
        price={treatment.price}
        currency={treatment.currency}
        duration={treatment.duration}
      />
    </Container>
  );
}
