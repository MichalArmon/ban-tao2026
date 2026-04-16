import {
  Typography,
  Grid,
  Box,
  Card,
  CardMedia,
  CardContent,
  Rating,
  Stack,
  Button,
  Divider,
} from "@mui/material";

function OrderCardWorkshop({ service, hour }) {
  return (
    <>
      <Card
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "column" },
          mb: 2,
          borderRadius: 2,
          boxShadow: 3,
        }}
      >
        <CardMedia
          component="img"
          sx={{
            width: { xs: "100%" },
            height: { xs: 200, sm: 200 },
            objectFit: "cover",
          }}
          image={service.hero.url}
          alt={service.title}
        />

        <CardContent
          sx={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            p: 3,
          }}
        >
          <Box>
            <Typography
              variant="h5"
              component="div"
              textAlign="center"
              sx={{ fontWeight: "bold", mb: 4 }}
            >
              {service.title}
            </Typography>
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="flex-start"
              spacing={2}
            ></Stack>

            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ mt: 1, mb: 3 }}
            >
              {service.blurb}
            </Typography>
          </Box>

          {/* 3. Action Section (Bottom Right) */}
          <Stack
            direction="column"
            justifyContent="space-between"
            alignItems="center"
            sx={{ mt: "auto", borderTop: "1px solid #eee", pt: 2 }}
          >
            <Box>
              <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                Your booking details
              </Typography>

              <Stack
                direction="row"
                spacing={2}
                sx={{ mt: 2, mb: 2 }}
                divider={<Divider orientation="vertical" flexItem />}
              >
                <Box>
                  <Typography variant="caption" color="text.secondary">
                    date
                  </Typography>
                  <Typography variant="body2" fontWeight="bold">
                    ffgdg
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {hour}
                  </Typography>
                </Box>
              </Stack>

              <Divider sx={{ my: 2 }} />

              <Box>
                <Typography variant="body2" fontWeight="bold">
                  yoga
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  yoga
                </Typography>
              </Box>
            </Box>
          </Stack>
        </CardContent>
      </Card>
      <Card
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "column" },
          mb: 2,
          borderRadius: 2,
          boxShadow: 3,
        }}
      >
        <CardContent
          sx={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            p: 3,
          }}
        >
          <Typography variant="h6" fontWeight="bold">
            Your price summary
          </Typography>
          <Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography variant="h5" fontWeight="bold">
                Total
              </Typography>
              <Typography variant="h5" fontWeight="bold">
                {service.price}
                {service.currency}
              </Typography>
            </Box>
            <Box sx={{ mt: 1 }}>
              <Typography variant="body2" color="text.secondary">
                Includes taxes and charges
              </Typography>
              <Typography variant="body2" color="text.secondary">
                In the property's local currency: € 251
              </Typography>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </>
  );
}

export default OrderCardWorkshop;
