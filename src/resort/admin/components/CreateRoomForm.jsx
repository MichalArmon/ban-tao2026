import MyTextField from "../../../Form/MyTextField";

import { Grid, Button, Box, FormControlLabel, Switch } from "@mui/material";
import initialRoomValues from "../helpers/initialValues/initialRoomValues";
import roomSchema from "../models/roomSchema";
import useForm from "../../hooks/useForm";
import { useRoom } from "../../providers/RoomProvider";

function CreateRoomForm() {
  const { handleSubmitCreateRoom } = useRoom();
  const { handleChange, handleSubmit, errors, formDetails } = useForm(
    initialRoomValues,
    roomSchema,
    handleSubmitCreateRoom,
  );

  return (
    <>
      <Grid container maxWidth="sm" spacing={1} sx={{ bgcolor: "#fff", p: 2 }}>
        <Grid container size={12} sx={{ display: "flex" }}>
          <Grid size={{ md: 6, xs: 12 }}>
            <MyTextField
              label="title"
              name="title"
              onChange={handleChange}
              error={Boolean(errors.title)}
              helperText={errors.title}
              value={formDetails.title || ""}
              required
            />
          </Grid>

          <Grid size={{ md: 6, xs: 12 }}>
            <MyTextField
              label="slug"
              name="slug"
              onChange={handleChange}
              error={Boolean(errors.slug)}
              helperText={errors.slug}
              value={formDetails.slug}
              required
            />
          </Grid>
        </Grid>
        <Grid container size={12}>
          <Grid size={{ md: 12, xs: 12 }}>
            <MyTextField
              label=" blurb"
              name=" blurb"
              onChange={handleChange}
              error={Boolean(errors.blurb)}
              helperText={errors.blurb}
              value={formDetails.blurb}
              required
            />
          </Grid>
        </Grid>
        <Grid container size={12}>
          <Grid size={{ md: 6, xs: 12 }}>
            <MyTextField
              label=" features"
              name=" features"
              onChange={handleChange}
              error={Boolean(errors.features)}
              value={formDetails.features}
              helperText={errors.features}
              required
            />
          </Grid>
          <Grid size={{ md: 6, xs: 12 }}>
            <MyTextField
              label=" maxGuests"
              name=" maxGuests"
              onChange={handleChange}
              value={formDetails.maxGuests}
              required
              type="number"
              error={Boolean(errors.maxGuests)}
              helperText={errors.maxGuests}
              // sx={{ "& .MuiOutlinedInput-root": { borderRadius: 5 } }}
            />
          </Grid>
        </Grid>

        <Grid container size={12}>
          <Grid size={{ md: 6, xs: 12 }}>
            <MyTextField
              label="sizeM2"
              onChange={handleChange}
              name="sizeM2"
              error={Boolean(errors.sizeM2)}
              helperText={errors.sizeM2}
              value={formDetails.sizeM2}
              type="number"
            />
          </Grid>
          <Grid size={{ md: 6, xs: 12 }}>
            <MyTextField
              label="bedType"
              name="bedType"
              onChange={handleChange}
              error={Boolean(errors.bedType)}
              helperText={errors.bedType}
              value={formDetails.bedType}
            />
          </Grid>
        </Grid>

        <Grid container size={12}>
          <Grid size={{ md: 6, xs: 12 }}>
            <MyTextField
              label="priceBase"
              onChange={handleChange}
              name="priceBase"
              error={Boolean(errors.priceBase)}
              helperText={errors.priceBase}
              value={formDetails.priceBase}
              type="number"
            />
          </Grid>
          <Grid size={{ md: 6, xs: 12 }}>
            <MyTextField
              label="currency"
              name="currency"
              onChange={handleChange}
              error={Boolean(errors.currency)}
              helperText={errors.currency}
              value={formDetails.currency}
            />
          </Grid>
        </Grid>

        <Grid container size={12}>
          <Grid size={{ md: 6, xs: 12 }}>
            <MyTextField
              label="stock"
              onChange={handleChange}
              name="stock"
              error={Boolean(errors.stock)}
              helperText={errors.stock}
              value={formDetails.stock}
              type="number"
            />
          </Grid>
          <Grid size={{ md: 6, xs: 12 }}>
            <FormControlLabel
              control={
                <Switch checked={formDetails.active} onChange={handleChange} />
              }
              label="Active"
              name="active"
            />
          </Grid>
        </Grid>

        <Grid container size={12}>
          <Grid size={{ md: 4, xs: 12 }}>
            <MyTextField
              label="heroPublicId"
              onChange={handleChange}
              name="heroPublicId"
              error={Boolean(errors.heroPublicId)}
              helperText={errors.heroPublicId}
              value={formDetails.heroPublicId}
            />
          </Grid>
          <Grid size={{ md: 4, xs: 12 }}>
            <MyTextField
              label="heroUrl"
              onChange={handleChange}
              name="heroUrl"
              error={Boolean(errors.heroUrl)}
              helperText={errors.heroUrl}
              value={formDetails.heroUrl}
            />
          </Grid>
          <Grid size={{ md: 4, xs: 12 }}>
            <MyTextField
              label="heroAlt"
              onChange={handleChange}
              name="heroAlt"
              error={Boolean(errors.heroAlt)}
              helperText={errors.heroAlt}
              value={formDetails.heroAlt}
            />
          </Grid>
        </Grid>

        <Box>
          <Button
            sx={{
              px: 2,
              "&:hover": {
                backgroundColor: "primary.main",
                color: "white",
                boxShadow: "0px 10px 20px rgba(0,0,0,0.4)",
                transform: "scale(1.02)",
                borderWidth: 0,
                fontWeight: 700,
              },
            }}
            variant="outlined"
            color="white"
            size="large"
            onClick={handleSubmit}
            fullWidth
          >
            create new room
          </Button>
        </Box>
      </Grid>
    </>
  );
}

export default CreateRoomForm;
