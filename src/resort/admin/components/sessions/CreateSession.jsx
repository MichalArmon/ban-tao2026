import { useSession } from "../../../providers/SessionProvider";
import initialSessionValues from "../../helpers/sessions/initialValues/initialSessionValues";
initialSessionValues;
import SessionForm from "./SessionForm";
function CreateSession() {
  const { handleSubmitCreateSession } = useSession();
  return (
    <SessionForm
      initialSessionValues={initialSessionValues}
      handleSubmitForm={handleSubmitCreateSession}
    />
  );
}

export default CreateSession;
