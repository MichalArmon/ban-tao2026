import MyTextField from "../../../../Form/MyTextField";
import useForm from "../../../hooks/useForm";
import axios from "axios";
import { Grid, Button, Box, Paper } from "@mui/material";
import { Loop } from "@mui/icons-material";
Form;

import logInSchema from "../models/logInSchema";
import initialLoginValues from "../helpers/initialValues/initialLoginValues ";
import Form from "../../../../Form/components/Form";

const handleSubmitLogin = async (user) => {
  try {
    const response = await axios.post(
      "http://localhost:3000/api/v1/auth/login",
      user,
    );
    console.log(response);
  } catch (error) {
    if (error.response) {
      console.log(error.response.data);
      alert(error.response.data);
    }
  }
};

function LoginForm() {
  const { handleChange, handleSubmit, errors, formDetails } = useForm(
    initialLoginValues,
    logInSchema,

    handleSubmitLogin,
  );
  return (
    <>
      <Paper
        sx={{
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
        }}
      >
        <Box
          sx={{
            height: 150,
            backgroundImage:
              "linear-gradient(45deg, #7a5cd6cc 30%, #21CBF3 90%),url('/businesscards-tileimage-1x1.jpg')",
          }}
        ></Box>
        <Form
          title="Login"
          styles={{ padding: 2 }}
          align={"start"}
          titleSize={"16px"}
          handleSubmit={handleSubmit}
        >
          <Grid
            container
            spacing={1.5}
            sx={{
              p: 0.7,
              minWidth: 300,
              bgcolor: "#ffffffff",
              flexDirection: "column",
            }}
          >
            <Grid>
              <MyTextField
                size="small"
                name="email"
                label="Email"
                onChange={handleChange}
                helperText={errors.email}
                error={Boolean(errors.email)}
                value={formDetails.email}
              />
            </Grid>
            <Grid>
              <MyTextField
                type="password"
                size="small"
                name="password"
                label="Password"
                onChange={handleChange}
                helperText={errors.password}
                error={Boolean(errors.password)}
                value={formDetails.password}
              />
            </Grid>
            <Grid>
              <Button variant="contained" fullWidth onClick={handleSubmit}>
                Login
              </Button>
            </Grid>
          </Grid>
        </Form>
      </Paper>
    </>
  );
}

export default LoginForm;
