import {
  Box,
  Container,
  Grid,
  Stack,
  Typography,
  Chip,
  Button,
  Divider,
} from "@mui/material";
import { AccessTimeOutlined, ArrowForwardOutlined } from "@mui/icons-material";
import { useState } from "react";
import TreatmentModal from "./TreatmentModel";

function TreatmentListSection({
  imgSrc,
  imgTitle,
  title,
  description,
  level,
  category,
  bullets = [],
  currency,
  intensity,
  price,
  reverse = false,
  treatmentId,
  duration,
}) {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const detailsId = `treatment-details-${treatmentId}`;

  const formattedPrice =
    price != null ? `${price} ${currency || ""}`.trim() : null;

  const treatmentTags = [
    category,
    level ? `${level} level` : null,
    intensity ? `${intensity} intensity` : null,
  ].filter(Boolean);

  return (
    <Container
      maxWidth="lg"
      sx={{
        py: { xs: 5, sm: 6, md: 9 },
      }}
    >
      <Grid
        container
        direction={{
          xs: "row",
          md: reverse ? "row-reverse" : "row",
        }}
        spacing={{ xs: 3.5, md: 6 }}
        alignItems="center"
      >
        {/* TREATMENT IMAGE */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Box
            sx={{
              position: "relative",
              width: "100%",
              overflow: "hidden",
              borderRadius: { xs: 2, md: 3 },
              bgcolor: "background.paper",
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
          </Box>
        </Grid>

        {/* TREATMENT CONTENT */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Stack
            spacing={{ xs: 2.5, md: 3 }}
            sx={{
              width: "100%",
              maxWidth: { md: 560 },
              mx: "auto",
            }}
          >
            {/* EYEBROW */}
            <Typography
              sx={{
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "primary.main",
              }}
            >
              WELLNESS AT BAN TAO
            </Typography>

            {/* TREATMENT TITLE */}
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

            {/* CATEGORY / LEVEL / INTENSITY */}
            {treatmentTags.length > 0 && (
              <Stack direction="row" flexWrap="wrap" useFlexGap gap={1}>
                {treatmentTags.map((tag, index) => (
                  <Chip
                    key={`${tag}-${index}`}
                    label={tag}
                    size="small"
                    variant="outlined"
                    sx={{
                      height: 30,
                      borderRadius: 1,
                      borderColor: "divider",
                      color: "text.secondary",
                      fontSize: 12,
                      fontWeight: 500,
                    }}
                  />
                ))}
              </Stack>
            )}

            {/* DESCRIPTION */}
            <Box id={detailsId} sx={{ scrollMarginTop: "100px" }}>
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
                About the Treatment
              </Typography>

              <Typography
                sx={{
                  fontSize: { xs: 15, md: 16 },
                  lineHeight: 1.85,
                  color: "text.secondary",
                  whiteSpace: "pre-line",
                }}
              >
                {description}
              </Typography>
            </Box>

            {/* BENEFITS */}
            {bullets.length > 0 && (
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
                  Treatment Highlights
                </Typography>

                <Stack
                  component="ul"
                  spacing={1}
                  sx={{
                    pl: 2.5,
                    m: 0,
                    color: "text.secondary",
                  }}
                >
                  {bullets.map((bullet, index) => (
                    <Typography
                      key={index}
                      component="li"
                      sx={{
                        fontSize: { xs: 14, md: 15 },
                        lineHeight: 1.75,
                        pl: 0.5,
                      }}
                    >
                      {bullet}
                    </Typography>
                  ))}
                </Stack>
              </Box>
            )}

            <Divider sx={{ borderColor: "divider" }} />

            {/* DURATION AND PRICE */}
            <Stack
              direction="row"
              alignItems="center"
              flexWrap="wrap"
              useFlexGap
              gap={{ xs: 2.5, md: 4 }}
            >
              {duration != null && (
                <Stack direction="row" alignItems="center" spacing={1}>
                  <AccessTimeOutlined
                    sx={{
                      fontSize: 19,
                      color: "primary.main",
                    }}
                  />
                  <Typography
                    sx={{
                      fontSize: 14,
                      color: "text.secondary",
                    }}
                  >
                    {duration} min
                  </Typography>
                </Stack>
              )}

              {formattedPrice && (
                <Typography
                  sx={{
                    fontSize: 19,
                    fontWeight: 600,
                    color: "text.primary",
                    letterSpacing: "-0.02em",
                  }}
                >
                  {formattedPrice}
                </Typography>
              )}
            </Stack>

            {/* ACTIONS */}
            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={1.5}
              sx={{
                pt: 1,
                alignItems: "stretch",
              }}
            >
              <Button
                variant="contained"
                onClick={handleOpen}
                endIcon={<ArrowForwardOutlined />}
                sx={{
                  px: 4,
                  py: 1.5,
                  minHeight: 48,
                  borderRadius: 1.5,
                  fontSize: 13,
                  fontWeight: 700,
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
                onClick={() => {
                  document.getElementById(detailsId)?.scrollIntoView({
                    behavior: "smooth",
                    block: "start",
                  });
                }}
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
                Treatment Details
              </Button>
            </Stack>
          </Stack>
        </Grid>
      </Grid>

      {/* BOOKING MODAL */}
      <TreatmentModal
        open={open}
        onClose={handleClose}
        treatmentId={treatmentId}
        title={title}
        price={price}
        currency={currency}
        duration={duration}
      />
    </Container>
  );
}

export default TreatmentListSection;
