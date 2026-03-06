import { Hotel, People, SquareFoot } from "@mui/icons-material";
import {
  Box,
  Container,
  Grid,
  Stack,
  Typography,
  Chip,
  Paper,
  Button,
} from "@mui/material";

function TreatmentListSection({
  imgSrc,
  imgTitle,
  title,
  description,
  level,
  category,
  bullets,

  intensity,
  price,
  reverse = false,
}) {
  return (
    <Container maxWidth="lg" sx={{ py: { xs: 4, md: 6 } }}>
      <Grid
        alignItems="center"
        container
        spacing={4}
        direction={reverse ? "row-reverse" : "row"}
        sx={{
          flexWrap: "nowrap",
          "@media (max-width:900px)": { flexWrap: "wrap" },
        }}
      >
        {/* IMAGE */}
        <Grid
          item
          size={6}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Box
            component="img"
            src={imgSrc}
            alt={imgTitle}
            loading="lazy"
            sx={{
              width: "100%",
              height: 400,
              objectFit: "cover",
              borderRadius: 3,
              boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
            }}
          />
        </Grid>

        {/* TEXT */}
        <Grid size={6}>
          <Stack spacing={2} sx={{ mx: "auto" }}>
            <Stack direction="row" spacing={1}>
              <Chip label={`${level} level`} size="small" />
              <Chip label={`${price} level`} size="small" />
              <Chip label={`${category} level`} size="small" />
              <Chip label={`${intensity} level`} size="small" />
            </Stack>
            <Typography variant="h4" fontWeight={800}>
              {title}
            </Typography>
            <Typography variant="body1" sx={{ color: "text.secondary" }}>
              {" "}
              {description}
            </Typography>

            {bullets.length > 0 && (
              <Stack component="ul" spacing={1} sx={{ pl: 2, m: 0 }}>
                {bullets.map((bullet, i) => (
                  <Typography key={i} component="li" variant="body2">
                    {bullet}
                  </Typography>
                ))}
              </Stack>
            )}
            <Stack direction="row" spacing={2} sx={{ pt: 1 }}>
              <Button variant="contained">Book Now</Button>

              {/* 🟣 כפתור שפותח את הלו״ז */}
              <Button variant="text" onClick={() => {}}>
                See Schedule
              </Button>
            </Stack>
          </Stack>
        </Grid>
      </Grid>
    </Container>
  );
}

export default TreatmentListSection;
