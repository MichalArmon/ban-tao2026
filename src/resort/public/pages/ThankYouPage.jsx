import { Box, Card, CardContent, Typography, Button } from "@mui/material";

export default function ThankYouPage() {
  return (
    <Box
      sx={{
        overflowY: "hidden",
        minHeight: "calc(100vh - 34px)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundImage: "url('/leaves-bg.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Card */}
      <Card
        sx={{
          p: 4,
          maxWidth: 920,
          textAlign: "center",
          borderRadius: 3,
          boxShadow: 6,
        }}
      >
        <CardContent>
          <Typography variant="h4" fontWeight="600" gutterBottom>
            Thank You!
          </Typography>

          <Typography color="text.secondary" mb={3}>
            We’re truly excited to welcome you soon and share this unique
            experience with you.
            <br />
            <br />
            Your reservation has been received, and our team is preparing
            everything for your arrival.
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
}
