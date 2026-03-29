import { useUser } from "../../../providers/UserProvider";
import initialRegisterValues from "../../helpers/register/initialValues/initialRegisterValues";
import RegisterForm from "./RegisterForm";

function CreateRegister() {
  const { handleSubmitCreateUser } = useUser();
  return (
    <RegisterForm
      initialRegisterValues={initialRegisterValues}
      handleSubmitForm={handleSubmitCreateUser}
    />
  );
}

export default CreateRegister;
