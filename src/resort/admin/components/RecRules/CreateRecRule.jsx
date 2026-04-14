import { useSession } from "../../../providers/SessionProvider";
import initialSessionValues from "../../helpers/sessions/initialValues/initialSessionValues";
import SessionForm from "../sessions/SessionForm";
initialSessionValues;

function CreateRecRule() {
  const { handleSubmitCreateSession } = useSession();

  return (
    <SessionForm
      initialSessionValues={initialSessionValues}
      handleSubmitForm={handleSubmitCreateSession}
      defaultIsRecursive={true}
    />
  );
}

export default CreateRecRule;
