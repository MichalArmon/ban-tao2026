import { useWorkshop } from "../../../providers/WorkshopProvider";
import initialWorkshopValues from "../../helpers/Workshops/initialValues/initialWorkshopValues";
import WorkshopForm from "./WorkshopForm";
function CreateWorkshop() {
  const { handleSubmitCreateWorkshop } = useWorkshop();
  return (
    <WorkshopForm
      initialWorkshopValues={initialWorkshopValues}
      handleSubmitForm={handleSubmitCreateWorkshop}
    />
  );
}

export default CreateWorkshop;
