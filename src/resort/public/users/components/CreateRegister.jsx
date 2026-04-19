import { Button, Box, Typography, Dialog, DialogContent } from "@mui/material";
import { useUser } from "../../../providers/UserProvider";

import RegisterForm from "./RegisterForm";

import initialRegisterValues from "../../../admin/helpers/users/initialValues/initialRegisterValues";
import CreateLogin from "./CreateLogin";

function CreateRegister() {
  const { handleSubmitCreateUser, OpenLogin, setOpenLogin, setOpenSignup } =
    useUser();
  return (
    <>
      <RegisterForm
        initialRegisterValues={initialRegisterValues}
        handleSubmitForm={handleSubmitCreateUser}
      />
      <Box display="flex" justifyContent="center" alignItems="center">
        <Typography>already have an account?</Typography>
        <Button
          onClick={() => {
            setOpenSignup(false);
            setOpenLogin(true);
          }}
        >
          login
        </Button>
      </Box>
    </>
  );
}

export default CreateRegister;
