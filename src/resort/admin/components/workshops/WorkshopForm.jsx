import MyTextField from "../../../../Form/MyTextField";
import {
  Grid,
  Button,
  Box,
  FormControlLabel,
  Switch,
  Typography,
} from "@mui/material";
import { useWorkshop } from "../../../providers/WorkshopProvider";
import useForm from "../../../hooks/useForm";
import workshopSchema from "../../models/workshopSchema";
import useRoomUploadImages from "../../../hooks/cloudinary/useUploadImages";
import useCloudinaryUpload from "../../../hooks/cloudinary/useCloudinaryUpload";
import { Close } from "@mui/icons-material";
import TagsInput from "../../../../Form/components/TagsInput";

function WorkshopForm({ initialWorkshopValues, handleSubmitForm }) {
  const { workshop } = useWorkshop();
  const { handleChange, handleSubmit, errors, formDetails, setFormDetails } =
    useForm(initialWorkshopValues, workshopSchema, handleSubmitForm);

  const { isUploading } = useCloudinaryUpload();
  const {
    handleUploadHeroImage,
    handleUploadGalleryImage,
    handleDeleteImageFromGallery,
  } = useRoomUploadImages(setFormDetails, "workshops");

  if (!formDetails) {
    return (
      <Typography sx={{ p: 4, textAlign: "center" }}>
        Loading Workshop data...
      </Typography>
    );
  }

  return (
    <>
      <Grid container maxWidth="xl" spacing={1} sx={{ bgcolor: "#fff", p: 2 }}>
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
          <Grid size={{ md: 12, xs: 12 }}>
            <MyTextField
              label="blurb"
              name="blurb"
              onChange={handleChange}
              error={Boolean(errors.blurb)}
              helperText={errors.blurb}
              value={formDetails.blurb}
              required
            />
          </Grid>
          <Grid size={{ md: 12, xs: 12 }}>
            <MyTextField
              label="description"
              name="description"
              onChange={handleChange}
              error={Boolean(errors.description)}
              helperText={errors.description}
              value={formDetails.description}
              required
            />
          </Grid>
          <Grid size={{ md: 12, xs: 12 }}>
            <MyTextField
              label="bullets"
              name="bullets"
              onChange={handleChange}
              error={Boolean(errors.bullets)}
              helperText={errors.bullets}
              value={formDetails.bullets}
              required
            />
          </Grid>
          <Grid size={{ md: 12, xs: 12 }}>
            <TagsInput
              label="Tags"
              value={formDetails.tags}
              onChange={(newTags) => {
                setFormDetails({ ...formDetails, tags: newTags });
              }}
              name="tags"
            />
          </Grid>
          <Grid size={{ md: 4, xs: 12 }}>
            <MyTextField
              label="price"
              name="price"
              onChange={handleChange}
              error={Boolean(errors.price)}
              helperText={errors.price}
              value={formDetails.price}
              required
            />
          </Grid>
          <Grid size={{ md: 4, xs: 12 }}>
            <MyTextField
              label="currency"
              name="currency"
              onChange={handleChange}
              error={Boolean(errors.currency)}
              helperText={errors.currency}
              value={formDetails.currency}
              required
            />
          </Grid>
        </Grid>

        <Grid size={{ md: 4, xs: 12 }}>
          <MyTextField
            label="instructor"
            name="instructor"
            onChange={handleChange}
            error={Boolean(errors.instructor)}
            value={formDetails.instructor}
            helperText={errors.instructor}
            required
          />
        </Grid>
        <Grid size={{ md: 4, xs: 12 }}>
          <MyTextField
            label="duration"
            name="duration"
            onChange={handleChange}
            value={formDetails.duration}
            required
            type="number"
            error={Boolean(errors.duration)}
            helperText={errors.duration}
          />
        </Grid>

        <Grid size={{ md: 4, xs: 12 }}>
          <MyTextField
            label="level"
            onChange={handleChange}
            name="level"
            error={Boolean(errors.level)}
            helperText={errors.level}
            value={formDetails.level}
          />
        </Grid>
        <Grid size={{ md: 12, xs: 12 }}>
          <MyTextField
            label="contraindications"
            name="contraindications"
            onChange={handleChange}
            error={Boolean(errors.contraindications)}
            helperText={errors.contraindications}
            value={formDetails.contraindications}
          />
        </Grid>

        <Grid size={{ md: 4, xs: 12 }}>
          <FormControlLabel
            control={
              <Switch checked={formDetails.isActive} onChange={handleChange} />
            }
            label="Active"
            name="isActive"
          />
        </Grid>
        <Grid size={{ md: 4, xs: 12 }}>
          <FormControlLabel
            control={
              <Switch checked={formDetails.isPrivate} onChange={handleChange} />
            }
            label="Private"
            name="isPrivate"
          />
        </Grid>
        <Grid size={{ md: 4, xs: 12 }}>
          <FormControlLabel
            control={
              <Switch checked={formDetails.isClosed} onChange={handleChange} />
            }
            label="Closed"
            name="isClosed"
          />
        </Grid>

        {/* ✔️✔️✔️ HERO ✔️✔️✔️ */}
        <Grid
          container
          size={12}
          sx={{ mt: 2, p: 2, border: "1px dashed grey" }}
        >
          <Typography variant="h6" sx={{ width: "100%", mb: 1 }}>
            Hero image
          </Typography>

          <Button variant="contained" component="label" disabled={isUploading}>
            {isUploading ? "Image is Uploading..." : "Add new hero image"}
            <input
              type="file"
              hidden
              accept="image/*"
              onChange={(event) => {
                handleUploadHeroImage(event, formDetails.slug);
              }}
            />
          </Button>

          {/* תצוגה מקדימה של התמונות שכבר עלו למערך */}
          <Box
            sx={{
              display: "flex",
              gap: 2,
              mt: 2,
              width: "100%",
              flexWrap: "wrap",
            }}
          >
            {formDetails.heroUrl && (
              <Box
                sx={{
                  width: 100,
                  height: 100,
                  overflow: "hidden",
                  borderRadius: 2,
                }}
              >
                <img
                  src={formDetails.heroUrl}
                  alt={formDetails.heroAlt}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
              </Box>
            )}
          </Box>
        </Grid>
        {/* ✔️✔️✔️GALLERY✔️✔️✔️ */}
        <Grid
          container
          size={12}
          sx={{ mt: 2, p: 2, border: "1px dashed grey" }}
        >
          <Typography variant="h6" sx={{ width: "100%", mb: 1 }}>
            Gallery
          </Typography>

          <Button variant="contained" component="label" disabled={isUploading}>
            {isUploading ? "Image is Uploading..." : "Add new image"}
            <input
              type="file"
              hidden
              accept="image/*"
              onChange={(event) => {
                handleUploadGalleryImage(event, formDetails.slug);
              }}
            />
          </Button>

          {/* תצוגה מקדימה של התמונות שכבר עלו למערך */}
          <Box
            sx={{
              display: "flex",
              gap: 2,
              mt: 2,
              width: "100%",
              flexWrap: "wrap",
            }}
          >
            {formDetails.gallery &&
              formDetails.gallery.map((img, index) => (
                <Box
                  key={index}
                  sx={{
                    width: 100,
                    height: 100,
                    overflow: "hidden",
                    borderRadius: 2,
                    position: "relative",
                  }}
                >
                  <Button
                    sx={{ position: "absolute", left: 0 }}
                    onClick={() => {
                      handleDeleteImageFromGallery(index);
                    }}
                  >
                    <Close sx={{ color: "black" }} />
                  </Button>
                  <img
                    src={img.url}
                    alt={img.alt}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                </Box>
              ))}
          </Box>
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
            {!workshop ? " Create new Workshop" : "Edit Workshop"}
          </Button>
        </Box>
      </Grid>
    </>
  );
}

export default WorkshopForm;
