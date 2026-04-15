import { useEffect } from "react";
import { useSession } from "../../../providers/SessionProvider";
import initialEditSessionValues from "../../helpers/sessions/initialValues/initialEditSessionValues";
import SessionForm from "./SessionForm";
import { Typography } from "@mui/material";

function EditSession({ sessionSelected, setIsDialogOpen }) {
  const { handleGetSession, handleSubmitEditSession, session } = useSession();
  useEffect(() => {
    if (sessionSelected) {
      handleGetSession(sessionSelected);
    }
  }, [sessionSelected]);
  console.log(session);

  if (!session || session._id !== sessionSelected) {
    return (
      <Typography sx={{ p: 4, textAlign: "center" }}>Loading...</Typography>
    );
  }

  const handleSaveAndCloseEdit = async (formData) => {
    try {
      await handleSubmitEditSession(sessionSelected, formData);
      setIsDialogOpen(false);
    } catch (error) {
      console.error("Error saving Session:", error);
    }
  };

  return (
    <>
      <SessionForm
        isEditMode={true}
        key={session._id}
        initialSessionValues={initialEditSessionValues(session)}
        handleSubmitForm={handleSaveAndCloseEdit}
      />
    </>
  );
}

export default EditSession;
