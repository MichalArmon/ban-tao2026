import RegisterForm from "../../../users/components/register/RegisterForm";
import initialRegisterValues from "../../../users/helpers/register/initialValues/initialRegisterValues";
import { useUser } from "../../../providers/UserProvider";

function CreateUserAdmin() {
  const { handleSubmitCreateUser } = useUser();
  return (
    <>
      <RegisterForm
        initialRegisterValues={initialRegisterValues}
        handleSubmitForm={handleSubmitCreateUser}
      />
    </>
  );
}

export default CreateUserAdmin;
