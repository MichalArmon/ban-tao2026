import { Box, Button, Typography } from "@mui/material";
import { useUser } from "../../../providers/UserProvider";
import initialLoginValues from "../../../admin/helpers/users/initialValues/initialLoginValues ";
import LoginForm from "./LoginForm";

function CreateLogin() {
  const { handleSubmitLoginUser, setOpenLogin, setOpenSignup } = useUser();
  return (
    <>
      <LoginForm
        initialLoginValues={initialLoginValues}
        handleSubmitForm={handleSubmitLoginUser}
      />
      <Box display="flex" justifyContent="center" alignItems="center">
        <Typography>Don't have an account yet?</Typography>
        <Button
          sx={{ textTransform: "none" }}
          onClick={() => {
            setOpenLogin(false);
            setOpenSignup(true);
          }}
        >
          REGISTER
        </Button>
      </Box>
    </>
  );
}

export default CreateLogin;
