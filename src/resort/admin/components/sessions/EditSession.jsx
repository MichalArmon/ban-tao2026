import { useEffect } from "react";
import { useSession } from "../../../providers/SessionProvider";
import initialEditSessionValues from "../../helpers/Sessions/initialValues/initialEditSessionValues";
import SessionForm from "./SessionForm";

function EditSession({ SessionSelected, setIsDialogOpen }) {
  const { handleGetSession, handleSubmitEditSession, Session } = useSession();
  useEffect(() => {
    if (SessionSelected) {
      handleGetSession(SessionSelected);
    }
  }, [SessionSelected]);
  if (!Session) return <>Loading...</>;

  const handleSaveAndCloseEdit = async (formData) => {
    try {
      await handleSubmitEditSession(SessionSelected, formData);
      setIsDialogOpen(false);
    } catch (error) {
      console.error("Error saving Session:", error);
    }
  };

  return (
    <>
      <SessionForm
        initialSessionValues={initialEditSessionValues(Session)}
        handleSubmitForm={handleSaveAndCloseEdit}
      />
    </>
  );
}

export default EditSession;
