import MyTextField from "../../../../Form/MyTextField";
import useForm from "../../../hooks/useForm";
import axios from "axios";
import { Grid, Button, Box } from "@mui/material";
import { Loop } from "@mui/icons-material";
import initialRegisterValues from "../helpers/initialValues/initialRegisterValues";

import registerSchema from "../models/registerSchema";
import normalizeRegisterDetails from "../helpers/normalization/normalizeRegisterDetails";

function RegisterForm() {
  const handleSubmitRegister = async (data) => {
    const userDetailsForServer = normalizeRegisterDetails(data);

    console.log("sending data...");

    try {
      const response = await axios.post(
        "http://localhost:3000/api/v1/auth/signup",
        userDetailsForServer,
      );
      console.log(response);
    } catch (error) {
      if (error.response) {
        console.log(error.response.data);
        alert(error.response.data);
      }
    }
  };
  const { handleChange, handleSubmit, errors, formDetails } = useForm(
    initialRegisterValues,
    registerSchema,
    handleSubmitRegister,
  );

  return (
    <>
      <Grid container maxWidth="sm" spacing={1} sx={{ bgcolor: "#fff", p: 2 }}>
        <Grid container size={12} sx={{ display: "flex" }}>
          <Grid size={{ md: 6, xs: 12 }}>
            <MyTextField
              label="First Name"
              name="firstName"
              onChange={handleChange}
              error={Boolean(errors.firstName)}
              helperText={errors.firstName}
              value={formDetails.firstName || ""}
              required
            />
          </Grid>

          <Grid size={{ md: 6, xs: 12 }}>
            <MyTextField
              label="Last Name"
              name="lastName"
              onChange={handleChange}
              error={Boolean(errors.lastName)}
              helperText={errors.lastName}
              value={formDetails.lastName}
              required
            />
          </Grid>
        </Grid>
        <Grid container size={12}>
          <Grid size={{ md: 12, xs: 12 }}>
            <MyTextField
              label="Phone"
              name="phone"
              onChange={handleChange}
              error={Boolean(errors.phone)}
              helperText={errors.phone}
              value={formDetails.phone}
              type="tel"
              required
            />
          </Grid>
        </Grid>
        <Grid container size={12}>
          <Grid size={{ md: 6, xs: 12 }}>
            <MyTextField
              label="Email"
              name="email"
              onChange={handleChange}
              type="email"
              error={Boolean(errors.email)}
              value={formDetails.email}
              helperText={errors.email}
              required
            />
          </Grid>
          <Grid size={{ md: 6, xs: 12 }}>
            <MyTextField
              label="Password"
              name="password"
              onChange={handleChange}
              value={formDetails.password}
              type="password"
              required
              error={Boolean(errors.password)}
              helperText={errors.password}
              // sx={{ "& .MuiOutlinedInput-root": { borderRadius: 5 } }}
            />
          </Grid>
        </Grid>

        <Grid container size={12}>
          <Grid size={{ md: 6, xs: 12 }}>
            <MyTextField
              label="country"
              onChange={handleChange}
              name="country"
              error={Boolean(errors.country)}
              helperText={errors.country}
              value={formDetails.country}
            />
          </Grid>
          <Grid size={{ md: 6, xs: 12 }}>
            <MyTextField
              label="city"
              name="city"
              onChange={handleChange}
              error={Boolean(errors.city)}
              helperText={errors.city}
              value={formDetails.city}
            />
          </Grid>
        </Grid>

        {/* <Grid container size={12}>
        
            <FormControlLabel
              name="isBusiness"
              control={<CheckBox />}
              label="Signup as business"
            />{" "}
      
        </Grid> */}
        <Grid container size={12}>
          <Grid size={{ md: 6, xs: 12 }}>
            <Button variant="outlined" fullWidth size="lg" color="error">
              Cancel
            </Button>
          </Grid>
          <Grid size={{ md: 6, xs: 12 }}>
            <Button
              variant="outlined"
              fullWidth
              // sx={{ color: "text.primary" }}
            >
              <Loop />
            </Button>
          </Grid>
        </Grid>
        <Box>
          <Button
            sx={{
              borderRadius: 9,
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
            REGISTER
          </Button>
        </Box>
      </Grid>
    </>
  );
}

export default RegisterForm;
