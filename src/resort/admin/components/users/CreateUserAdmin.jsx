import { useUser } from "../../../providers/UserProvider";
import RegisterForm from "../../../public/users/components/RegisterForm";
import initialRegisterValues from "../../helpers/users/initialValues/initialRegisterValues";

function CreateUserAdmin() {
  const { handleSubmitAdminCreateUser } = useUser();
  return (
    <>
      <RegisterForm
        initialRegisterValues={initialRegisterValues}
        handleSubmitForm={handleSubmitAdminCreateUser}
      />
    </>
  );
}

export default CreateUserAdmin;
