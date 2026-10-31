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

import { ArrowForwardOutlined } from "@mui/icons-material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import WorkshopModal from "./WorkshopModel";

function WorkshopListSection({
  imgSrc,
  imgTitle,
  title,
  description,
  level,
  category,
  bullets = [],
  slug,
  intensity,
  price,
  reverse = false,
  workshopId,
}) {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const onClose = () => setOpen(false);

  const workshopTags = [
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
        spacing={{ xs: 3.5, sm: 4, md: 6 }}
        direction={{
          xs: "row",
          md: reverse ? "row-reverse" : "row",
        }}
        alignItems="center"
      >
        {/* WORKSHOP IMAGE */}
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

        {/* WORKSHOP CONTENT */}
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
              EXPERIENCES AT BAN TAO
            </Typography>

            {/* WORKSHOP TITLE */}
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
            {workshopTags.length > 0 && (
              <Stack direction="row" flexWrap="wrap" useFlexGap gap={1}>
                {workshopTags.map((tag, index) => (
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
                About the Workshop
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

            {/* WORKSHOP HIGHLIGHTS */}
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
                  Workshop Highlights
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

            {/* PRICE */}
            {price != null && (
              <Typography
                sx={{
                  fontSize: 19,
                  fontWeight: 600,
                  color: "text.primary",
                  letterSpacing: "-0.02em",
                }}
              >
                {price}
              </Typography>
            )}

            {/* ACTIONS */}
            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={1.5}
              sx={{
                pt: 1,
                alignItems: "stretch",
              }}
            >
              {/* SCHEDULE MODAL */}
              <Button
                variant="contained"
                onClick={() => setOpen(true)}
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
                See Schedule
              </Button>

              {/* WORKSHOP DETAILS PAGE */}
              <Button
                variant="outlined"
                onClick={() => navigate(`/resort/workshops/${slug}`)}
                disabled={!slug}
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
                Learn More
              </Button>
            </Stack>
          </Stack>
        </Grid>
      </Grid>

      {/* SCHEDULE MODAL */}
      <WorkshopModal open={open} onClose={onClose} workshopId={workshopId} />
    </Container>
  );
}

export default WorkshopListSection;
