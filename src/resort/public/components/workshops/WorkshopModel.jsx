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

import {
  ArrowForwardOutlined,
  ArrowOutwardOutlined,
} from "@mui/icons-material";

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

  const shortDescription =
    description?.length > 260
      ? `${description.slice(0, 260).trimEnd()}…`
      : description;

  return (
    <Container
      maxWidth="lg"
      sx={{
        py: { xs: 5, sm: 7, md: 10 },
      }}
    >
      <Grid
        container
        spacing={{ xs: 3, sm: 4, md: 7 }}
        direction={{
          xs: "row",
          md: reverse ? "row-reverse" : "row",
        }}
        alignItems="center"
      >
        {/* IMAGE */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Box
            sx={{
              position: "relative",
              width: "100%",
              overflow: "hidden",
              borderRadius: { xs: 2, md: 2.5 },
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
                  xs: 290,
                  sm: 390,
                  md: 470,
                },
                objectFit: "cover",
                transition: "transform 0.5s ease",

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

            {/* SUBTLE IMAGE LABEL */}
            {category && (
              <Box
                sx={{
                  position: "absolute",
                  bottom: 18,
                  left: 18,
                  px: 2,
                  py: 0.9,
                  borderRadius: 1,
                  bgcolor: "rgba(255,255,255,0.92)",
                }}
              >
                <Typography
                  sx={{
                    fontSize: 11,
                    fontWeight: 600,
                    letterSpacing: "0.09em",
                    color: "text.primary",
                    textTransform: "uppercase",
                  }}
                >
                  {category}
                </Typography>
              </Box>
            )}
          </Box>
        </Grid>

        {/* CONTENT */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Stack
            sx={{
              width: "100%",
              maxWidth: 530,
              mx: "auto",
            }}
            spacing={{ xs: 2.5, md: 3 }}
          >
            {/* EYEBROW */}
            <Typography
              sx={{
                fontSize: 11,
                fontWeight: 600,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "primary.main",
              }}
            >
              BAN TAO EXPERIENCES
            </Typography>

            {/* TITLE */}
            <Typography
              component="h2"
              sx={{
                fontSize: {
                  xs: "clamp(2rem, 7vw, 2.7rem)",
                  md: "clamp(2.4rem, 3.5vw, 3.4rem)",
                },
                fontWeight: 400,
                letterSpacing: "-0.035em",
                lineHeight: 1.15,
                color: "text.primary",
              }}
            >
              {title}
            </Typography>

            {/* DESCRIPTION */}
            {shortDescription && (
              <Typography
                sx={{
                  fontSize: { xs: 15, md: 16 },
                  lineHeight: 1.9,
                  color: "text.secondary",
                  whiteSpace: "pre-line",
                }}
              >
                {shortDescription}
              </Typography>
            )}

            {/* HIGHLIGHTS */}
            {bullets.length > 0 && (
              <Stack spacing={1.1}>
                {bullets.slice(0, 3).map((bullet, index) => (
                  <Stack
                    key={index}
                    direction="row"
                    alignItems="flex-start"
                    spacing={1.5}
                  >
                    <Box
                      sx={{
                        width: 5,
                        height: 5,
                        borderRadius: "50%",
                        bgcolor: "primary.main",
                        mt: "10px",
                        flexShrink: 0,
                      }}
                    />

                    <Typography
                      sx={{
                        fontSize: 14,
                        lineHeight: 1.65,
                        color: "text.secondary",
                      }}
                    >
                      {bullet}
                    </Typography>
                  </Stack>
                ))}
              </Stack>
            )}

            {/* DETAILS */}
            {(level || intensity || price != null) && (
              <>
                <Divider />

                <Stack
                  direction="row"
                  flexWrap="wrap"
                  useFlexGap
                  gap={{ xs: 2, md: 3 }}
                  alignItems="center"
                >
                  {level && (
                    <Typography
                      sx={{
                        fontSize: 13,
                        color: "text.secondary",
                      }}
                    >
                      {level} level
                    </Typography>
                  )}

                  {intensity && (
                    <Typography
                      sx={{
                        fontSize: 13,
                        color: "text.secondary",
                      }}
                    >
                      {intensity} intensity
                    </Typography>
                  )}

                  {price != null && (
                    <Typography
                      sx={{
                        fontSize: 17,
                        fontWeight: 600,
                        color: "text.primary",
                        ml: { md: "auto" },
                      }}
                    >
                      {price}
                    </Typography>
                  )}
                </Stack>
              </>
            )}

            {/* ACTIONS */}
            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={1.5}
              sx={{ pt: { xs: 0.5, md: 1 } }}
            >
              <Button
                variant="contained"
                onClick={() => setOpen(true)}
                endIcon={<ArrowForwardOutlined />}
                sx={{
                  minHeight: 48,
                  px: 3.5,
                  py: 1.4,
                  borderRadius: 1.5,
                  textTransform: "none",
                  fontSize: 13,
                  fontWeight: 600,
                  boxShadow: "none",
                  "&:hover": {
                    boxShadow: "none",
                  },
                }}
              >
                See Schedule
              </Button>

              <Button
                variant="text"
                onClick={() => navigate(`/resort/workshops/${slug}`)}
                disabled={!slug}
                endIcon={<ArrowOutwardOutlined />}
                sx={{
                  minHeight: 48,
                  px: 2,
                  color: "primary.main",
                  textTransform: "none",
                  fontSize: 13,
                  fontWeight: 600,
                  justifyContent: {
                    xs: "center",
                    sm: "flex-start",
                  },
                  "&:hover": {
                    bgcolor: "transparent",
                    color: "text.primary",
                  },
                }}
              >
                Explore Workshop
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
