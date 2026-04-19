import { useEffect } from "react";
import { useUser } from "../../../providers/UserProvider";

import RegisterForm from "../../../public/users/components/RegisterForm";
import initialEditUserValues from "../../helpers/users/initialValues/initialEditRegisterValues";

function EditUserAdmin({ userSelected, setIsDialogOpen }) {
  const { handleGetUser, handleSubmitEditUser, user } = useUser();

  useEffect(() => {
    if (userSelected) {
      handleGetUser(userSelected);
    }
  }, [userSelected]);
  if (!user) return <>Loading...</>;

  const handleSaveAndCloseEdit = async (formData) => {
    try {
      await handleSubmitEditUser(userSelected, formData);
      setIsDialogOpen(false);
    } catch (error) {
      console.error("Error saving user:", error);
    }
  };

  return (
    <>
      <RegisterForm
        initialRegisterValues={initialEditUserValues(user)}
        handleSubmitForm={handleSaveAndCloseEdit}
      />
    </>
  );
}

export default EditUserAdmin;
